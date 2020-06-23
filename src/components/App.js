import React, { useState } from "react";

import "./../styles/styles.css";
import TimelineSegments from "./TimelineSegments";

import { data, totalTrackLength } from "./../data/sampleData";

const App = () => {
  const [cData, setData] = useState([]);
  const [cTotalTrackLength, setTotalTrackLength] = useState(0);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [noti, setNoti] = useState("none");

  const onChangeInput = (key, value) => {
    key === "start" && setStart(value);
    key === "end" && setEnd(value);
  };

  const isValidDataSegment = (start, end) => {
    const checkNegative = start >= 0 && end >= 0;
    const checkEndGreaterStart = end > start;
    const checkNull = start != null && end != null;
    const checkInvalidNumber = !isNaN(start) && !isNaN(end);

    return (
      checkNegative && checkEndGreaterStart && checkNull && checkInvalidNumber
    );
  };

  const addData = () => {
    if (isValidDataSegment(parseInt(start, 10), parseInt(end, 10))) {
      const segment = {
        start: parseInt(start, 10),
        end: parseInt(end, 10),
        id: cData.length + 1
      };
      cTotalTrackLength < segment.end && setTotalTrackLength(segment.end);
      setData([...cData, segment]);
      setNoti("none");
    } else {
      setNoti("inline-block");
    }
  };

  return (
    <>
      <div>
        <h2>Data From Example File</h2>
        <TimelineSegments data={data} totalTrackLength={totalTrackLength} />
      </div>
      <div>
        <h2>Data From User</h2>
        <div className="form-submit">
          <span>Timeline segment:</span>
          <input
            placeholder={"start time"}
            type="number"
            min="0"
            onChange={e => onChangeInput("start", e.target.value)}
          />
          <input
            placeholder={"end time"}
            type="number"
            min="0"
            onChange={e => onChangeInput("end", e.target.value)}
          />
          <button onClick={addData}>Add</button>
          <div className="notification" style={{ display: noti }}>
            Input invalid
          </div>
        </div>
        <TimelineSegments data={cData} totalTrackLength={cTotalTrackLength} />
      </div>
    </>
  );
};

export default App;
