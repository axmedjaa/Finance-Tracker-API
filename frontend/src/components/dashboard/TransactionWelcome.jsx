import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

const TransactionWelcome = ({onCreateTrans}) => {
  return (
    <Card className="border-none shadow-md bg-gradient-to-r from-indigo-100 to-indigo-300 
   dark:from-indigo-800 dark:to-indigo-800">
        <CardHeader>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                <div className='space-y-2'>
                    <CardTitle>welcome</CardTitle>
                    <CardDescription>Track your income and expenses easily</CardDescription>
                </div>
                <Button onClick={onCreateTrans}>Add Transaction</Button>
            </div>
        </CardHeader>
    </Card>
  )
}

export default TransactionWelcome