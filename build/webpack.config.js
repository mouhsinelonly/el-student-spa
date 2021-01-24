const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const project = require('../project.config')
const SpritesmithPlugin = require('webpack-spritesmith')
const CopyPlugin = require('copy-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest-contrib')
// const multi = require('multi-loader')
// const WebpackShellPlugin = require('webpack-shell-plugin')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const inProject = (...args) => path.resolve(project.basePath, ...args)
const inProjectSrc = file => inProject(project.srcDir, file)

const __DEV__ = project.env === 'development'
const __TEST__ = project.env === 'test'
const __PROD__ = project.env === 'production'
const hashBustString = Date.now().valueOf()
const config = {
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      // include all types of chunks
      chunks: 'all'
    }
  },
  stats: {
    // copied from `'minimal'`
    all: false,
    modules: false,
    maxModules: 0,
    errors: true,
    warnings: true,
    // our additional options
    moduleTrace: false,
    errorDetails: false
  },
  entry: {
    normalize: [inProjectSrc('normalize')],
    main: [inProjectSrc(project.main)]
  },
  devtool: project.sourcemaps ? 'source-map' : false,
  output: {
    path: inProject(project.outDir),
    filename: __DEV__ ? '[name].js' : `[name].${hashBustString}.[chunkhash].js?v=${hashBustString}`,
    chunkFilename: __DEV__ ? '[name].js' : `[name].${hashBustString}.[chunkhash].js?v=${hashBustString}`,
    publicPath: project.publicPath
  },
  resolve: {
    modules: [inProject(project.srcDir), 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.json']
  },
  externals: project.externals,
  module: {
    rules: []
  },
  plugins: [
    new webpack.DefinePlugin(
      Object.assign(
        {
          'process.env': { NODE_ENV: JSON.stringify(project.env), APIBASE: JSON.stringify(project.apiBase) },
          __DEV__,
          __TEST__,
          __PROD__
        },
        project.globals
      )
    )
  ],
  mode: __PROD__ ? 'production' : 'development',
}

// JavaScript
// ------------------------------------
config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      query: {
        cacheDirectory: true,
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-syntax-dynamic-import',
          [
            '@babel/plugin-transform-runtime',
            {
              helpers: true,
              regenerator: true
            }
          ],
          [
            '@babel/plugin-proposal-object-rest-spread',
            {
              useBuiltIns: true // we polyfill Object.assign in src/normalize.js
            }
          ]
        ],
        presets: [
          '@babel/preset-react',
          [
            '@babel/preset-env',
            {
              modules: false,
              targets: {
                ie: '10'
              }
            }
          ]
        ]
      }
    }
  ]
})

// Styles
// ------------------------------------
// const extractStyles = new ExtractTextPlugin({
//   filename: 'styles/[name].[contenthash].css',
//   allChunks: true,
//   disable: __DEV__
// })

// config.module.rules.push({
//   test: /\.css$/,
//   loader: extractStyles.extract({
//     fallback: 'style-loader',
//     use: [
//       {
//         loader: 'css-loader'
//       }
//     ]
//   })
// })

config.plugins.push(new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
  filename: __DEV__ ? `[name]${hashBustString}.css` : `[name].${hashBustString}.css?hash=${hashBustString}`,
  chunkFilename: __DEV__ ? `[id]${hashBustString}.css` : `[id].${hashBustString}.css?hash=${hashBustString}`,
  ignoreOrder: true, // Enable to remove warnings about conflicting order
}))

config.module.rules.push({
  test: /\.(sa|sc|c)ss$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: project.publicPath,
        hmr: process.env.NODE_ENV === 'development',
      },
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: project.sourcemaps,
        minimize: {
          autoprefixer: {
            add: true,
            remove: true,
            browsers: ['last 2 versions']
          },
          discardComments: {
            removeAll: true
          },
          discardUnused: true,
          mergeIdents: true,
          reduceIdents: true,
          safe: true,
          sourcemap: project.sourcemaps
        }
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: project.sourcemaps,
        includePaths: [inProjectSrc('styles')]
      }
    }
  ]
})
// config.plugins.push(extractStyles)

// Images
// ------------------------------------
config.module.rules.push({
  test: /\.(png|jpg|gif)$/,
  loader: 'url-loader',
  options: {
    limit: 8192
  }
})

// Fonts
// ------------------------------------
const FONT_TYPES = new Map([
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
  ['svg', 'image/svg+xml']
])
for (let [extension, mimetype] of FONT_TYPES) {
  config.module.rules.push({
    test: new RegExp(`\\.${extension}$`),
    loader: 'url-loader',
    options: {
      name: 'fonts/[name].[ext]',
      limit: 10000,
      mimetype
    }
  })
}
// sprite smith
// ------------------------------------
config.plugins.push(
  new SpritesmithPlugin({
    retina: '@2x',
    src: {
      cwd: 'src/static/img/icons',
      glob: '*.png'
    },
    target: {
      image: 'src/static/img/sprite.png',
      css: 'src/styles/_sprite.scss'
    },
    apiOptions: {
      cssImageRef: '../static/img/sprite.png'
    },
    spritesmithOptions: {
      padding: 2,
      exportOpts: {
        quality: 5,
        imagemagick: true
      }
    }
  }),
  new WebpackPwaManifest({
    filename: 'manifest.json',
    name: 'مركز التعليم عن بعد',
    display: 'standalone',
    start_url: '.',
    theme_color: '#fff',
    short_name: 'EL-CSS',
    description: 'بوابة الطالب لمركز التعليم عن لعد',
    background_color: '#bbe8db',
    gcm_sender_id: '467640906497',
    icons: [
      {
        src: 'src/static/app-icon.png',
        sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
      }
    ]
  })
)

// Development Tools
// ------------------------------------
if (__DEV__) {
  config.entry.main.push(`webpack-hot-middleware/client.js?path=${config.output.publicPath}__webpack_hmr`)
  config.plugins.push(
    // new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, '../src/service-worker.js'),
      // includes: ['service-worker.js'],
      excludes: ['**/.*', '**/*.map', '**/*.*'],
    })
  )
}

// Bundle Splitting
// ------------------------------------
if (!__TEST__) {
  const bundles = ['normalize', 'manifest', 'moment', 'react-visjs-timeline', 'socket.io-client']
  // extract only needed moment
  // ------------------------------------
  config.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/,
  /ar|en|ar-SA/))

  if (project.vendors && project.vendors.length) {
    bundles.unshift('vendor')
    config.entry.vendor = project.vendors
  }
  // config.plugins.push(new webpack.optimize.CommonsChunkPlugin({ names: bundles }))
}
// HTML Template
  // ------------------------------------
config.plugins.push(
    new HtmlWebpackPlugin({
      template: inProjectSrc('index.html'),
      inject: true,
      hash: true,
      favicon: 'src/static/favicon.ico',
      minify: {
        collapseWhitespace: true
      }
    })
  )
// Production Optimizations
// ------------------------------------
if (__PROD__) {
  config.entry.extra = [inProjectSrc('extra')]
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ProgressBarPlugin(),
    new PreloadWebpackPlugin({
      rel: 'prefetch'
    }),
    new CopyPlugin([
      {
        from: 'robots.txt'
      },
      {
        from: 'src/offline.html'
      },
    ])
  )
}

module.exports = config
