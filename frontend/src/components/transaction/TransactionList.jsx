import {
  ArrowDownCircle,
  ArrowUpCircle,
  ClipboardCheck,
  ListOrdered,
  Search,
} from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import TransactionBox from "./TransactionBox";

const TransactionList = ({ transactions, isLoading, editingTrans }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filterSearch = transactions.filter((trans) => {
    const matchedSearch = trans.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchedSearch;
  });
  const TransGrid=({transactions,emptyMessage})=>{
    if(transactions.length===0){
        return(
            <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                <ClipboardCheck className="mx-auto h-8 w-8 to-muted-foreground"/>
                <h3 className="text-lg font-semibold text-muted">no task found</h3>
                <p className="mt-2 text-sm text-muted-foreground">{emptyMessage}</p>
            </div>
            </div>
        )
    }
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {
                transactions.map(trans=>(
                    <TransactionBox
                     key={trans._id}
                     transaction={trans}
                     editingTrans={editingTrans}
                    />
                ))
            }
        </div>
    )
  }
  const getTransaction = () => {
    const trasStatus = {
      total: transactions.length,
      income: transactions.filter((trans) => trans.type === "income").length,
      expense: transactions.filter((trans) => trans.type === "expense").length,
    };
    const transCatigory = {
      total: filterSearch,
      income: filterSearch.filter((trans) => trans.type === "income"),
      expense: filterSearch.filter((trans) => trans.type === "expense"),
    };
    const stats = {
      total: trasStatus.total,
      income: trasStatus.income,
      expense: trasStatus.expense,
    };
    return { stats, transCatigory };
  };
  const { stats, transCatigory } = getTransaction();
  return (
    <div className="space-y-6">
      {/* showing income expense and total transaction */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-lg shadow-md border">
          <div className="flex items-center justify-between gap-2">
            <p className="text-lg font-bold">total</p>
            <ListOrdered />
          </div>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-md border">
          <div className="flex items-center justify-between gap-2">
            <p className="text-lg font-bold">income</p>
            <ArrowDownCircle />
          </div>
          <p className="text-2xl font-bold">{stats.income}</p>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-md border">
          <div className="flex items-center justify-between gap-2">
            <p className="text-lg font-bold">income</p>
            <ArrowUpCircle />
          </div>
          <p className="text-2xl font-bold">{stats.expense}</p>
        </div>
      </div>
      {/* searchinput */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2  h-4 w-4 text-muted-foreground transform -translate-y-1/2" />
        <Input
          type="text"
          placeholder="search transaction"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      {/* transaction list */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 gap-4 w-full">
          <TabsTrigger className="flex items-center gap-2" value="all">
            all
            <Badge variant={'secondary'}>{stats.total}</Badge>
          </TabsTrigger>
          <TabsTrigger className="flex items-center gap-2" value="income">
            income
            <Badge variant={'secondary'}>{stats.income}</Badge>
          </TabsTrigger>
          <TabsTrigger className="flex items-center gap-2" value="expense">
            expense
            <Badge variant={'secondary'}>{stats.expense}</Badge>
            </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <TransGrid
          transactions={transCatigory.total}
          emptyMessage={'no transaction found'}
          />
        </TabsContent>
        <TabsContent value="income">
           <TransGrid
          transactions={transCatigory.income}
          emptyMessage={'no transaction found'}
          />
        </TabsContent>
        <TabsContent value="expense">
           <TransGrid
          transactions={transCatigory.expense}
          emptyMessage={'no transaction found'}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransactionList;
