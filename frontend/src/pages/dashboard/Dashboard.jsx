import React, { useState } from 'react'
import { DashboardHeader } from '../../components/dashboard/DashboardHeader'
import TransactionForm from '../../components/transaction/TransactionFrom'
import TransactionWelcome from '../../components/dashboard/TransactionWelcome'
import { useQuery } from '@tanstack/react-query'
import api from '../../lib/api/apiClient'
import TransactionList from '../../components/transaction/TransactionList'

const Dashboard = () => {
  const[showCreateForm,setShowCreateForm]=useState(false)
  const[editingTrans,setEditingTrans]=useState(null)
  const handleClose=()=>{
    setShowCreateForm(false)
    setEditingTrans(null)
  }
  const handleCreateTrans=()=>{
    setShowCreateForm(true)
  }
  const handleEditTrans=(transaction)=>{
    setEditingTrans(transaction)
    setShowCreateForm(true)
  }
  const transQuery=useQuery({
    queryKey:["transaction"],
    queryFn:async()=>{
      const response=await api.get("/transactions")
      return response.data
    },
    retry:1
  })
  return (
    <div className='min-h-screen bg-background'>
      <DashboardHeader/>
      <main className='max-w-full px-4 py-6 space-y-4'>
        <TransactionWelcome
       showCreateForm={showCreateForm}
        onCreateTrans={handleCreateTrans}
      />
      <TransactionList
      transactions={transQuery.data||[]}
      isLoading={transQuery.isLoading}
      editingTrans={handleEditTrans}
      />
      </main>
      <TransactionForm 
      transaction={editingTrans}
      open={showCreateForm||!!editingTrans}
      onOpenChange={handleClose}
      />
      
    </div>
  )
}

export default Dashboard