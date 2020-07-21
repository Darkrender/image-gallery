import { useRef, useCallback } from 'react'

export default function useInfiniteScrollObserver(loading, callback) {
  const infiniteScrollObserver = useRef()
  const infiniteScrollElementRef = useCallback(
    node => {
      if (loading) return
      if (infiniteScrollObserver.current)
        infiniteScrollObserver.current.disconnect()

      infiniteScrollObserver.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          callback()
        }
      })

      if (node) infiniteScrollObserver.current.observe(node)
    },
    [loading, callback]
  )

  return { infiniteScrollElementRef }
}
