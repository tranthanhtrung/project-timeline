import React, { useState, useEffect } from "react";

import Segment from "./Segment";

// assume all data is valid and sorted by start time
const TimelineSegments = ({ data = [], totalTrackLength = 0 }) => {
  const [segments, setSegments] = useState();
  const [countLine, setCountLine] = useState(0);

  useEffect(() => {
    sortData(data);
    let lines = [];

    lines.push([data[0]]);
    // generate structure of timelines with time not overlap
    for (let i = 1; i < data.length; i++) {
      for (let key = 0; key < lines.length; key++) {
        let len = lines[key].length;
        if (lines[key][len - 1].end <= data[i].start) {
          lines[key].push(data[i]);
          break;
        }
        if (key === lines.length - 1) {
          lines.push([data[i]]);
          break;
        }
      }
    }

    setCountLine(lines.length);
    setSegments(generateSegment(lines, totalTrackLength));
  }, [data, totalTrackLength]);

  return (
    <div className="container" style={{ height: `${30 * countLine}px` }}>
      {segments}
    </div>
  );
};

const generateSegment = (lines, totalTrackLength) => {
  let segments = [];
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      const segment = lines[i][j];
      segment &&
        segments.push(
          <Segment
            key={segment.id}
            segment={segment}
            line={i}
            totalTrackLength={totalTrackLength}
          />
        );
    }
  }
  return segments;
};

const sortData = data => {
  data.sort((a, b) => {
    return a.start - b.start || (a.start === b.start && a.end - b.end);
  });
};

export default TimelineSegments;
