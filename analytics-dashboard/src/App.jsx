import { createContext, useState } from "react";
import axios from "axios";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import './App.css'
{/* axiosurl */}
const API = import.meta.env.VITE_API_URL;

export const DataContext=createContext()

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [filepath, setFilePath] = useState(null);


  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", file);
    console.log("sending file");

    try {
      const res = await axios.post(
        `${API}/analytics/data-info/`,
        formData,
        { withCredentials: true },
      );
      setData(res.data?.analysedata);
      setFilePath(res.data?.file_path);
      console.log(res.data);
      console.log(res.data?.file_path);
    } catch (err) {
      console.log(err);
    }
    
  };


  return (
    <>
      <div className="app-shell">
      <div className="upload-section">
        <label className="upload-label">Upload your dataset</label>
        <div className="upload-controls">
        <input className="file-input" type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button className="btn btn-primary" onClick={handelSubmit}>Analyze data</button>
        </div>
        {file && <p className="file-name">Selected file: {file.name}</p>}
      </div>

      
      {/*context api to share the states and setstatef function */}
      <DataContext.Provider value={{data,filepath,file,setData,API}}>
      <Header/>
      <main className="app-main">
      <Outlet/>
      </main>
      </DataContext.Provider>
      </div>
    </>
  );
}

export default App;