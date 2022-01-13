import React from 'react'
import H from '@here/maps-api-for-javascript'
import onResize from 'simple-element-resize-detector'

export default class Map extends React.Component {
  constructor(props) {
    super(props)
    // the reference to the container
    this.ref = React.createRef()
    // reference to the map
    this.map = null
  }

  // keeps input values in sync with interactive map
  handleMapViewChange = (ev) => {
    console.log('input event', ev)
    /* 
Ri
a: false
currentTarget: T {Nd: false, sb: Array(1), aa: pe, ao: T, jh: null, …}
eventPhase: 2
f: false
modifiers: 98
newValue: {lookAt: {…}}
nl: true
oldValue: {lookAt: {…}}
target: T {Nd: false, sb: Array(1), aa: pe, ao: T, jh: null, …}
type: "mapviewchange"
[[Prototype]]: Ng
 */
    const { onMapViewChange } = this.props
    if (ev.newValue && ev.newValue.lookAt) {
      const lookAt = ev.newValue.lookAt
      // adjust precision
      const lat = Math.trunc(lookAt.position.lat * 1e7) / 1e7
      const lng = Math.trunc(lookAt.position.lng * 1e7) / 1e7
      const zoom = Math.trunc(lookAt.zoom * 1e2) / 1e2
      onMapViewChange(zoom, lat, lng)
    }
  }

  componentDidMount() {
    if (!this.map) {
      // instantiate a platform, default layers and a map as usual
      const platform = new H.service.Platform({
        apikey: process.env.REACT_APP_HERE_KEY,
      })
      const layers = platform.createDefaultLayers()
      const map = new H.Map(this.ref.current, layers.vector.normal.map, {
        pixelRatio: window.devicePixelRatio,
        center: { lat: 78, lng: 20 },
        zoom: 2,
      })
      // ------------------------------------------------------------
      // apparently, event listener is unnecessary.
      // the only difference: interacting with map by scrolling to zoom or click and drag
      // to pan does not update values in inputs in 'MapPosition' component,
      // but entering values into inputs *does* still work

      map.addEventListener('mapviewchange', this.handleMapViewChange)
      // ------------------------------------------------------------

      // add the interactive behaviour to the map
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map))

      // add resize feature
      onResize(this.ref.current, () => {
        map.getViewPort().resize()
      })

      this.map = map
    }
  }

  componentDidUpdate() {
    const { lat, lng, zoom } = this.props

    if (this.map) {
      // prevent the unnecessary map updates by debouncing the
      // setZoom and setCenter calls
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.map.setZoom(zoom)
        this.map.setCenter({ lat, lng })
      }, 100)
    }
  }

  // removing event listener from line 45 if necessary

  componentWillUnmount() {
    if (this.map) {
      this.map.removeEventListener('mapviewchange', this.handleMapViewChange)
    }
  }

  render() {
    return (
      <>
        <div>Class Components</div>
        <div
          //  style={{ width: '300px', height: '300px' }}
          style={{ position: 'relative', width: '100%', height: '300px' }}
          ref={this.ref}
        />
      </>
    )
  }
}
