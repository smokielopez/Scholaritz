"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import StepProgress from "../_components/StepProgress";
import QuizCardItem from "./QuizCardItem";

function Quiz() {
    const { courseId } = useParams();
    const [quiz, setQuiz] = useState([]);
    const[quizData,setQuizData]=useState();
    const [stepCount, setStepCount] = useState(0);
    const[IsCorrectAns,setIsCorrectAnswer]=useState(null);
    const[correctAns,setCorrectAns]=useState();

    useEffect(() => {
        if (courseId) {
            GetQuiz();
        }
    }, [courseId]);

    const GetQuiz = async () => {
        const result = await axios.post("/api/study-type", {
            courseId,
            studyType: "quiz",
        });
        if (result.data?.content) {
            setQuiz(result.data?.content);
        }
    };

     const checkAnswer=(userAnswer,currentQuestion)=>{

        console.log(currentQuestion?.answer,userAnswer);
        if(userAnswer==currentQuestion?.answer)
         {
            setIsCorrectAnswer(true);
            setCorrectAns(currentQuestion?.answer)
            return ;

        }
        setIsCorrectAnswer(false);
     }
     useEffect(()=>{
        setCorrectAns(null);
        setIsCorrectAnswer(null);
     },[stepCount])
     
    return (
        <div>
            <h2 className="font-bold text-2xl text-center mb-4">Quiz</h2>
            {quiz.length > 0 ? (
                <StepProgress data={quiz} stepCount={stepCount} setStepCount={setStepCount} />
            ) : (
                <p>No quiz available.</p>
            )}
            <div>
                {/* {quiz&&quiz.map((item,index)=>( */}
                    <QuizCardItem quiz={quiz[stepCount]} 
                    userSelectedOption={(v)=>checkAnswer(v,quiz[stepCount])}
                    />
                {/* ))} */}
                </div>

                {IsCorrectAns==false&&<div>
                    <div className="border p-3 border-red-700 bg-red-200 rounded-lg">
                    <h2 className="font-bold text-lg text-red-600"> Incorrect </h2>
                    <p className="text-red-600">Correct Answer is :{correctAns}</p> 
                </div>
            </div>}
            {IsCorrectAns==true&&<div>
                <div className="border p-3 border-green-700 bg-green-200 rounded-lg">
                    <h2 className="font-bold text-lg text-green-600"> Correct </h2>
                    <p className="text-green-600">Your Answer is Right</p> 
                </div>

            </div>}
            

        </div>
    )
}

export default Quiz;
