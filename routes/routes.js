const express = require('express');
const Model = require('../models/model');
const PostsModel = require('../models/PostsModel');
const router = express.Router();

module.exports = router;


//POST
router.post('/post',async (req,res) =>{
    const data = new Model({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try{
        const dataToSave =await data.save();
        res.status(200).json(dataToSave);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})
//POST A POST 
router.post('/post/post',async (req,res) =>{
    const data = new PostsModel({
        name: req.body.name,
        subject: req.body.subject,
        text: req.body.text
    })
    try{
        const dataToSave =await data.save();
        res.status(200).json(dataToSave);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

//GET all
router.get('/getAll',async (req,res) =>{
    try{
        const data = await Model.find();
        res.json(data);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//GET all Posts
router.get('/getAllPosts',async (req,res) =>{
    try{
        const data = await PostsModel.find();
        res.json(data);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//GET by id
router.get('/getOne/:id',async (req,res) =>{
    try{
        const data = await Model.findById(req.params.id);
        res.json(data);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//UPDATE by id
router.patch('/update/:id',async (req,res) =>{
    try{
        const id = req.params.id;
        const updateData = req.body;
        const options = {new: true};

        const result = await Model.findByIdAndUpdate(id,updateData,options);

        res.send(result);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

//DELETE by id
router.delete('/delete/:id',async (req,res) =>{
    try{
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted..`)

    }catch(error){
        res.status(400).json({message: error.message})
    }
})
router.delete('/delete/:name',async (req,res) =>{
    try{
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted..`)

    }catch(error){
        res.status(400).json({message: error.message})
    }
})
