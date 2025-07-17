import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api/apiClient";
import { extraErrorMessage } from "../../utiliy/errorUtility";
const TransactionForm = ({ transaction,open = true, onOpenChange }) => {
  const [transForm, setTransForm] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "",
    date: "",
  });
  const [validationError, setValidationError] = useState(null);
  const queryClient = useQueryClient()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransForm({ ...transForm, [name]: value });
  };
  const handleTypeChange = (value) => {
    setTransForm({ ...transForm, type: value });
  };
  const handleCancel = () => {
    onOpenChange?.(false);
  };
   useEffect(() => {
        if (transaction) {
            setTransForm({
                title: transaction.title || '',
                amount: transaction.amount || '',
                type: transaction.type || 'pending',
                category:transaction.category||"",
                date: transaction.date ? new Date(transaction.date).toISOString().split('T')[0] : ''
            });
        } else {
            setTransForm({
                title: '',
                description: '',
                status: 'pending',
                dueDate: ''
            });
        }
        setValidationError(null);

    }, [transaction, open])
  const createTranMutation = useMutation({
    mutationFn: async (transData) => {
      const response = await api.post("/transactions", transData);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(['transaction']);
      onOpenChange?.(false);
    },
    onError: (error) => {
      console.error(error);
      setValidationError(extraErrorMessage(error)||error)
    },
  });
  const UpdateTransMutation=useMutation({
    mutationFn:async(transData)=>{
      const response=await api.put(`/transactions/${transaction._id}`,transData)
      return response.data
    },
    onSuccess:()=>{
        queryClient.invalidateQueries(['transaction']);
        onOpenChange?.(false);
    }
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    const amountNum = Number(transForm.amount);
    if (!transForm.title) {
      setValidationError("title is required");
      return;
    }
    const transData = {
      title: transForm.title,
      amount: amountNum,
      type: transForm.type,
      category: transForm.category,
      date: transForm.date,
    };
    if(transaction){
      UpdateTransMutation.mutate(transData)
    }else{
    createTranMutation.mutate(transData);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>add transaction</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a transaction.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {validationError && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
              {validationError}
            </div>
          )}
          <div>
            <Label htmlFor="title">title</Label>
            <Input
              type="text"
              name="title"
              placeholder="inter transaction name"
              value={transForm.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="amount">amount</Label>
            <Input
              type="number"
              name="amount"
              placeholder="enter amount"
              value={transForm.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="type">amount</Label>
            <Select value={transForm.type} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="select transaction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">income</SelectItem>
                <SelectItem value="expense">expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              placeholder="Enter category"
              value={transForm.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={transForm.date}
              onChange={handleChange}
            />
          </div>
          <DialogFooter>
            <Button variant={"outline"} onClick={handleCancel}>
              cancel
            </Button>
            <Button type="submit">create transaction</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionForm;
