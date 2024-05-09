import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/modals/user";
import { Types } from "mongoose";

const ObjectId = require('mongoose').Types.ObjectId

export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching users" + error, { status: 500 });
  }
};
        
export const POST = async (request: Request) =>{
  try{
    const body = await request.json();

    await connect();
    const newUser = new User(body);
    await newUser.save();

    return new NextResponse(
      JSON.stringify({message: "User is created", user: newUser}),
      {status:201}
    );
  }catch (error){
    return new NextResponse(
      JSON.stringify({
        message: "Error in creating user",
        error,
      }),
      {
        status: 500,
      }
    );
  }
};

export const PATCH = async (request: Request) =>{
  try{
    const body = await request.json();
    const { userId, newUserName } = body ;

    await connect();

    if(!userId || !newUserName){
      return new NextResponse (
        JSON.stringify({message: "ID or new username are required"}),
        {
          status:400,
        },
      )
    }

    if(!Types.ObjectId.isValid(userId)){
      return new NextResponse(JSON.stringify({message: "Invalid userId"}),{
        status:400,
      });
    }

    const updateUser = await User.findOneAndUpdate(
      {_id: new ObjectId(userId)},
      {username: newUserName},
      {new: true}
    );
    if(!updateUser){
      return new NextResponse(JSON.stringify({
        message: "User not found or didn't update user successfully",
      }),{
        status: 400,
      }
    );
    }
    return new NextResponse(
      JSON.stringify({
        message: "Username updated successfully",
        user: updateUser,
      }),
      {
        status: 200,
      }
    )
  } catch (error) {}
};
