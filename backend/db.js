const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()

const port=process.env.PORT||5000
const mongodb_url=process.env.MONGODB_URI

const connectDB=async()=>{
  try{
     const conn=await mongoose.connect(mongodb_url
      // , { useNewUrlParser: true, 
      //     useUnifiedTopology: true }
        )
       console.log("MongoDB Connected")
      }
      catch(err){
       console.error("Error connecting to MongoDB", err)
       process.exit(1)
      }
};
module.exports = connectDB;