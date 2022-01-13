import React from 'react'

const MapPosition = ({ lat, lng, zoom, onChange }) => {
  const handleOnChange = (ev) => {
    console.log('input event', ev)
    /* 
    SyntheticBaseEvent
    bubbles: true
cancelable: false
currentTarget: null
defaultPrevented: true
eventPhase: 3
isDefaultPrevented: ƒ functionThatReturnsTrue()
isPropagationStopped: ƒ functionThatReturnsFalse()
isTrusted: true
nativeEvent: Event {isTrusted: true, type: 'input', target: input, currentTarget: null, eventPhase: 0, …}
target: input
timeStamp: 5549.099999904633
type: "change"
_reactName: "onChange"
_targetInst: null
[[Prototype]]: Object
     */
    ev.preventDefault()
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
