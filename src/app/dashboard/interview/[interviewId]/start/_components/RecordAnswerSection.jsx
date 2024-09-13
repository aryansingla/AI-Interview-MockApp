"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModel'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'


const RecordAnswerSection = ({ mockInterviewQuestion, activeQuestionIndex, interviewData }) => {
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });
    const {user} = useUser();
    const [userAnswer, setUserAnswer] = useState('');
    const[loading,setLoading] = useState(false);


    useEffect(() => {
        results.map((result) => {
            setUserAnswer(prevAns => prevAns + result?.transcript)
        })
    }, [results])
      // Check for errors
//   if (error) {
//     console.error("Speech recognition error:", error);
//   }

//   console.log("Results:", results);
//   console.log("Interim result:", interimResult);

    const StartStopRecording = async () => {
        if (isRecording) {
            
            stopSpeechToText();
            // if (userAnswer?.length < 10) {
            //     setLoading(false);
            //     toast('Your answer is very short please speak again.');
            //     return;
            // }

            
        } else {
            startSpeechToText();
        }
    }

    const updateUserAnserInDb = async () => {

        console.log('userAnswer',userAnswer);
        setLoading(true);
        const feedbackPrompt = `Question: ${activeQuestionIndex} ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer} , dpending onquestion and user answer for given interview question please give us rating for answer and feedback as area of improvment, if any. In juts 3-5 lines to improve it in JSON Format and and also give rating field as well as feedback field.`
            
            console.log('feedbackPrompt',feedbackPrompt);

            const result = await chatSession.sendMessage(feedbackPrompt);

            console.log('result',result);


            const mockJsonResp = (result.response.text()).replace(/```json/g, '')
                .replace(/```/g, '')
                .replace(/[\n\r\t]/g, '');

            console.log('feedbackk',mockJsonResp);

            const JSONFeedbackResponse = JSON.parse(mockJsonResp);
            console.log('JSONFeedbackResponse',JSONFeedbackResponse);

            const resp = await db.insert(UserAnswer).values({
                mockIdRef: interviewData?.mockId,
                question: mockInterviewQuestion[activeQuestionIndex]?.question,
                correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                userAns: userAnswer,
                feedback: JSONFeedbackResponse?.feedback,
                rating: JSONFeedbackResponse?.rating,
                userEmail: user?.primaryEmailAddress.emailAddresses,
                createdAt: moment().format('DD-MM-YYYY')
            })

            if(resp){
                toast('User answer recorded succesfully.')
                setUserAnswer('');
                setResults([]);
            }
            setResults([]);
           
            setLoading(false);
    };

    useEffect(()=>{
        if(!isRecording && userAnswer.length > 0){
            updateUserAnserInDb();
        }
    },[userAnswer]);

    return (
        <div className='flex flex-col justify-center'>
            <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
                <Image src={'/mywebcam.png'} width={400} height={400} className='absolute' />
                <Webcam
                    mirrored={true}
                    style={{ height: 500, width: '100%', zIndex: 10 }}
                />
            </div>
            <Button disabled={loading} variant="outline" className="my-10" onClick={StartStopRecording}>
                {
                    isRecording ?
                        <h2 className='text-red-500 flex gap-2'>
                            <Mic /> Stop Recording....
                        </h2> : 'Record Answer'
                }

            </Button>
            {/* <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button> */}

        </div>
    )
}

export default RecordAnswerSection