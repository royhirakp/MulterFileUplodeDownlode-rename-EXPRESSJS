const express = require('express')
const multer = require('multer');
const router = express.Router();
const fs = require('fs')
// const RecipiModel = require("../models/RecipyModel")
const FileModel = require('../routes/UserRoute')
// const bodyParser = require('body-parser')
// router.use(bodyParser.json())

// FileStore IMAGE
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'public/file')
    },
    filename:(req,file,cb)=>{
      cb(null,Date.now() + file.originalname)
    }
  })
const uplode = multer({storage: storage})
router.post('/file', uplode.single('file') , async (req,res)=>{
    console.log(req.body,'req.body')
    console.log(req.file.mimetype,'req.file')
    // console.log('working auth complit')  
    // res.send({m:"workingg auth"})
    try {
        const recipi = await FileModel.create({
            title: req.body.title,
            author: req.body.author,
            file: {
                data: fs.readFileSync('public/file/' + req.file.filename),
                contentType: req.file.mimetype
              },    
            user: req.userID
        })
        res.json({
            recipi,
            status:"sucsess"
        })
    } catch (error) {
        res.status(500).json({
            status:"error",
           messege: error.messege
        })
    }
})


//get a particuler recipi



module.exports = router;