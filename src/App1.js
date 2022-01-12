import React from 'react'
import Map from './pages/Map1'
import MapPosition from './pages/MapPosition1'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      zoom: 0,
      lat: 0,
      lng: 0,
    }
  }

  // interactive feature; scroll to zoom, click & drag pan
  handleMapViewChange = (zoom, lat, lng) => {
    this.setState({
      lat,
      lng,
      zoom,
    })
  }

  handleInputChange = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { zoom, lat, lng } = this.state
    return (
      <div className="App">
        <Map
          lat={lat}
          lng={lng}
          zoom={zoom}
          onMapViewChange={this.handleMapViewChange}
        />
        <MapPosition
          lat={lat}
          lng={lng}
          onChange={this.handleInputChange}
          zoom={zoom}
        />
      </div>
    )
  }
}

