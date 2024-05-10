import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Note from "@/lib/modals/notes";
import { Types } from "mongoose";
import User from "@/lib/modals/user";

export const GET = async (request: Request) =>{
    try{
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId")

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(
                JSON.stringify({ message: "Invalid or missing userId"}),
                {
                    status: 400
                },
            )
        }
        
        await connect();
        
        const user = await User.findById(userId);
        if(!user){
            return new NextResponse(JSON.stringify({ message: "User not found"}),{
                status:404,
            });
        }
        const notes = await Note.find({user: new Types.ObjectId(userId)});
        return new NextResponse(JSON.stringify(notes),{
            status:200
        });
    } catch (error){
        return new NextResponse("Eroor in fetching notes" + error, { status: 500});
    }
};