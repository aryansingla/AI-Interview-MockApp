"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


const Feedback = ({ params }) => {

    const router = useRouter();

    const [feedBackList, setFeedBackList] = useState([]);

    useEffect(() => {
        GetFeedBack();
    }, [])

    const GetFeedBack = async () => {
        const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, params.interviewId)).orderBy(UserAnswer.id);
        setFeedBackList(result);
        console.log('resultt', result);
    }
    return (
        <div className='p-10'>
           
            {/* <h2 className='text-primary text-lg my-3'>You Overall Rating: <strong>7/10</strong></h2> */}
            {
                feedBackList?.length == 0 ?
                    <h2 className='font-bold text-xl text-gray-500'>No Interview Performed.</h2>
                    :
                    <>
                     <h2 className='font-bold text-3xl text-green-500'>Congratulations</h2>
            <h2 className='font-bold text-2xl'>Here is your Interview Feedback</h2>

                        <h2 className='text-md text-gray-500'>Find below Interview Question with correct answer, your answer and feedback for improvment.</h2>

                        {
                            feedBackList && feedBackList.map((item, index) => (
                                <Collapsible key={index} className='mt-7'>
                                    <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full'>{item?.question}<ChevronsUpDown className='h-5 w-5' /></CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div className='flex flex-col gap-2'>
                                            <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating: </strong>{item?.rating}</h2>
                                            <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your answer: </strong>{item?.userAns}</h2>
                                            <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct answer: </strong>{item?.correctAns}</h2>
                                            <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-900'><strong>Feedback: </strong>{item?.feedback}</h2>

                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            ))
                        }
                    </>
            }



            <Button onClick={() => router.replace('/dashboard')}>Go Back to Dashboard</Button>

        </div>
    )
}

export default Feedback