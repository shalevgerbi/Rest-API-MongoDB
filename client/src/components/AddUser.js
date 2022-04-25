import React from 'react'

    const addUser = (e) => {
        // e.preventDefault();
        try{
            const name = (e.target.nameDB.value)
            const age = (e.target.ageDB.value)
            
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, age: age})
            };
            fetch(`/api/post/`,requestOptions).then((res) =>res.json()).then((res) =>console.log(res))
        }
        catch(error){
            console.log(error);
        }
         
    
    }
export default function AddUser() {
  return (
    <section>
    <div>
        <h1>add a user</h1>
        <form onSubmit ={e =>addUser(e)}>
            <label>name: </label> <input type="text" name="nameDB"/><br/>
            <label>age </label> <input type="number" name="ageDB"/><br/>
            <button type="submit">Submit</button>
        </form>
        
    </div>
    </section>
  )
}
