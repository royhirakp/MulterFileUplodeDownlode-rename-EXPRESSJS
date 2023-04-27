const express = require("express");
const userModel = require('../Model/AgrigationMethod')
// const { body, validationResult } = require("express-validator")

const router = express.Router();
router.post('/agg', async (req,res)=>{
    try {
        console.log(req.body)
        // res.send({data:"sucessssss"})
        let arr = [{title: "aninme",
                    description: "helo",
                    age:27,
                    gender:"feleme",
                    dev:"aggrigation"},
                    {title: "hero",
                    description: "helo",
                    age:22,
                    gender:"feleme",
                    dev:"aggrigation"},
                    {title: "zero",
                    description: "feleme",
                    age:90,
                    gender:"male",
                    dev:"aggrigation"},
                    {title: "hirak15555555550",
                    description: "hello",
                    age:50,
                    gender:"male",
                    dev:"aggrigation"}
              ]
              
    let creDAta = userModel.insertMany(arr)

    res.json({
        creDAta
    })
    } catch (error) {
        res.send({error})
    }
})


router.get('/get',async (req,res)=>{
    let tada = await userModel.aggregate([{$group:{_id:null, ageava:{$avg:"$age"}}}])
    console.log(tada.length)
    res.json(tada)
})

router.get('/getfulll',async (req,res)=>{
    let tada = await userModel.find({age:50})
    console.log(tada.length)
    res.json(tada)
})
module.exports = router;