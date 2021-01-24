// @flow
import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { LocalizeProvider } from 'react-localize-redux'
import globalTranslations from 'static/translations/global.json'
import { renderToStaticMarkup } from 'react-dom/server'
import useDefaultLocale from 'hooks/useDefaultLocale'

type PropsType = {
  store: Object,
  routes: Object
};

const App = (props: PropsType): React.Element<typeof Provider> => {
  const [ defaultLanguage ] = useDefaultLocale()
  return (
    <Provider store={props.store}>
      <LocalizeProvider initialize={{
        languages: [
        { name: 'العربية', code: 'ar' },
        { name: 'English', code: 'en' },
        { name: 'Francais', code: 'fr' }
        ],
        translation: globalTranslations,
        options: {
          renderToStaticMarkup,
          renderInnerHtml: true,
          defaultLanguage
        }
      }}>
        <Router history={browserHistory} routes={props.routes} />
      </LocalizeProvider>
    </Provider>)
}

export default App
