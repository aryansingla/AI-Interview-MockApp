"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModel';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const [jobPosition, setJobPosition] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [jobExperience, setJobExperience] = useState("");

    const [jsonResponse, setJsonResponse] = useState([]);
    const { user } = useUser();

    const onSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        console.log(jobPosition, jobDescription, jobExperience);

        const inputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDescription}, Job Experience: ${jobExperience} , based on given information above give ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions of advanced techincal level and  give both question and their answers in JSON format, Give us question and answer field on JSON`;

        const result = await chatSession.sendMessage(inputPrompt);
        const responseText = await result.response.text();
        let MockJsonResponse = responseText.replace(/```json/g, '')
            .replace(/```/g, '')
            .replace(/[\n\r\t]/g, '');

        const parsedResponse = JSON.parse(MockJsonResponse);
        setJsonResponse(MockJsonResponse);

        if (MockJsonResponse) {
            const resp = await db.insert(MockInterview).values({
                mockId: uuidv4(),
                jsonMockResponse: MockJsonResponse,
                jobPosition: jobPosition,
                jobDescription: jobDescription,
                jobExperience: jobExperience,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY')
            }).returning({ mockId: MockInterview.mockId });

            console.log('Inserted Id', resp);
            if(resp){
                setOpenDialog(false);
            }
        } else {
            console.error('Error');
        }

        setLoading(false);
    }

    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={() => setOpenDialog(true)}>
                <h2 className='font-bold text-lg text-center' >+ Add New</h2>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>

                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle classNametext-2xl>Tell us more about your Job Interview</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Add details of Job Position, Job Description and Years of Experience</h2>
                                </div>
                                <div className='mt-7 my-3'>
                                    <label className='font-semibold'>Job Role/Job Position</label>
                                    <Input placeholder="Ex: Full Stack Developer" required onChange={(event) => setJobPosition(event.target.value)} />
                                </div>
                                <div className='my-3'>
                                    <label className='font-semibold'>Job Description/Tech Stack</label>
                                    <Textarea placeholder="Ex: React,Node.js" required onChange={(event) => setJobDescription(event.target.value)} />
                                </div>
                                <div className='my-3'>
                                    <label className='font-semibold'>Years of Experience</label>
                                    <Input placeholder="Ex:5" type="number" max="50" required onChange={(event) => setJobExperience(event.target.value)} />
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>{loading ? 'Loading from AI...' : 'Start Interview'}</Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview