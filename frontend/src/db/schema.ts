import { relations } from 'drizzle-orm'
import {boolean, date, integer, pgTable, serial, text, timestamp, varchar} from 'drizzle-orm/pg-core'


export const customers=pgTable('customers',{
    id:serial('id').primaryKey(),
    firstname:varchar('firstname').notNull(),
    lastname:varchar('lastname').notNull(),
    email:varchar('email').notNull(),
    phone:integer('phone').notNull(),
    address1:varchar('address1').notNull(),
    address2:varchar('address2'),
    city:varchar('city').notNull(),
    state:varchar('state').notNull(),
    zip:varchar('postal',{length:10}),
    notes:text('notes'),
    active:boolean('active').notNull().default(true),
    createdOn:timestamp('createdOn').defaultNow(),
    updatedOn:timestamp('updatedOn').defaultNow().$onUpdate(()=>new Date()),
    

})
export const tickets=pgTable('tickets',{
    id:serial('id').primaryKey(),
    customerId:integer('customerId').notNull().references(()=>customers.id),
    title:varchar('title').notNull(),
    description:text('description'),
    completed:boolean('completed').notNull().default(false),
    tech:varchar('tech').notNull().default('unassigned'),
    createdOn:timestamp('createdOn').defaultNow(),
    updatedOn:timestamp('updatedOn').defaultNow().$onUpdate(()=>new Date()),
    

})

export const customersRelation=relations(customers,
    ({many})=>({tickets:many(tickets)})
)

export const ticketsRelation= relations(tickets,
    ({one})=>({customers:one(customers,{
        fields:[tickets.customerId],
        references:[customers.id]
    })})
)