import React from 'react';

function ProductInfo({product, styles, isFullScreen}) {
  return (
    <div
      className='product-info-container'
      style={{display: isFullScreen ? 'none' : ''}}
    >
      <div className='stack'>
        <div>stars</div>
        <div>category</div>
        <h2>product name</h2>
        <div>price</div>
        <div className='group'>
          <div>style</div>
          <div>{'>'}</div>
          <div>selected style</div>
        </div>
        <div>style circle display</div>
        <div className='group'>
          <select>
            <option>
              select size
            </option>
          </select>
          <select>
            <option>
              1
            </option>
          </select>
        </div>
        <div className='group'>
          <button>Add to bag</button>
          <button>star</button>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo;