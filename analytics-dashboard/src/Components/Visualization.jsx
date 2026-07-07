import React, { useState, useContext } from "react";
import { DataContext } from "../App";
import axios from "axios";
import Histogram from "./Histogram";
import Barchart from "./BarChart";
import Piechart from "./Piechart";
import '../styles/Visualization.css'

function Visualization() {
  const { data, filepath,API } = useContext(DataContext);
  const [colname, setColname] = useState("");
  const [colname2, setColname2] = useState("");
  const [image, setImage] = useState("");
  const datacleaning = async (e) => {
    const charttype = e.target.name;

    if (charttype === "Histogram" && !colname) {
      alert("Select a column");
      return;
    }

    if (charttype === "BarChart" && (!colname || !colname2)) {
      alert("Select both X and Y columns");
      return;
    }

    try {
      const res = await axios.post(
        `${API}/analytics/viasualization/`,
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
      <div className="visualization-container">
      <div className="visualization-header">visualization</div>
      <h1 className="page-heading">histogram</h1>
      <div className="chart-grid">
      <Histogram/>
      <Barchart/>
      <Piechart/>
      </div>
      </div>
    </>
  );
}

export default Visualization;