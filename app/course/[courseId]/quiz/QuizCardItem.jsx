import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

function QuizCardItem({ quiz,userSelectedOption}) {

   const [selectedOption,setSelecetedOption]=useState();

  // ✅ Ensure quiz and quiz.options exist before rendering
  if (!quiz || !quiz.options) {
    return <p className="text-gray-500 text-center mt-5">No options available</p>;
  }

  return (
    <div className='mt-10 p-5'>
      <h2 className='font-medium text-3xl text-center'>{quiz.question}</h2>

      <div className='grid grid-cols-2 gap-5 mt-6'>
        {quiz.options.map((option, index) => (
          <h2
          onClick={()=>{setSelecetedOption(option);
            userSelectedOption(option)
          }}
          
          key={index} variant="outline" 
          className={`w-full border rounded-full p-3 px-4 text-center text-lg hover:bg-gray-200  cursor-pointer
            ${selectedOption==option&&'bg-primary text-white hover:bg-primary'}`}
            >{option}
            </h2>
        ))}
      </div>
    </div>
  );
}

export default QuizCardItem;
