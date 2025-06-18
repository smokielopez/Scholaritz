import { Button } from '@/components/ui/button'
import axios from 'axios'
import { RefreshCcw } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'sonner';

function MaterialCardItem({item,studyTypeContent,course,refreshData}) {

  const [loading,setLoading ]=useState(false);

  const  GenerateContent=async(e)=>{
    e.preventDefault(); // Prevent link navigation
    toast('Generating your content...')
    setLoading(true)
    try {
      // Debug log for course data
      console.log('Course data:', {
        courseId: course?.courseId,
        hasChapters: !!course?.courseLayout?.chapters,
        chaptersLength: course?.courseLayout?.chapters?.length
      });

      let chapters='';
      if (course?.courseLayout?.chapters) {
        chapters = course.courseLayout.chapters
          .map(chapter => chapter.chapter_title || chapter.chapterTitle)
          .filter(Boolean)
          .join(',');
      }
      
      if (!chapters) {
        toast.error('No chapters found in the course layout');
        return;
      }

      // Debug log for request data
      console.log('Generating content with:', {
        courseId: course?.courseId,
        type: item.type,
        chapters: chapters
      });

      const result = await axios.post('/api/study-type-content',{
        courseId: course?.courseId,
        type: item.type,
        chapters: chapters
      });

      console.log('Generation result:', result);

      if (result.data?.id) {
        refreshData(true);
        toast('Your content is ready to view');
      } else {
        toast.error('Failed to generate content - no ID returned');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      // More detailed error message
      const errorMessage = error.response?.data?.error 
        ? `Error: ${error.response.data.error}`
        : 'Failed to generate content. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Link href={'/course/'+course?.courseId+item.path} onClick={(e) => {
      // Prevent navigation if content isn't generated yet
      if (!studyTypeContent || !studyTypeContent[item.type] || studyTypeContent[item.type].length === 0) {
        e.preventDefault();
        if (!loading) {
          toast.error('Please generate content first');
        }
      }
    }}>
    <div className={`border shadow-md rounded-lg p-5 flex flex-col items-center
      ${(!studyTypeContent || !studyTypeContent[item.type] || studyTypeContent[item.type].length === 0) ? 'grayscale' : ''}
    `}>
      {(!studyTypeContent || !studyTypeContent[item.type] || studyTypeContent[item.type].length === 0) ?
       <h2 className='p-1 px-2 bg-gray-500 text-white rounded-full text-[10px] mb-2'>Generate </h2>
     : <h2 className='p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2'>Ready </h2>}
       
        <Image src={item.icon} alt={item.name} width={50} height={50} />
        <h2 className='font-medium mt-3'>{item.name}</h2>
        <p className='text-gray-500 text-sm text-center'>{item.desc}</p>
       
        {(!studyTypeContent || !studyTypeContent[item.type] || studyTypeContent[item.type].length === 0) ? 
        <Button className="mt-3 w-full" variant="outline" onClick={GenerateContent}>
          {loading&& <RefreshCcw className='animate-spin'/>} 
          Generate</Button>
        :<Button className="mt-3 w-full" variant="outline" >View</Button>}
    </div>
    </Link>
  )
}

export default MaterialCardItem