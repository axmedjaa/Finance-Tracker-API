import mongoose from "mongoose";
const transactionsSchema=new mongoose.Schema({
    title:{type:String,required:true},
    amount:{type:Number,required:true},
    type:{
        type:String,
        enum:['income','expense'],
        default:'income'
    },
    category: {
    type:String,
    required:true},
    date:Date,
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'auth',
        required:true,
    }
},{timestamps:true})
const Transactions=mongoose.model('transactions',transactionsSchema)
export default Transactions