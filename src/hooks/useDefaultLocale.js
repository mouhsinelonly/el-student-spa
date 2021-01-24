// @flow
import { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { inArray } from 'utils'

const useDefaultLocale = (): string => {
  const [ defaultLocale, setDefaultLocale ] = useState(localStorage.getItem('elcsslocale') || 'ar')
  let lang = 'ar'
  try {
    lang = useSelector((state: Object): Object => state.location.query.lang)
  } catch (e) {
    lang = undefined
  }
  useEffect(() => {
    let defaultLanguage = 'ar'
    if (typeof lang !== 'undefined') {
      if (inArray(lang, ['ar', 'en', 'fr'])) {
        setDefaultLocale(defaultLanguage)
      }
    }
  }, [lang])
  const _setLocale = useCallback((locale: string) => {
    setDefaultLocale(locale)
    localStorage.setItem('elcsslocale', locale)
  }, [])
  return [defaultLocale, _setLocale]
}

export default useDefaultLocale
