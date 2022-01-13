import React, { useState, useRef, useEffect } from 'react'
import H from '@here/maps-api-for-javascript'
import onResize from 'simple-element-resize-detector'
import MapPosition from './MapPosition'

const Map = () => {
  const [map, setMap] = useState(null)
  const [state, setState] = useState({
    zoom: 0,
    lat: 0,
    lng: 0,
  })

  const mapUseRef = useRef()

  const onMapViewChange = (zoom, lat, lng) => {
    // timeout may not be needed, but keeping it for personal reasons 😁
    setTimeout(() => {
      setState({ ...state, zoom, lat, lng })
    }, 100)
  }

  const handleMapViewChange = (ev) => {
    if (ev.newValue && ev.newValue.lookAt) {
      const lookAt = ev.newValue.lookAt
      const lat = Math.trunc(lookAt.position.lat * 1e7) / 1e7
      const lng = Math.trunc(lookAt.position.lng * 1e7) / 1e7
      const zoom = Math.trunc(lookAt.zoom * 1e2) / 1e2
      onMapViewChange(zoom, lat, lng)
    }
  }

  const handleInputChange = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }

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
          center: { lat: state.lat, lng: state.lng },
          zoom: state.zoom,
        })
      )
    } else {
      // add resize feature
      onResize(mapUseRef.current, () => {
        map.getViewPort().resize()
      })
      // add zoom and pan
      setTimeout(() => {
        map.setZoom(state.zoom)
        map.setCenter({ lat: state.lat, lng: state.lng })
      }, 100)
      map.addEventListener('mapviewchange', handleMapViewChange)
      return () => {
        map.removeEventListener('mapviewchange', handleMapViewChange)
      }
    }
  }, [map])

  useEffect(() => {
    // interactive feature i.e. scroll zoom & pan
    if (map) {
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
    }
  }, [map])

  return (
    <>
      <div>Hooks</div>
      <div
        style={{ position: 'relative', width: '100%', height: '300px' }}
        ref={mapUseRef}
      />
      <MapPosition
        lat={state.lat}
        lng={state.lng}
        onChange={handleInputChange}
        zoom={state.zoom}
      />
    </>
  )
}

export default Map
