
import React, { useState } from 'react'
export default function DeleteUser() {
    const [data,setData] = useState('');
   const deleteUser = (e) =>{
        

              
        try{
            
            const nameDB = (e.target.nameDB.value)
            // console.log(nameDB)
            // let allNames = [];
            const fetchData =async () =>{await fetch(`/api/getAll`).then((res) =>res.json()).then((res) =>setData(res))}
            let filterNames = []
            fetchData().then(data.map((name) => nameDB===name.name ? filterNames.push(name._id) : null));
            console.log(data)
            
            
            console.log(filterNames)
            for(let id=0;id<filterNames.length;id++) {
                console.log(JSON.stringify(filterNames[id].toString()));
                const requestOptions = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    // body: JSON.stringify(filterNames[id])
                };
            fetch(`/api/delete/${filterNames[id]}`,requestOptions).then((res) =>console.log(res))    
            }
            
        }
        catch(error){
            console.log(error);
        }}
    
  return (
    <section>
    <div>
        <h1>delete a user</h1>
        <form onSubmit ={e =>{e.preventDefault();deleteUser(e);}}>
            <label>name: </label> <input type="text" name="nameDB"/><br/>
            <button type="submit">Submit</button>
        </form>
        
    </div>
    </section>
  )
}
