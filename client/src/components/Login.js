import React from "react";
import { useState } from "react";
import {  Link, Navigate } from "react-router-dom";

export default function Login() {
//   const [data, setData] = useState(null);
    const [user,setUser] = useState(null);
    const [error,setError] = useState(null);
  
  const fetchData =  async(emailDB, requestOptions) => {
    const res = await fetch(`/api/getAll`, requestOptions)
     const response = await res.json();
     return response;
     
    //   .then((data) => console.log(data))
    //   .then((data) => setData(data));

    //   .then((res) => {
    //     return filterEmails;
    //   });
  };

  const findbyEmail =async (emailDB, requestOptions) => {
    
    const response = await fetchData(emailDB, requestOptions);
    console.log(response)
     let filterEmails = [];
     response.map((item) => 
            item.email === emailDB ?  
            filterEmails.push(item)
            : null
         
        )
    
     
     console.log(filterEmails)
     return filterEmails[0];
    
  }
  const login = async(e) => {
    e.preventDefault();
    try {
      const nameDB = e.target.nameDB.value;
      const emailDB = e.target.emailDB.value;
      const pwdDB = e.target.pwdDB.value;

      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        
      };
      const results = await findbyEmail(emailDB, requestOptions);
      if(!results) {
          setError("wrong mail: "+ emailDB);
      }
      if(results.name !== nameDB){
        setError("wrong name: " + nameDB);
        console.log("wrong name: " + nameDB);
        return;
      }
      else if(results.password !== pwdDB){
        setError("wrong password for user: " + nameDB);
        console.log("wrong password for user " + nameDB)
        return;
      }
      else{
        console.log(results);
        setUser(results);    
        setError(null);
        console.log("success");
        
        sessionStorage.setItem("loggedInUser",results._id);
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
      
    <section>
      <div>
      
        <h1 id="title">Log In</h1>
        {user && <Navigate
         to ={{
             pathname: "/home",
             state: {user:user},
             props: {user:user}
         }}/>}
       
        {user && <h1>Hello {user.name}</h1>}
        <form onSubmit={(e) => login(e)}>
          <label>Name: </label> <input type="text" name="nameDB" />
          <br />
          <label>E-mail: </label> <input type="email" name="emailDB" />
          <br />
          <label>Password: </label> <input type="password" name="pwdDB" />
          <br />
          <button type="submit">Submit</button>
        </form>
        <Link to="/register">Register</Link>
        {error && <h1>{error}</h1>}
      </div>
    </section>
    
  );
}
