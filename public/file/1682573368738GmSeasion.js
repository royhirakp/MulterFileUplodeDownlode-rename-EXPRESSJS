const express = require('express')
const multer = require('multer');
const router = express.Router();
// const fs = require('fs')
const gmseasion = require("../Model/AgrigationMethod")
// const FileModel = require('../Model/File')
const path = require('path');
// const bodyParser = require('body-parser')
// router.use(bodyParser.json())

router.post('/data', async (req,res)=>{
  console.log(req.body)
  // res.json("data comming ")
  

  try {
     let  data = await gmseasion.find()
      console.log('type 2')
      res.json({
        status:"sucsess",
        data                
      })
  } catch (error) {
    console.log('type 3 error ')
      res.status(500).json({
          status:"error",
         messege: error.messege
      })
  }
})
router.post('/data', async (req,res)=>{
    // console.log(req.body)
    // res.json("data comming ")
    let arr = [{title: "hirak",
                description: "helo",
                age:19,
                gender:"male",
                dev:"aggrigation"},
                {title: "chris",
                description: "helo",
                age:18,
                gender:"feleme",
                dev:"aggrigation"},
                {title: "moosk",
                description: "feleme",
                age:19,
                gender:"feleme",
                dev:"aggrigation"},
                {title: "hirak1",
                description: "hello",
                age:25,
                gender:"male",
                dev:"aggrigation"}
              ]
    

    try {
       let data = await gmseasion.create({title: "hirak1",
       description: "hello",
       age:25,
       gender:"male",
       dev:"aggrigation"})
       console.log(data,'data')
        // console.log('type 2')
        res.json({
          status:"sucsess",
          data
                  
        })
    } catch (error) {
      // console.log('type 3 error ')
        res.status(500).json({
            status:"error",
           messege: error.messege
        })
    }
})







module.exports = router;