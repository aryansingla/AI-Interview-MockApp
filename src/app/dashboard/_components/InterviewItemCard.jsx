"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const InterviewItemCard = ({interview}) => {
    const router = useRouter();
    const onStart = () => {
        router.push(`/dashboard/interview/${interview?.mockId}`)
    }
    const onFeedback = () => {
        router.push(`/dashboard/interview/${interview?.mockId}/feedback`)
    }
  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
        <h2 className='text-sm text-gray-500'>Created At: {interview?.createdAt}</h2>
    
    <div className='flex justify-between my-2 mt-2 gap-5'>
      
        <Button size="small" variant="ghost" className="w-full p-2" onClick={onFeedback}>Feedback</Button>
        <Button size="small" className=" w-full p-2" onClick={onStart}>Start</Button>
    </div>
    </div>
  )
}

export default InterviewItemCard