// @flow
import * as React from 'react'
import { Link } from 'react-router'
// import css
import './SpecialtyBlock.scss'
import { Translate } from 'react-localize-redux'

type PropsType = {
  canregister: boolean,
  terms: number,
  years: number,
  name: string,
  id: number,
  index: number,
  name_eng: string,
  name_fr: string,
  type: string,
  description: string,
  description_eng: string,
  description_fr: string
};

const specialtyLocales = (type: string): Object => ({
  bac: {
    head: 'global.bachelor'
  },
  dep: {
    head: 'global.diploma'
  },
  maj: {
    head: 'global.majesteer'
  }
})[type]

export const SpecialtyBlock = (props: PropsType): React.Element<'div'> =>
      (<div className='c-specialty-block__container m-b-3'>
        <Translate>
          {({ translate }: Object): React.Element<'h5'> => (
            <h5 className='c-specialty-block__subtitle'>
              { translate(specialtyLocales(props.type).head) }
            </h5>
          )}
        </Translate>
        <Translate>
          {({ activeLanguage }: Object): React.Element<'h4'> => (
            <h4 className={`c-specialty-block__title color${props.index + (props.type === 'maj' ? 3 : 0)}`}>
              {activeLanguage && activeLanguage.code === 'ar' ? props.name : ''}
              {activeLanguage && activeLanguage.code === 'en' ? props.name_eng : ''}
              {activeLanguage && activeLanguage.code === 'fr' ? props.name_fr : ''}
            </h4>)}
        </Translate>
        <section className={`c-specialty-block__duration color${props.index + (props.type === 'maj' ? 3 : 0)}`}>
          <span>
            <Translate id='signup_page.for_n_years' data={{ years: props.years }} />
          </span>
          <span className='p-x-2'>|</span>
          <span>
            <Translate id='signup_page.for_n_terms' data={{ terms: props.terms }} />
          </span>
        </section>
        <Translate>
          {({ activeLanguage }: Object): React.Element<'p'> => (
            <p className={`p-x-2 p-a-2 m-b-0 c-specialty-block__description`}>
              {activeLanguage && activeLanguage.code === 'ar' ? props.description.substr(0, 90) : ''}
              {activeLanguage && activeLanguage.code === 'en' ? props.description_eng.substr(0, 90) : ''}
              {activeLanguage && activeLanguage.code === 'fr' ? props.description_fr.substr(0, 90) : ''}
            </p>)}
        </Translate>
        <footer className={`c-specialty-block__footer m-t-1 clearfix`}>
          {props.canregister ? <div className='col-xs-7'>
            <Link to={`programmes/form/${props.id}`}
              className={`btn p-y-1 btn-block btn-secondary c-specialty-block__register
              color${props.index + (props.type === 'maj' ? 3 : 0)}`}>
              <Translate id='signup_page.register' />
            </Link>
          </div> : null}
          {!props.canregister ? <div className='col-xs-7' style={{ paddingLeft: 5, paddingRight: 5 }}>
            <Link to={`programmes/waitinglist/${props.id}`}
              className={`btn p-y-1 btn-block btn-secondary c-specialty-block__register
              color${props.index + (props.type === 'maj' ? 3 : 0)}`}>
              <Translate id='signup_page.register_waiting_list' />
            </Link>
          </div> : null}
          <div className='col-xs-5' style={{ paddingLeft: 5, paddingRight: 5 }}>
            <Link to={`programmes/specialty/${props.id}`}
              className={`btn p-y-1 btn-block btn-secondary c-specialty-block__button`}>
              <Translate id='signup_page.more_details_short' />
            </Link>
          </div>
        </footer>
      </div>
    )

SpecialtyBlock.defaultProps = {
  terms: 0,
  years: 0,
  name: '',
  id: 0
}

export default SpecialtyBlock
