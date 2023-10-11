 

import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


export async function middleware(request) {
  const cookies = request.cookies
  const token = Object.fromEntries(cookies)?.token?.value
  
  if(!token && request.url.includes('/')){
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  
  console.log(token)
}
 
export const config = {
  matcher:[ '/','/people'],
}