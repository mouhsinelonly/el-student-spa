// @flow
import * as React from 'react'
import { Creatable } from 'react-select'
import { Link } from 'react-router'
import Icon from 'components/Icon'
import './style.scss'

type PropsType = {
  setWords: Function,
  onBack: Function,
  onSwitchHamza: Function,
  getBooks: Function,
  isHamza: boolean,
  guard: string,
  words: Array<Object>
};

const ResearchResultForm = ({ onBack, setWords, words,
  isHamza, onSwitchHamza, onSearch, guard = 'student' }: PropsType): React.Element<'div'> => {
  return (
    <div className='p-researcher-result'>
      <div className='p-researcher-result__box p-y-2'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-2'>
              <Link type='button' className='c-library-search-bar__back' onClick={(): Function => onBack(false)}>
                <Icon name='library-back' />
              </Link>
            </div>
            <div className='col-xs-12 col-md-8'>
              <div className='input-group'>
                <Creatable
                  className='p-researcher-result__input'
                  rtl
                  multi
                  creatable
                  arrowRenderer={null}
                  noResultsText=''
                  options={[]}
                  placeholder='أدخل كلمات البحث...'
                  searchPromptText='أدخل كلمات البحث...'
                  name='form-field-name'
                  value={words}
                  onChange={(values: Array<Object>): Function => setWords(values)}
                  promptTextCreator={(label: string): string => label} />
                <span className='input-group-btn'>
                  <button className='btn btn-secondary p-researcher-result__btn p-x-3'
                    onClick={(): Function => onSearch({ guard, type: 'pages' })} >
                    البحث
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row p-t-2'>
          <div className='col-xs-12 col-md-4 col-md-pull-2'>
            <button onClick={(): Function => onSwitchHamza(false, guard)}
              className={`${!isHamza ? 'is-active' : ''} btn btn-grey-outline p-researcher-result__reset`}>
              عدم اعتبار الفروق
            </button>
            <button onClick={(): Function => onSwitchHamza(true, guard)}
              className={`${isHamza ? 'is-active' : ''} btn btn-grey-outline m-r-2 p-researcher-result__reset`}>
              اعتبار الهمزات و نحوها
            </button>
          </div>
          <div className='col-xs-12 col-md-4 text-xs-left col-md-pull-2'>
            <button className='btn btn-grey-outline p-researcher-result__new p-x-3'
              onClick={(): Function => onBack(false)}>بحث جديد</button>
          </div>
          <div className='col-xs-12 col-md-8 col-md-pull-2' >
            <hr />
          </div>
        </div>
      </div>
    </div>
  )
}

ResearchResultForm.defaultProps = {
  words: []
}
export default ResearchResultForm
