import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

export async function POST(req) {
    try {
        const {chapters, courseId, type} = await req.json();
        
        // Debug log
        console.log('Received request:', { chapters, courseId, type });

        // Validate required fields with specific messages
        if (!courseId) {
            return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
        }
        if (!type) {
            return NextResponse.json({ error: "Missing type" }, { status: 400 });
        }
        if (!chapters) {
            return NextResponse.json({ error: "Missing chapters" }, { status: 400 });
        }

        // Clean up chapters string - remove emojis and special characters
        const cleanChapters = chapters.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]/gu, '')
            .split(',')
            .map(chapter => chapter.trim())
            .filter(Boolean)
            .join(', ');

        // Check if content already exists
        const existingContent = await db.select()
            .from(STUDY_TYPE_CONTENT_TABLE)
            .where(and(
                eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
                eq(STUDY_TYPE_CONTENT_TABLE.type, type.toLowerCase())
            ));

        console.log('Existing content check:', existingContent);

        if (existingContent && existingContent.length > 0) {
            return NextResponse.json(
                { error: "Content already exists for this type" },
                { status: 400 }
            );
        }

        // Insert Record to DB with initial empty content
        const result = await db.insert(STUDY_TYPE_CONTENT_TABLE)
            .values({
                courseId: courseId,
                type: type.toLowerCase(),
                content: [],
                status: 'Generating'
            })
            .returning({ 
                id: STUDY_TYPE_CONTENT_TABLE.id,
                type: STUDY_TYPE_CONTENT_TABLE.type,
                status: STUDY_TYPE_CONTENT_TABLE.status 
            });

        console.log('DB insert result:', result);

        if (!result || result.length === 0) {
            throw new Error("Failed to create database record");
        }

        // Trigger inngest function
        const inngestResult = await inngest.send({
            name: 'studyType.content',
            data: {
                studyType: type.toLowerCase(),
                prompt: `Generate ${type} content for the following chapters: ${cleanChapters}. Format the response as a JSON array with front and back content, maximum 15 items'.
                :generate quiz on topic: ${cleanChapters}. with Question and options along with correct Answers in JSON format,(Max 10)`,
                courseId: courseId,
                recordId: result[0].id
            }
        });

        // const PROMPT=type='Flashcard'?
        // 'Generate the flashcardon topic:'+chapters+' in JSON format with front and back content, maximum 15 items.'
        // 

        console.log('Inngest trigger result:', inngestResult);

        return NextResponse.json({ 
            id: result[0].id,
            type: result[0].type,
            status: result[0].status,
            message: "Content generation started"
        });
    } catch (error) {
        console.error('Error in study-type-content:', error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}