import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './book.css'
function book() {

  const baseUrl = "http://localhost:8000/api/books"
  const [data, stateData] = useState('')
  const [isLoading, setisLoading] = useState(true);
  const [error, seterror] = useState(null)
  const [selectedCategory, setselectedCategory] = useState("")
  useEffect(() => {

    const fetchData = async () => {
      try {
        let url= baseUrl;
        const response = await fetch(url);
        if(selectedCategory){
          url += `?category = ${selectedCategory}`;
        }


        if (!response.ok) {
          throw new Error('Fail to fetch data')
        }
        const jsonData = await response.json();
        stateData(jsonData)
        setisLoading(false)
      }
      catch (err) {
        console.log(err)
        seterror("Error fetching data form server response");
        setisLoading(false)
      }
    };

    fetchData();
  }, [selectedCategory]);






  return (
    <div>
      <h1>Book Page</h1>
      <Link to="/create-book" ><button className='editBtn'>+ Add New Book</button></Link>
      <div className='filters'>
        <label>Category</label>
        <select onChange={(e)=> setselectedCategory(e.target.value)}>
          <option value="">All</option>
          <option value="romance">Romance</option>
          <option value="sciences">Sciences</option>
          <option value="tailer">Tailer</option>
          <option value="poem">Poem</option>
          <option value="story">Story</option>
        </select>

      </div>
      {
        isLoading ? (<p> Loading</p>) : error ? (
          <p>{error}</p>
        ) : (<ul className="books">
          {
            Object.values(data).map(item => {
              return (
                <div key={item._id}>
                  <li>
                    <Link to={`/books/${item.slug}`}>
                      {/* <img sec={`http://localhost:8000/uploads/${item.image}`} alt={item.title} className='itemImage' /> */}
                      <h2>{item.title}</h2>
                    </Link>

                  </li>
                </div>
              )
            })
          }
        </ul>)
      }

    </div>
  )
}

export default book