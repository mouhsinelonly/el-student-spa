// @flow
import React, { useCallback } from 'react'
import { withLocalize } from 'react-localize-redux'
import './style.scss'
import useDefaultLocale from 'hooks/useDefaultLocale'

type PropsType = {
  languages: Array<Object>,
  activeLanguage: Function,
  setActiveLanguage: Function
};

const LanguageToggle = ({ languages, activeLanguage, setActiveLanguage }: PropsType): React.Element<'ul'> => {
  const [ , storeActiveLocale ] = useDefaultLocale()
  const _togggleLocale = useCallback((e: Object) => {
    setActiveLanguage(e.target.dataset.code)
    storeActiveLocale(e.target.dataset.code)
  }, [])
  return (
    <ul className={`nav c-language-toggle ${activeLanguage && activeLanguage.code === 'ar' ? '' : 'is-ltr'}`}>
      <li className='nav-item' key='active'>
        <button
          style={{ width: 80, borderRadius: 0 }}
          className={`btn btn-sm btn-success c-language-toggle__active`}
          disabled>
          <i className='material-icons c-language-toggle__down'>keyboard_arrow_down</i>
          {activeLanguage ? activeLanguage.name : ''}
        </button>
      </li>
      {languages.filter((l: Object): boolean => !l.active).map((lang: Object): React.Element<'li'> => (
        <li className='nav-item' key={lang.code}>
          <button
            style={{ width: 80, borderRadius: 0 }}
            className={`btn btn-sm ${activeLanguage.code === lang.code ? 'btn-success c-language-toggle__active' : ''}`}
            disabled={activeLanguage.code === lang.code}
            data-code={lang.code}
            onClick={_togggleLocale}>
            {lang.name}
          </button>
        </li>
      ))}
    </ul>)
}

export default withLocalize(LanguageToggle)
