import React from 'react'

const defaultProps = {
  timeline: {start: 0, end: 0},
  line: 0
}

const Segment = (props = defaultProps) => {
  const {line, segment, totalTrackLength} = props
  const width = (segment.end - segment.start)*100/totalTrackLength
  const left = segment.start*100/totalTrackLength

  return (
    <div
      className='segment'
      style={{width: `${width}%`, left: `${left}%`, top: `${20*line}px`}}
    >
      <span>{segment.start}</span>
      <span>{segment.end}</span>
    </div>
  )
}

export default Segment
