const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/Social-media-app")

const mdb=mongoose.connection

mdb.on("open",()=>{
    console.log('ALL GOOD')
})
mdb.on("error",(err)=>{
    console.log(err)
})

module.exports=mdb