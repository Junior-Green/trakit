import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/src/database/mongoose-connect";
import UserData from "@/src/database/schemas/user-schema";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const body = await req.json()
    console.log(body)
    
    if (!session) {
        return new NextResponse(null, {
            status: 403,
            statusText: 'No user session detected',
        })
    }

    await dbConnect()

    const user = await UserData.findOne({ userId: new ObjectId(session.user.id) }).exec()
    
    if (!user) {
        return new NextResponse(null, {
            status: 404,
            statusText: 'User not found',
        })
    }

    try {
    } catch (error) {
        console.log(error)
        return new NextResponse(null, {
            status: 400,
            statusText: 'Invalid request body'
        })
    }
}