import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  Edit2,
  MoreVertical,
  Trash2,
  Wallet,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api/apiClient";
import { Badge } from "../ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

const TransactionBox = ({ transaction, editingTrans }) => {
    const [showDeleteDialog, setShowDeleteDialog] =useState(false);
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async (transactionID) => {
      const response = await api.delete(`/transactions/${transactionID}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["transaction"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleDelete = () => {
    deleteMutation.mutate(transaction._id)
    setShowDeleteDialog(false)
  };
  const isIncome = transaction.type === "income";
  return (
    <>
      <Card>
        <CardHeader className={"flex items-center justify-between"}>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Wallet className="text-primary" />
            {transaction.title}
          </CardTitle>
          <div className="flex items-center">
            {isIncome ? (
              <ArrowUpCircle className="h-6 w-6 text-green-500" />
            ) : (
              <ArrowDownCircle className="h-6 w-6 text-red-500" />
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  // disabled={isLoading}
                  className="h-8 w-8 p-0"
                >
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => editingTrans(transaction)}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-muted-foreground">
          <div className="flex items-center justify-between">
            category
            <span className="font-medium text-muted-foreground">
              <Badge variant={"secondary"}>{transaction.category}</Badge>
            </span>
          </div>
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground " />
              <span>
                {transaction.date
                  ? new Date(transaction.date).toLocaleDateString("en-Us", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "no date"}
              </span>
            </div>
            <Badge variant={isIncome ? "default" : "destructive"}>
              {transaction.type}
            </Badge>
          </div>
          <div className="text-right text-xs italic ">
            {new Date(transaction.createdAt).toLocaleDateString("en-Us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </CardContent>
      </Card>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure to delete?</AlertDialogTitle>
            <AlertDialogDescription>
               This action cannot be undone.this will delete the transaction
               {transaction.title}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={()=>setShowDeleteDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
            >delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TransactionBox;
