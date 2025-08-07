import React from 'react';

function Gallery({product, styles}) {
  return (
    <div className='gallery-container'>
      <div className='overlay'>
        <div className='group full-height'>
          <div className='thumbnail-container stack full-height'>
            <div className='thumbnail-square'/>
            <div className='thumbnail-square'/>
            <div className='thumbnail-square'/>
            <div className='thumbnail-square'/>
            <div className='thumbnail-square'/>
            <div className='thumbnail-arrow'>
              v
            </div>
          </div>
          <div className='stack fs-arrows-container'>
            <div className='fullscreen-icon' >
              <div>fs</div>
            </div>
            <div className='arrows group sb'>
              <div>{'<'}</div>
              <div>{'>'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery;