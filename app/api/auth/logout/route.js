import { getCurrentUser } from "@/actions/backend/auth/getUser";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        cookies().delete('token')

        const hasToken = cookiesList.has('token')

        if(hasToken){
            return NextResponse.json('error while logging out',{status:400})
        }

        return NextResponse.json('logged out successfully',{status:200})
        
    } catch (error) {
        return NextResponse.json({message:error.message},{status:400})
        
    }
}