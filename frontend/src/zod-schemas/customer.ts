import { createInsertSchema } from 'drizzle-zod'
import { customer } from '../db/schema'

export const insertCustomerSchema = createInsertSchema(customer, {
  firstName: (field) => field.firstName.min(1, 'First name is required!'),
  lastName: (field) => field.lastName.min(1, 'Last name is required!'),
  address: (field) => field.address.min(1, 'Address is required!'),
  city: (field) => field.city.min(1, 'city is required!'),
  state: (field) => field.state.length(2, 'state must be exactly 2 charecters!'),
  email: (field) => field.email.email('valid email is required!'),
  zip: (field) => field.zip.regex(/^\d{5}(-\d{4})?$/,'invalid zip code use 5 digits or 5 digits followed by a hyphen and 4 digits!'),
  phone: (field) => field.phone.regex(/^\d{3}-\d{3}-\d{4}$/,'invalid phone number format use XXX-XXX-XXXX!'),
})
