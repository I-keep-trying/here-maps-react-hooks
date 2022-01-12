import React from 'react'

const MapPosition = ({ lat, lng, zoom, onChange }) => {
  const handleOnChange = (ev) => {
    console.log('onChange event', ev)
    onChange(ev.target.name, ev.target.value)
  }

  return (
    <>
      <div>
        Zoom:
        <input
          onChange={handleOnChange}
          name="zoom"
          type="number"
          value={zoom}
        />
      </div>
      <div>
        Latitude:
        <input onChange={handleOnChange} name="lat" type="number" value={lat} />
      </div>
      <div>
        Longitude:
        <input onChange={handleOnChange} name="lng" type="number" value={lng} />
      </div>
    </>
  )
}

export default MapPosition
