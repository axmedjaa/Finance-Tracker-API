import {z} from 'zod'
export const createAuthScheema=z.object({
    name:z.string().min(1,'atleast one character'),
    email:z.string().email('email must be valid'),
    password:z.string().min(6,'password must be atleast 6 latter').max(100,'only 100 or smaller'),
    role:z.enum(['user','admin']).optional(),
    Profile:z.string().optional()
})