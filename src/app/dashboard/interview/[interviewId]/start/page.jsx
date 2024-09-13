"use client"
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection'
import RecordAnswerSection from './_components/RecordAnswerSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const StartInterview = ({ params }) => {

    const[interviewData,setInterviewData] = useState();
    const[mockInterviewQuestion,setMockInterviewQuestion] = useState([]);
    const[activeQuestionIndex,setActiveQuestionIcdex] = useState(0);

    useEffect(() => {
        console.log(params)
        GetInterviewDetails();
    }, [])


    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
        setInterviewData(result[0]);

        
        const jsonMockResp = JSON.parse(result[0].jsonMockResponse);
        console.log('jsonMockResp',jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
    }
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <QuestionSection 
                mockInterviewQuestion={mockInterviewQuestion}
                activeQuestionIndex={activeQuestionIndex}
                setActiveQuestionIcdex={setActiveQuestionIcdex}
                />
                <RecordAnswerSection
                mockInterviewQuestion={mockInterviewQuestion}
                activeQuestionIndex={activeQuestionIndex}
                interviewData={interviewData}/>
            </div>
            <div className='flex justify-end gap-6'>
                {activeQuestionIndex > 0 && <Button onClick={()=> setActiveQuestionIcdex(activeQuestionIndex-1)}>Previous Question</Button>}
                {activeQuestionIndex != mockInterviewQuestion?.length - 1 && <Button onClick={()=> setActiveQuestionIcdex(activeQuestionIndex+  1)}>Next Question</Button>}
                {activeQuestionIndex == mockInterviewQuestion?.length - 1 && 
                <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                <Button>End Interview</Button>
                </Link>
                }
            </div>
        </div>
    )
}

export default StartInterview