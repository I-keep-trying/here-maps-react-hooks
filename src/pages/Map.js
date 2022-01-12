import React, { useState, useRef, useEffect } from 'react'
import H from '@here/maps-api-for-javascript'
import onResize from 'simple-element-resize-detector'

const Map = () => {
  const [map, setMap] = useState(null)

  const mapUseRef = useRef()

  useEffect(() => {
    if (!map) {
      // instantiate a platform, default layers and a map as usual
      const platform = new H.service.Platform({
        apikey: process.env.REACT_APP_HERE_KEY,
      })
      const layers = platform.createDefaultLayers()
      setMap(
        new H.Map(mapUseRef.current, layers.vector.normal.map, {
          pixelRatio: window.devicePixelRatio,
          center: { lat: 0, lng: 0 },
          zoom: 0,
        })
      )
    } else {
      // add resize feature
      onResize(mapUseRef.current, () => {
        map.getViewPort().resize()
      })
      // add zoom and pan
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map))

      // mapUseRef.current.setZoom()
    }
  }, [map])
  console.log('map object', map)
  return (
    <>
      <div>Hooks</div>
      <div
        style={{ position: 'relative', width: '100%', height: '300px' }}
        ref={mapUseRef}
      />
    </>
  )
}

export default Map
