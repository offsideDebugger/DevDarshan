

import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { prisma } from "@/db/db";
import { UserScehma } from "@/zodValidations/userSchema";
import bcrypt from "bcrypt"
import { request } from "http";


export async function POST(request:NextRequest){
    try{
        const data=await request.json();
        const parsedData=UserScehma.safeParse(data);
        if(!parsedData.success){
            return NextResponse.json({error:parsedData.error.message},{status:400})
        }
        const hashedPassword=await bcrypt.hash(parsedData.data.password,10)
        const user=await prisma.user.create({
            data:{
            username:parsedData.data.username,
            email:parsedData.data.email,
            password:hashedPassword
        }})
        console.log("done")
        return NextResponse.json({redirect:"/login"})
        return NextResponse.json(user)
    }catch(e:any){
        return NextResponse.json({error:e.message},{status:400})
    }
}