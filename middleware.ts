import { NextResponse } from "next/server";
import { authMiddleware } from "./middleware/apis/authMiddleware";

export const config = {
  matcher: "/api/:paths*",
};

export default function Middleware(request: Request) {
    const authResult = authMiddleware(request);
        if(!authResult?.isValid) {
            return new NextResponse(JSON.stringify({message:"Unauthorization"}),
        {status: 401});
        }
    return NextResponse.next();
}
