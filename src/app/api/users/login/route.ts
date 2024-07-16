import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request : NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody)
        const user = await User.findOne({email})
        console.log(user);
        if(!user){
            return NextResponse.json({error: "User Does not exist"}, {status: 400})
        }
        const validPassword = await bcryptjs.compare(password, user.password)
        console.log(validPassword);
        if(!validPassword){
            return NextResponse.json({error: "Invalid Password"}, {status: 300})
        }
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        console.log(tokenData,Object.keys(jwt),process.env.TOKEN_SECRET)
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})
        console.log(token)
        const response = NextResponse.json({
            message: "Login Successful",
            success: true,
        })
        response.cookies.set("token", token , {httpOnly: true,})
        return response;



    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
        
    }
}