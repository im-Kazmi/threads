import { getCurrentUser } from "@/actions/backend/auth/getUser";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        const user = await getCurrentUser()
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(error.message)
        
    }
}