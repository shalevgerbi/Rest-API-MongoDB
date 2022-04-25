import React, { useEffect, useState } from 'react'
// import { count } from '../../../models/model';

export default function Posts() {
    const [posts,setPosts] = useState(null);
    useEffect(() =>{
        fetchData();
    },[])

    
    const fetchData = async () => {
        const res = await fetch("/api/getAllPosts");
        const result = await res.json();
        console.log(result);
        setPosts(result);
        return result;
    }
    let key = 0;
    const count = () =>{
        key++;
    }
    return (
    <section>
    <div>
        {posts &&
        
        posts.map(post => 
            <div key={key} className="post">
                <h3>{post.name}</h3>
                <h1>{post.subject}</h1>
                <h2>{post.text}</h2>
                {count()}
            </div>
            
        )
    }
    </div>
    </section>
  )
}
