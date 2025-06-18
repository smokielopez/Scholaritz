"use client"
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FlashcardItem from './_components/flashcardItem';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Button } from '@/components/ui/button';

function Flashcards() {
    const router = useRouter();
    const {courseId}=useParams();
    const[flashCards,setFlashCards]=useState([]);
    const [isFlipped,setIsFlipped]=useState();
    const [api,setApi]=useState();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        GetFlashCards();
    },[])

    useEffect(()=>{
        if(!api)
        {
            return ;
        }
        api.on('select',()=>{
            setIsFlipped(false);
        })
    },[api])

    const GetFlashCards=async()=>{
        try {
            setLoading(true);
            const result=await axios.post('/api/study-type',{
                courseId:courseId,
                studyType:'flashcard'
            });

            console.log('Flashcard data:', result.data);
            
            // Check if content exists and is not empty
            if (!result.data?.content || result.data.content.length === 0) {
                router.push(`/course/${courseId}`);
                return;
            }

            setFlashCards(result.data);
        } catch (error) {
            console.error('Error fetching flashcards:', error);
            router.push(`/course/${courseId}`);
        } finally {
            setLoading(false);
        }
    }

    const handleClick=()=>{
        setIsFlipped(!isFlipped)
    }
  
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
    <div>
        <h2 className='font-bold text-2xl'>Flashcards</h2>
        <p>Flashcards : The Ultimate Tool to Lock in Concepts!</p>
        
        
      <div className='relative w-full px-16 mt-10'>  
        <Carousel 
          setApi={setApi}
          className="w-full max-w-4xl mx-auto"
          opts={{
            align: "center",
          }}
        >
          <CarouselContent>
            {flashCards?.content && flashCards.content.length > 0 ? (
              flashCards.content.map((flashcard,index)=>(
                <CarouselItem key={index} className='flex items-center justify-center'>       
                  <FlashcardItem 
                    handleClick={handleClick}
                    isFlipped={isFlipped}
                    flashcard={flashcard}
                  />
                </CarouselItem>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-10">
                <p>No flashcards available. Please generate content first.</p>
                <Button onClick={() => router.push(`/course/${courseId}`)}>
                  Go Back
                </Button>
              </div>
            )}
          </CarouselContent>

          {flashCards?.content && flashCards.content.length > 0 && (
            <>
              <div className="absolute -left-4 top-1/2 -translate-y-1/2">
                <CarouselPrevious className="h-12 w-12 rounded-full" />
              </div>
              <div className="absolute -right-4 top-1/2 -translate-y-1/2">
                <CarouselNext className="h-12 w-12 rounded-full" />
              </div>
            </>
          )}
        </Carousel>
      </div>
    </div>
  )
}

export default Flashcards

// changes in arrow -  border-2 border-black