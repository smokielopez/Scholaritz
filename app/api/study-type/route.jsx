import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST (req){
    const {courseId,studyType}=await req.json();

    if(studyType=='ALL')
    {
        const notes=await db.select().from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE?.courseId,courseId));
        

     // Get all other study type Records

         const contentList=await db.select().from (STUDY_TYPE_CONTENT_TABLE)
         .where(eq(STUDY_TYPE_CONTENT_TABLE?.courseId,courseId))

            const result={
            notes:notes,
            flashcard:contentList?.filter(item=>item.type.toLowerCase()=='flashcard'),
            quiz:contentList?.filter(item=>item.type.toLowerCase()=='quiz'),
            qa:contentList?.filter(item=>item.type.toLowerCase()=='qa')
        }
    
    return NextResponse.json(result);
    }
    else if(studyType.toLowerCase()=='notes')
    {
        const notes=await db.select().from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE?.courseId,courseId));
        
        return NextResponse.json(notes);
    }

    else{
        const result=await db.select().from(STUDY_TYPE_CONTENT_TABLE)
        .where(and(eq(STUDY_TYPE_CONTENT_TABLE?.courseId,courseId),
        eq(STUDY_TYPE_CONTENT_TABLE.type,studyType.toLowerCase())));
        
        // Return empty array if no records found
        if (!result || result.length === 0) {
            return NextResponse.json({ content: [] });
        }
        
        // Return the first record's content if it exists
        return NextResponse.json({ content: result[0].content || [] });
    }

}