import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterviewTable  = pgTable('MockInterview',{
    id: serial('id'),
    jsonMockResponse: text('jsonMockResponse').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDescription: varchar('jobDescription').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull(),

})