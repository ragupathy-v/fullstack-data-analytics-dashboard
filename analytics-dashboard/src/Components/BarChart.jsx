import React, { useState, useContext } from "react";
import { DataContext } from "../App";
import axios from "axios";
import '../styles/Barchart.css'

function Barchart() {
  const { data, filepath } = useContext(DataContext);
  const [colname, setColname] = useState("");
  const [colname2, setColname2] = useState("");
  const [image, setImage] = useState("");


  const datavisual = async (e) => {
    const charttype = e.target.name;



    if (charttype === "BarChart" && (!colname || !colname2)) {
      alert("Select both X and Y columns");
      return;
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/analytics/viasualization/",
        { charttype, file_path: filepath, colname, colname2 },
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
      <div className="chart-label">visualization</div>

      <h3 className="title">bar</h3>
      <div className="chart-controls">
      <select className="select-input" value={colname} onChange={(e) => setColname(e.target.value)}>
        <option value="">select column x-axis</option>
        {data?.NameofColumns.map((column) => (
          <option key={column} value={column}>
            {column}
          </option>
        ))}
      </select>

      <select className="select-input" value={colname2} onChange={(e) => setColname2(e.target.value)}>
        <option value="">select column y-axis</option>
        {data?.NameofColumns.map((column) => (
          <option key={column} value={column}>
            {column}
          </option>
        ))}
      </select>
      <button className="btn btn-primary" name="BarChart" onClick={datavisual}>
        Barchart
      </button>
      </div>
      {image && <div className="chart-image-wrapper"><img className="chart-image" src={`data:image/png;base64,${image}`} alt="BarChart" /></div>}
      </div>
    </>
  );
}

export default Barchart;