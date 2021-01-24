// @flow
import * as React from 'react'
import DropZone from 'react-dropzone'
// import css
import './MaterialFile.scss'
const maxFileSize = 3000000
type PropsType = {
  onDrop: Function,
  files: Array<Object>,
  name: string,
  label: string,
  icon: string,
  multiple: boolean,
  className: string,
  children: React.Element<*>
};

class MaterialFile extends React.Component<PropsType> {
  static defaultProps = {
    onDrop: () => {},
    files: [],
    multiple: false
  }
  render (): React.Element<'div'> {
    const { onDrop, files, name, label, icon, className, children, multiple } = this.props
    let file = files.find((f: Object): boolean => f.id === name)
    let data

    if (file) {
      data = (
        <div className='c-input-file__progress-container'>
          <span>{parseInt(file.percent, 10)}% جاري الرفع</span>
          <progress className='progress progress-success c-input-file__progress' value={file.percent} max='100'>
            <div className='progress'>
              <span className='progress-bar' style={{ width: file.percent + '%' }}>
                25%
              </span>
            </div>
          </progress>
        </div>
      )
    }

    return (
      <div>
        <DropZone
          multiple={multiple}
          accept={'image/png,image/x-png,image/jpeg'}
          className={`c-input-file__select-file ${className}`}
          onDropAccepted={onDrop}
          onDropRejected={this._handleDropReject}
          maxSize={maxFileSize}
        >
          {icon ? <i className={`icon icon-${icon} m-l-1 `} /> : null}
          {!data ? children : null}
          {data || label}
        </DropZone>
      </div>
    )
  }

  _handleDropReject = (files: Array<Object>) => {
    const sizeIsBigger = files.filter((f: Object): boolean => +f.size > maxFileSize).length > 0
    if (sizeIsBigger) {
      alert('الملف الذي تحاول رفعه اكبر من الحجم المقبول')
    } else {
      alert('الملف الذي تحاول رفعه غير مقبول٫ الصيغ المقبولة : png, jpeg')
    }
  }
}

export default MaterialFile
