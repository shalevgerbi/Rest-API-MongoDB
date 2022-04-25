import React, { useEffect, useState } from "react";
import AddPost from "./AddPost";
import Posts from "./Posts";

export default function Home({ props }) {
  const [user, setUser] = useState(null);
  // const location = useLocation();
  // const {user} = location.state;
  useEffect(() => {
    const getUser = () => {
        fetchData();
        
      };
      const fetchData = async () => {
        const response = await fetch(`/api/getOne/${userId}`);
        const result = await response.json();
        console.log(result);
        setUser(result);
        return result;
      };
    getUser();
    // console.log(userId);
  }, []);
  const userId = sessionStorage.getItem("loggedInUser");

  

  

  
  return <div>
      {user && <h1>Hello {user?.name}</h1>}
      <AddPost user={user}/>
      <br/>
      <Posts />
      </div>;
}
