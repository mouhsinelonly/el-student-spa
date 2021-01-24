FROM zenika/alpine-chrome:with-node as build-stage

USER root

RUN mkdir /app

WORKDIR /app

COPY ./ /app/

RUN rm -rf node_modules/

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN npm i

#COPY dockerfiles/index.js node_modules⁩/react-custom-scrollbars⁩/lib⁩/Scrollbars⁩/index.js
#COPY dockerfiles/defaultRenderElements.js node_modules⁩/react-custom-scrollbars⁩/lib⁩/Scrollbars⁩/defaultRenderElements.js

ARG APIBASE=https://api.sana.om

RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM pagespeed/nginx-pagespeed

COPY --from=build-stage /app/dist/ /usr/share/nginx/html

COPY dockerfiles/pagespeed.conf /etc/nginx/conf.d/default.conf

COPY dockerfiles/redirect-affiliate.conf /etc/nginx/extra-conf.d/nginx-redirect-affiliate.conf
