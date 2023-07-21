import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './book.css'
function sigleBook() {
  
  const [data, stateData] = useState('')
  const slugUrl= useParams(stateData)
  const baseUrl = `http://localhost:8000/api/books/${slugUrl.slug}`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl)
        if (!response.ok) {
          throw new Error('Fail to fetch data')
        }
        const jsonData = await response.json();
        stateData(jsonData);
      }
      catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='detailBook'><h1>Single Book</h1>
        <Link to={"/books"}>Back Books</Link>
        <div className='book'>
        <h1>Book Title: {data.title}</h1>
        <h3>Book Description: {data.description}</h3>
        <h3>Star :</h3>
        <h3>Category: {data.category}</h3>
        <Link to={`/edit-book/${data.slug}`} ><button className='editBtn'>Edit Book</button></Link>
        </div>
    </div>
    
  )
}

export default sigleBook