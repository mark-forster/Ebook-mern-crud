import React, {useState, useEffect} from 'react'
import {Link,useNavigate, useParams} from 'react-router-dom'
import './book.css'
function editBook() {

    const nagviate = useNavigate();

    const urlSlug= useParams();
    const  baseUrl= `http://localhost:8000/api/books/${urlSlug.slug}`

    const [bookId, setbookId] = useState('');
    const [title, settitle] = useState('');
    const [slug, setslug] = useState('');
    const [description, setdescription] = useState('');
    const [category, setcategory] = useState([]);
    const [image, setimage] = useState('');
    const [submitted, setsubmitted] = useState("")


    const fetchData= async ()=>{
        try{
            const response= await fetch(baseUrl);
            if(!response.ok){
                throw new Error ('Error fetching book data')
            }

            const data= await response.json();

            setbookId(data._id);
            settitle(data.title);
            setslug(data.slug);
            setdescription(data.description);
            setimage(data.image);
            setcategory(data.category);

        }
        catch(err){

        }
    }

    useEffect(()=>{
        fetchData();
    },[]);




    const createBook= async(e)=>{
        e.preventDefault();
        console.table([title,slug,description,category])
        // const formData= new FormData();
        // formData.append("title",title);
        // formData.append("slug",slug);
        // formData.append("description",description);
        // formData.append("category",category);
        try{
            // const response= await fetch('http://localhost:8000/api/books',{
            //     method:'POST',
            //     headers:{'Content-Type': 'application/json'},
            //     body: FormData
            // });
            const response= await fetch('http://localhost:8000/api/books',{
                method:'PUT',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({
                    bookId:bookId,
                    title: title,
                    slug: slug,
                    description: description,
                    category: category
                })
            });

            if(response.ok){
                settitle(""),
                setslug(""),
                setdescription(""),
                setcategory(""),
                setsubmitted(true)
            }
            else{
                console.log("Fail to submit Data");
            }

        }
        catch(err){
            console.error(err);
        }
    };

    const handleCategoryChange=(e)=>{
        setcategory(e.target.value.split(",").map(category=>category.trim()))
    };

    
const removeBook= async (e)=>{
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:8000/api/books/' + bookId,
      {
        method: 'DELETE'
      });
      if(response.ok){
        nagviate('/books');
        console.log("Book Delete Success");
      }
    }
    catch (err) {
      throw new Error("Error removing book form server response")
    }
  }




  return (
    <div>
        <h1>Edit Book Book</h1>
        <p>
            This is where use Nodejs, Express & MongoDB to grab some data.The data below is pulled form a mongoDB database
        </p>
        <button onClick={removeBook} className='book'>Delete</button>
        
        {
            submitted  ? (<p> Book Edited Successfully</p>) : (
                <form className='create-form' onSubmit={createBook} encType='multipart/form-data' method='POST'>
                <label>Title</label>
                <input type="text" name="title" value={title} onChange={(e)=>settitle(e.target.value)} className='input-form' placeholder='Enter Title here' required/> <br />
                <label>Slug</label>
                <input type="text" name="slug" value={slug} onChange={(e)=>setslug(e.target.value)} className='input-form' placeholder='Enter Slug here' required/> <br />
                <label>Description</label>
                <input type="text" name="description" value={description} onChange={(e)=>setdescription(e.target.value)} className='input-form' placeholder='Enter descripton here' required/> <br />
                <label>Category</label>
                <input type="text" name="category" value={category} onChange={handleCategoryChange} className='input-form' placeholder='Enter category here' required/> <br />
                <button type="submit" className='create_btn'>Update</button>
            </form>
            )
        }
    </div>
  )
}

export default editBook