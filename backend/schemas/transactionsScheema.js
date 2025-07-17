import {z} from 'zod'
export const createTransactionsSchema=z.object({
    title:z.string().min(1,'Title must be at least 1 character'),
    amount:z.number(),
    type:z.enum(['income','expense']).optional(),
    category:z.string().min(1,'Category must be at least 1 character'),
    date:z.string().optional()
})