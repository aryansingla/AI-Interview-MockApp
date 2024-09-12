import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview  = pgTable('MockInterview',{
    id: serial('id').primaryKey(),  // Added primary key
    jsonMockResponse: text('jsonMockResponse').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDescription: varchar('jobDescription').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull(),

});

export const UserAnswer  = pgTable('userAnswer',{
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mockId').notNull(),
    question: varchar('question').notNull(),
    correctAns: text('correctAns'),
    userAns: text('userAns'),
    feedback: text('feedback'),
    rating: varchar('rating'),
    userEmail: varchar('userEmail'),
    createdAt: varchar('createdAt'),
})