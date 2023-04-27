const mongoose = require("mongoose")

const agg = mongoose.Schema({    
    title: { type: String },
    description: { type: String },
    age: {type:Number},
    gender:{type: String},
    dev:{type: String}
})

const heeee = mongoose.model("aggrigation", agg)

module.exports = heeee