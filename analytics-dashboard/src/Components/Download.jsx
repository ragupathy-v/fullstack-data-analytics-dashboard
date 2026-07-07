import React, { useContext } from "react";
import axios from "axios";
import { DataContext } from "../App";
import '../styles/Download.css'
function Download() {
    const { data, filepath,API } = useContext(DataContext);

    const download=async()=>{
    try{
    const res= await axios.post(`${API}/analytics/downloaddataset/`,
      {'file_path':filepath},{responseType:'blob'});
      
      const fileurl= URL.createObjectURL(res.data)
      const downloadlink= document.createElement('a')
      downloadlink.href=fileurl
      downloadlink.download='cleaned_dataset.csv';
      downloadlink.click()
    }
    catch(e){console.log(e)}
  }
  return (
    <>
     <div className="download-card">
     <h2 className="section-title">Download Dataset</h2>
     <p className="download-desc">Export your cleaned dataset as a CSV file.</p>
     <button className="btn btn-primary" onClick={download}>dowload cleaned dataset</button>
     </div>
    </>
  )
}

export default Download