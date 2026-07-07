import React, { useState, useContext } from "react";
import { DataContext } from "../App";
import axios from "axios";
import '../styles/Histogram.css'

function Histogram() {
    const { data, filepath,API } = useContext(DataContext);
    const [colname, setColname] = useState("");
    const [image, setImage] = useState("");
    const datacleaning = async (e) => {
    const charttype = e.target.name;

    if (charttype === "Histogram" && !colname) {
      alert("Select a column");
      return;
    }

    try {
      const res = await axios.post(
        `${API}/analytics/viasualization/`,
        { charttype, file_path: filepath, colname},
        {
          withCredentials: true,
        },
      );
      console.log(res);
      setImage(res.data.image);
    } catch (er) {
      console.log(er);
    }
  };
  return (
    <>
    <div className="chart-card">
         <h1 className="chart-heading">Histogram</h1>
         <div className="chart-controls">
         <select className="select-input" value={colname} onChange={(e) => setColname(e.target.value)}>
        <option value="">select column</option>
        {data?.NameofColumns.map((column) => (
          <option key={column} value={column}>
            {column}
          </option>
        ))}
      </select>
      <button className="btn btn-primary" name="Histogram" onClick={datacleaning}>
        histogram
      </button>
      </div>
      {image && <div className="chart-image-wrapper"><img className="chart-image" src={`data:image/png;base64,${image}`} alt="histogram" /></div>}
    </div>
    </>
   
  )
}

export default Histogram