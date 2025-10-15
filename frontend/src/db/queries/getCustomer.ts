import {db} from '@/db/index'
import { customers } from '../schema'
import { eq } from 'drizzle-orm'


async function getCustomer(id:number) {
    
    const customer=await db.select()
    .from(customers)
    .where(eq(customers.id,id))

    return customer[0]
} 