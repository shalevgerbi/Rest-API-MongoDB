import React from 'react'

export default function AddPost({...props}) {
    const fetchData = async(requestOptions) => {
        const response = await fetch(`/api/post/post/`,requestOptions)
        const results =await response.json();
        console.log(results);
    }
    const addPost = (e) => {
        
            e.preventDefault();
            try{
                const name = (props.user.name)
                const subject = (e.target.subjectDB.value)
                const text = (e.target.textDB.value);
                
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: name, subject: subject, text: text})
                };
                fetchData(requestOptions)
                
            }
            catch(error){
                console.log(error);
            }
             
        
        
    }
  return (
    <section>
    <div>
    
      <h1 id="title">Add A Post</h1>
      
      
      <form onSubmit={(e) => addPost(e)}>
        <label>subject: </label> <input type="text" name="subjectDB" />
        <br /><br/>
        <label>Text: </label> <textarea type="text" name="textDB" />
        <br />
        <button type="submit">Submit</button>
      </form>
      {/* {error && <h1>{error}</h1>} */}
    </div>
  </section>
  )
}
