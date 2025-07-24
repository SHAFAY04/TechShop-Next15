import { varchar,boolean,text,integer,timestamp, pgTableCreator, pgTable } from "drizzle-orm/pg-core";
import { Many, relations, Relations } from "drizzle-orm";
import { serial } from "drizzle-orm/pg-core"

export const customer = pgTable("customers",{
    id:serial("id").primaryKey(),
    firstName:varchar("firstName").notNull(),
    lastName:varchar("lastName").notNull(),
    email:varchar("email").notNull().unique(),
    phone:varchar("phone").notNull().unique(),
    address:varchar("address").notNull(),
    city:varchar("city").notNull(),
    state:varchar("state",{length:2}).notNull(),
    zip:varchar("zip",{length:10}),
    notes:text(),
    active:boolean("active").notNull().default(true),
    createdAt:timestamp("createdAt").notNull().defaultNow(),
    updatedAt:timestamp("updatedAt").notNull().$onUpdate(()=>new Date())
})


export const ticket = pgTable("tickets",{
    id:serial("id").primaryKey(),
    customerId:integer("customerId").notNull().references(()=>customer.id),
    title:varchar("title").notNull(),
    description:text("description"),
    completed:boolean("completed").notNull().default(false),
    tech:varchar("tech").notNull().default("unassigned"),
    createdAt:timestamp("createdAt").notNull().defaultNow(),
    updatedAt:timestamp("updatedAt").notNull().$onUpdate(()=>new Date())
})

export const customerRelations=relations(customer,({many})=>({ticket:many(ticket)}))

export const ticketRelations=relations(ticket,({one})=>({customer:one(customer,{
    fields:[ticket.customerId],
    references:[customer.id]
})
}))