"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

const page = ({ params }) => {

    const [interviewData, setInterviewData] = useState({});
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    ;
    useEffect(() => {
        console.log(params)
        GetInterviewDetails();
    }, [])


    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
        setInterviewData(result[0]);
    }

    return (
        <div className='my-10 flex justify-center flex-col items-center'>
            <h2 className='font-bold text-2xl'>Let's Get Started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 p-5'>
                <div className='flex flex-col my-5 gap-5'>
                    <div className='flex flex-col p-5 rounded-lg border gap-5'>
                        <h2 className='text-xl'><strong>Job Role/Job Position: </strong>{interviewData.jobPosition}</h2>
                        <h2 className='text-xl'><strong>Job Description/Tech Stack: </strong>{interviewData.jobDescription}</h2>
                        <h2 className='text-xl'><strong>Years of Experience: </strong>{interviewData.jobExperience} years</h2>
                    </div>
                    <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
                        <h2 className='flex gap-2 items-center text-yellow-600'><Lightbulb /><strong>Information</strong></h2>
                        <h2 className='mt-3 text-yellow-800'>Enable VideoCam and Microphone to start your AI Generated Mock Interview, It has 5 question which you can answer and at last you will get the report on the basis of your answer. NOTE we never record your video, you can disable it anytime you want.</h2>
                    </div>
                </div>
                <div>
                    {webCamEnabled ?
                        <Webcam onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            style={{
                                height: 300,
                                width: 300
                            }} />
                        :
                        <>
                            <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
                            <Button onClick={() => setWebCamEnabled(true)} className="w-full">Enable Web Cam and Microphone</Button>
                        </>
                    }
                    <div className='flex justify-end items-end mt-6'>
                        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                        <Button className="">Start Interview</Button>
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default page