import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import React from 'react'; 



const Jsonapi = () => {

     let [data,setData]=useState({
        name:'',
        age:''
    })

    let[alldata,setAlldata]=useState([])
    let [id,setId]=useState('')

      useEffect(()=>{
        axios.get("http://localhost:3000/test")
        .then((del)=>setAlldata(del.data))
    }) 
    let handleChange=(e)=>{
        let nm=e.target.name
        let vl=e.target.value

        setData({
            ...data,
            [nm]:vl
        })
    }
    let saveData = (e)=>{

        e.preventDefault()

      if(id!=""){
        axios.put("http://localhost:3000/test/"+id,data)

      }else{
        axios.post("http://localhost:3000/test",data)

      }
    }
    let deltData=(id)=>{
        axios.delete("http://localhost:3000/test/"+id)
        
    }
    let editData =(id)=>{

        axios.patch("http://localhost:3000/test/"+id)
            .then((del)=>setData(del.data))
        setId(id)
        
    }
  return (
    <div>
      <form action="#" method="post" onSubmit={saveData}>
        <label htmlFor="">Name:- </label>
        <input type="text" name="name" id="name" placeholder='Enter your name' value={data.name} onChange={handleChange}/><br></br><br></br>
        <label htmlFor="">Age:- </label>
        <input type="number" name="age" id="age" placeholder='Enter your age' value={data.age} onChange={handleChange}/><br></br><br></br>
        <input type="submit" value="Save" />
      </form><br></br><br></br>
      <table border={'2px'}>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                alldata.map((i)=>{
                    return(
                        <tr>
                            <td>{i.id}</td>
                            <td>{i.name}</td>
                            <td>{i.age}</td>
                            <td>
                                <button onClick={()=>editData(i.id)}>Edit</button>
                                <button onClick={()=>deltData(i.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
      </table>
    </div>
  )
}

export default Jsonapi
