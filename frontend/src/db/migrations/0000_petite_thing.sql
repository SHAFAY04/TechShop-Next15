CREATE TABLE "customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstname" varchar NOT NULL,
	"lastname" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone" integer NOT NULL,
	"address1" varchar NOT NULL,
	"address2" varchar,
	"city" varchar NOT NULL,
	"state" varchar NOT NULL,
	"postal" varchar(10),
	"notes" text,
	"active" boolean DEFAULT true NOT NULL,
	"createdOn" timestamp DEFAULT now(),
	"updatedOn" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tickets" (
	"id" serial PRIMARY KEY NOT NULL,
	"customerId" integer NOT NULL,
	"title" varchar NOT NULL,
	"description" text,
	"completed" boolean DEFAULT false NOT NULL,
	"tech" varchar DEFAULT 'unassigned' NOT NULL,
	"createdOn" timestamp DEFAULT now(),
	"updatedOn" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_customerId_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;