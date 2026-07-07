import React, { useContext, useState } from 'react'

import axios from 'axios'
import { DataContext } from '../App'
import '../styles/Datacleaning.css'

function DataCleaning(props) {
    const{file,filepath,data,setData}=useContext(DataContext)
    const [colname,setColname]=useState('')
    
    const datacleaning=async(e)=>{
         const method=e.target.name

         if(method==='dropcolumn' && !colname){
          alert('select a column to drop')
          return
         }

        try{
          const res=await axios.post('http://127.0.0.1:8000/analytics/datacleaning/',{method,file_path:filepath,colname}, {
        withCredentials: true
        
    })
    console.log(res.data)
    setData(res?.data?.data)
    alert(res.data.message)
          
        }catch(er){
            console.log(er)
        }    }

       
  return (
    <>
    <div className="datacleaning-card">
    <h2 className="section-title">DataCleaning</h2>
    <hr className="divider"/>
    <div className="action-row">
    <button className="btn btn-secondary" name='dropduplicates' onClick={datacleaning}>delete duplicate</button>
    <button className="btn btn-secondary" name='deletenullrows' onClick={datacleaning}>Delete null rows</button>
    </div>
    {/* <input placeholder='enter a column name to delete' onChange={(e)=>setColname(e.target.value)} / >
    <button name='deletecolumn' onClick={datacleaning}>Delete column</button> */}
    <div className="action-row">
    <select className="select-input" value={colname} onChange={(e)=>setColname(e.target.value)}>
      <option value='' >select column</option>
      {data?.NameofColumns.map((column)=>(<option key={column} value={column}>{column}</option>))}
    </select>
    <button className="btn btn-danger" name='dropcolumn' onClick={datacleaning}>drop column</button>
    </div>
    </div>
    </>
  )
}

export default DataCleaning