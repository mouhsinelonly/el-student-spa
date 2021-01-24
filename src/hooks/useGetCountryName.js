// @flow
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
const useGetCountryName = (countryId: number): Function => {
  const [ object, setName ] = useState()
  const { data: countries } = useSelector((state: Object): Object => (state.countries))
  useEffect(() => {
    const name = countries.find((country: Object): boolean => +country.value === +countryId)
    setName(name)
  }, [countryId])

  return typeof object === 'object' ? object.text : ''
}

export default useGetCountryName
