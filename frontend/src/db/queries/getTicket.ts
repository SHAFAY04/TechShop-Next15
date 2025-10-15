import {db} from '@/db/index'
import { tickets } from '../schema'
import { eq } from 'drizzle-orm'

export async function getTickets(id:number){

    const ticket= await db.select()
    .from(tickets)
    .where(eq(tickets.id,id))

    return ticket[0]
}