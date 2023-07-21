const express= require('express');
const router= express.Router();
const Book= require('./models/Book');

// Get all Books
router.get('/api/books',async(req,res)=>{
        const category= req.query.category;
        const filter={};
        if(category){
                filter.category = category;
        }
        const data= await Book.find(filter);
        res.status(200).json(data);
     
    
});
// get Book by Slup
router.get('/api/books/:slug',async(req,res)=>{
        const slug= req.params.slug;
        const data= await Book.findOne({slug:slug});
        res.status(200).json(data);
     
    
});

// Create a new Book
router.post('/api/books',async(req,res)=>{
        const newBook=  new Book({
                title:req.body.title,
                description:req.body.description,
                slug:req.body.slug,
                category:req.body.category
        });

        await Book.create(newBook);
        res.json('Data Inserted');
     
    
});


// Update Book
router.put('/api/books',async(req,res)=>{
        const bookId= req.body.bookId;
        const updateBook={
                title:req.body.title,
                description:req.body.description,
                slug:req.body.slug,
                category:req.body.category
        };

        await Book.findByIdAndUpdate(bookId, updateBook);
        res.json('Data Inserted');
     
    
});


router.delete('/api/books/:id',async(req,res)=>{
        const bookId= req.params.id;
        try{
                await Book.findByIdAndRemove(bookId);
                res.json('How to Delete' + req.body.bookId);
        }
        catch(err){
                res.json(err);
        }       

})

module.exports = router;