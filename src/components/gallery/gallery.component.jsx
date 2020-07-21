import React, { useState } from 'react'
import './gallery.styles.scss'
import useImageSearch from '../../hooks/useImageSearch'

const Gallery = () => {
  const [pageNumber] = useState(1)
  const { images, loading, error } = useImageSearch(pageNumber)

  return (
    <div className="gallery">
      <h2 className="title">Image Gallery</h2>

      <div className="images">
        {images.map((item, index) => {
          return (
            <img key={index} src={item.urls.regular} alt={item.description} />
          )
        })}
        {loading && <div>Loading...</div>}
        {error && <div>Error</div>}
      </div>
    </div>
  )
}

export default Gallery
