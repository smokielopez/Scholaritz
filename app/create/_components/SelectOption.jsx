import Image from 'next/image'
import React, { useState } from 'react'

function SelectOption({selectedStudyType}) {
    const Options = [
        {
             name:'Exam',
             icon:'/exam_1.png'
        },
        {
            name:'Job Interview',
            icon:'/job.png'
       },
       {
        name:'Practice',
        icon:'/practice.png'
       },
    {
     name:'Coding Prep',
     icon:'/code.png'
    },
    {
        name:'Other',
        icon:'/knowledge.png'
   },
    ]
    const [selectedOption,setSelectedOption]=useState();

  return (
        <div>
            <h2 className='text-center mb-2 text-lg'>
                For Which you want to create your study material ?
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5'>
                    {Options.map((option, index) => (
                        <div key={index} className={`p-4 flex flex-col items-center justify-center border rounded-xl hover:border-primary cursor-pointer 
                            ${option?.name==selectedOption&&'border-primary'}`} 
                            onClick={()=>{setSelectedOption(option.name);selectedStudyType(option.name)}}> 
                            <Image src={option.icon} alt={option.name} width={50} height={50} />
                            <h2 className='text-sm'>{option.name} </h2>
                        </div>
                    ))}
                </div>
            </h2>
        </div>
    )
}

export default SelectOption