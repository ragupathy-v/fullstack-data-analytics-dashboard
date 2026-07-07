import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { DataContext } from "../App";
import '../styles/Datainfo.css'

export const Datainfo = () => {
  const{data}=useContext(DataContext)
  return (
    <>
      <h3>Data set information</h3>
      {!data&&<p className="empty-state">no data</p>}
      {data&&(
      <div className="datainfo-container">
      <div className="stats-grid">
      <p className="stat-card">number of item in data set-{data.NumberofRows}</p>
      <p className="stat-card">duplicate rows-{data?.NumberofDuplicateRows}</p>
      <p className="stat-card">Shape of the dataset: {data?.ShapeofDataset[0]} X {data?.ShapeofDataset[1]}</p>
      <p className="stat-card">Rows: {data.ShapeofDataset[0]}</p>
      <p className="stat-card">Columns: {data.ShapeofDataset[1]}</p>
      </div>
      <div className="info-card">
      <h1 className="section-title">Column Names</h1>
      <ul className="pill-list">{data?.NameofColumns.map((column,index)=>(<li className="pill" key={index}>{column}</li>))}</ul>
      </div>
      <div className="info-card">
      <h1 className="section-title">Null Values</h1>
      <ul className="kv-list">{Object.entries(data.Numberofnull).map(([key,value])=>(<li className="kv-row" key={key}>{key}:{value}</li>))}</ul>
      </div>
      <div className="info-card">
      <h1 className="section-title">Data Types</h1>
      <ul className="kv-list">{Object.entries(data.DatatypeofColumns).map(([key,value])=>(<li className="kv-row" key={key}>{key}:{value}</li>))}</ul>
      </div>
      </div>)
}
  
  
    </>
  );
};