import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
// import { Route } from 'react-router-dom'

export default function Register() {

  const [error,setError] = useState(null);
  const [user,setUser] = useState(null);

  const fetchData = async () => {
    const res = await fetch(`/api/getAll`);
    const response = await res.json();
    console.log(response);
    return response;
  };

  const checkMail = async (mail) => {
    let filterEmails = [];
    const result = await fetchData();
    result.map((item) =>
      mail === item.email ? filterEmails.push(item._id) : null
    );
    // console.log(data);
    return filterEmails;
    // fetch(`/api/getAll/`,requestOptions).then((res) =>res.json()).then((res) =>console.log(res))
  };
  const addUser = async (e) => {
    e.preventDefault();
    try {
      const nameDB = e.target.nameDB.value;
      const emailDB = e.target.emailDB.value;
      const pwdDB = e.target.pwdDB.value;
      const results = await checkMail(emailDB);
      if (results.length !== 0) {
        // let para = document.createElement("p");
        setError("error email is already registered")
        console.log("error email is already registered");
        // document.body.appendChild(para);
        return;
      }

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameDB, email: emailDB, password: pwdDB }),
      };
      
    await fetch(`/api/post/`, requestOptions);
    const response = await fetch(`/api/getAll`)
    const result = await response.json();
    const FilterRes = result.filter(item => item.email === emailDB);
    console.log(FilterRes)
    setUser(FilterRes);

    sessionStorage.setItem("loggedInUser",FilterRes[0]._id);
    
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div>
        <h1 id="title">Register </h1>
        {user && <Navigate
         to ={{
             pathname: "/home",
             state: {user:user},
             props: {user:user}
         }}/>}
        {user && <h1>hello {user}</h1>}
        <form onSubmit={(e) => addUser(e)}>
          <label>Name: </label> <input type="text" name="nameDB" />
          <br />
          <label>E-mail: </label> <input type="email" name="emailDB" />
          <br />
          <label>Password: </label> <input type="password" name="pwdDB" />
          <br />
          <button type="submit">Submit</button>
        </form>
        <Link to="/">Log In</Link>
        {error && <h1>{error}</h1>}
      </div>
    </section>
  );
}
