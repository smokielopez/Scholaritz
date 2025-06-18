import { courseOutlineAIModel } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {

    const {courseId,topic,courseType,difficultyLevel,createdBy}=await req.json();

    const PROMPT='Generate a study material for '+topic+' for '+courseType+' and level of difficulty  will be '+difficultyLevel+' with summary of course, List of chapters along with summary and emoji icon for each chapter, Topic list in each chapter in JSON Format ';
    //Generate Course Layout using AI

const aiResp=await courseOutlineAIModel.sendMessage(PROMPT);
const aiResult= JSON.parse(aiResp.response.text());

//Save the Result along user input

const dbResult=await db.insert(STUDY_MATERIAL_TABLE).values({
    courseId:courseId,
    courseType:courseType,
    createdBy:createdBy,
    topic:topic,
    courseLayout:aiResult
}).returning({resp:STUDY_MATERIAL_TABLE})

//Trigger the inngest function to generate the chapter notes
const result=await inngest.send({
    name:'notes.generate',
    data:{
        course:dbResult[0].resp
    }
});

console.log(result);

    return NextResponse.json({result:dbResult[0]})
}