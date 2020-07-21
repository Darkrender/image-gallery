import React from 'react'
import './App.css'
import Gallery from './components/gallery/gallery.component'
import SimpleReactLightbox from 'simple-react-lightbox'

function App() {
  return (
    <div className="App">
      <SimpleReactLightbox>
        <Gallery />
      </SimpleReactLightbox>
    </div>
  )
}

export default App
