import React, {useState} from 'react'
import './book.css'
function createBook() {
    const [title, settitle] = useState('');
    const [slug, setslug] = useState('');
    const [description, setdescription] = useState('');
    const [category, setcategory] = useState([]);
    const [image, setimage] = useState('');
    const [submitted, setsubmitted] = useState("")

    const createBook= async(e)=>{
        e.preventDefault();
        console.table([title,slug,description,category])
        const formData= new FormData();
        formData.append("title",title);
        formData.append("slug",slug);
        formData.append("description",description);
        formData.append("category",category);
        try{
            // const response= await fetch('http://localhost:8000/api/books',{
            //     method:'POST',
            //     headers:{'Content-Type': 'application/json'},
            //     body: FormData
            // });
            const response= await fetch('http://localhost:8000/api/books',{
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({
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


  return (
    <div>
        <h1>Create Book</h1>
        <p>
            This is where use Nodejs, Express & MongoDB to grab some data.The data below is pulled form a mongoDB database
        </p>
        
        {
            submitted  ? (<p> Book Added Successfully</p>) : (
                <form className='create-form' onSubmit={createBook} encType='multipart/form-data' method='POST'>
                <label>Title</label>
                <input type="text" name="title" value={title} onChange={(e)=>settitle(e.target.value)} className='input-form' placeholder='Enter Title here' required/> <br />
                <label>Slug</label>
                <input type="text" name="slug" value={slug} onChange={(e)=>setslug(e.target.value)} className='input-form' placeholder='Enter Slug here' required/> <br />
                <label>Description</label>
                <input type="text" name="description" value={description} onChange={(e)=>setdescription(e.target.value)} className='input-form' placeholder='Enter descripton here' required/> <br />
                <label>Category</label>
                <input type="text" name="category" value={category} onChange={handleCategoryChange} className='input-form' placeholder='Enter category here' required/> <br />
                <button type="submit" className='create_btn'>Create</button>
            </form>
            )
        }
    </div>
  )
}

export default createBook