import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex, setActiveQuestionIcdex }) => {

    const textToSpeech = (text) =>{
        if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);

        }
        else {
            alert('Sorry, Your browser does not support text to speech.')
        }
    }

    return mockInterviewQuestion && (
        <div className='p-5 border rounded-lg my-10'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
                        <h2 className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex == index && ' text-white'} `} style={activeQuestionIndex == index ? { backgroundColor: '#4845D2' } : {}} onClick={()=> setActiveQuestionIcdex(index)}>Question #{index + 1}</h2>
                    ))
                }
            </div>
            <h2 className='my-5 text-md md:text-lg '>
                    {mockInterviewQuestion[activeQuestionIndex]?.question}
                </h2>
                <Volume2 onClick={()=> textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)} className='cursor-pointer'/>
                <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
                    <h2 className='flex gap-2 items-center text-primary'>
                        <Lightbulb/>
                        <strong>Note:</strong>
                    </h2>
                    <h2 className='text-sm text-primary my-2'>
                        Click on Record Answer when you want to answer the question. At the end of interview we will give you the feedback along with correct answer for each of question and your answer to compare with it.
                    </h2>
                </div>
        </div>
    )
}

export default QuestionSection