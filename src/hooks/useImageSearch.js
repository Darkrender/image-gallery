import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useImageSearch(pageNumber = 1, photosPerPage = 25) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [images, setImages] = useState([])

  useEffect(() => {
    const accessKey = '{YOUR_ACCESS_KEY_HERE}' // Access key
    let cancel

    setLoading(true)
    setError(false)

    axios({
      method: 'GET',
      url: `https://api.unsplash.com/photos`,
      params: {
        client_id: accessKey,
        page: pageNumber,
        per_page: photosPerPage,
      },
      cancelToken: new axios.CancelToken(canceller => (cancel = canceller)),
    })
      .then(response => {
        setImages(prevImages => {
          return [...prevImages, ...response.data]
        })
        setLoading(false)
      })
      .catch(e => {
        if (axios.isCancel(e)) return
        setError(true)
      })
    return () => cancel()
  }, [pageNumber, photosPerPage])
  return { loading, error, images }
}
