import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useImageSearch(pageNumber = 1, photosPerPage = 25) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [images, setImages] = useState([])

  useEffect(() => {
    // I would never have this access key hardcoded or pushed up to a real repository
    // Instead I would probably get this from the server or from an environment variable
    // Just doing this for expediency for this specific coding challenge
    const accessKey = 'lggn9MK0hE4N9rqhHDChkI54JkkYz_ojdaEhz3iE-tY'
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
