import Transactions from "../models/transactions .js"
export const createTransactions=async(req,res,next)=>{
    try {
    const transactions=await Transactions.create({...req.body,createdBy:req.user._id})
    res.status(201).json(transactions)
    } catch (error) {
        next(error)
    }
}
export const getTransactions=async(req,res,next)=>{
    try {
        const transactions=await Transactions.find({createdBy:req.user._id})
        res.status(201).json(transactions)
    } catch (error) {
        next(error)
    }
}
export const updateTransactions=async(req,res,next)=>{
    try {
        const transaction=await Transactions.findOneAndUpdate({_id:req.params.id,createdBy:req.user._id},req.body,{new:true})
        if (!transaction) return res.status(404).json({ message: 'transactions not found' });
        res.status(200).json(transaction)
    } catch (error) {
        next(error)
    }
}
export const deleteTransactions=async(req,res,next)=>{
    try {
        const transaction=await Transactions.findOneAndDelete({_id:req.params.id,createdBy:req.user._id})
        if(!transaction)  return res.status(404).json({ message: 'transactions not found' });
        res.json({message:"transaction delete"})
    } catch (error) {
        next(error)
    }
}