import React from 'react';

function Thumbnail({imgUrl, selectedImage, setSelectedImage, i}) {
  return(
    <div
      className='thumbnail-square'
      onClick={() => setSelectedImage(i)}
    >
      <img className='thumbnail-image' src={imgUrl}/>
      <div
        className='thumbnail-indicator'
        style={{backgroundColor: selectedImage === i ? 'brown' : 'transparent'}}
        />
    </div>
  )
}

export default Thumbnail;