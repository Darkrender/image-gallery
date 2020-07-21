import React, { useState } from 'react'
import './gallery.styles.scss'
import useImageSearch from '../../hooks/useImageSearch'
import useInfiniteScrollObserver from '../../hooks/useInfiniteScrollObserver'
import { SRLWrapper } from 'simple-react-lightbox'

const Gallery = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const { images, loading, error } = useImageSearch(pageNumber)
  const { infiniteScrollElementRef } = useInfiniteScrollObserver(loading, () =>
    setPageNumber(prevPageNumber => prevPageNumber + 1)
  )

  return (
    <div className="gallery">
      <h2 className="title">Image Gallery</h2>

      <SRLWrapper>
        <div className="images">
          {images.map((item, index) => {
            if (images.length === index + 1) {
              return (
                <img
                  ref={infiniteScrollElementRef}
                  key={index}
                  src={item.urls.regular}
                  alt={item.description || item.alt_description}
                />
              )
            }
            return (
              <img key={index} src={item.urls.regular} alt={item.description} />
            )
          })}
          {loading && <div>Loading...</div>}
          {error && <div>Error</div>}
        </div>
      </SRLWrapper>
    </div>
  )
}

export default Gallery
