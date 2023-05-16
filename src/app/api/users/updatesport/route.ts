import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/src/database/mongoose-connect";
import UserData from "@/src/database/schemas/user-schema";
import { ObjectId } from "mongodb";

export async function PUT(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    console.log(searchParams.toString());
    if (!session) {
        return new NextResponse(null, {
            status: 403,
            statusText: 'No user session detected',
        })
    }

    if (!searchParams.has('sport')) {
        return new NextResponse(null, {
            status: 400,
            statusText: 'invalid request',
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

    const selectedSport = searchParams.get('sport');
    const sportSelections = ['basketball', 'soccer', 'hockey', 'football']

    if (selectedSport && sportSelections.includes(selectedSport)) {
        user.selectedSport = <"basketball" | "football" | "soccer" | "hockey">selectedSport
        const res = await user.save().catch(err => {
            console.log(err);
            return null;
        })
        if (res) {
            return new NextResponse(null, {
                status: 200,
            })
        }
        else {
            return new NextResponse(null, {
                status: 400,
                statusText: 'invalid paramater for "selectedSport"',
            })
        }
    }
    else {
        return new NextResponse(null, {
            status: 404,
            statusText: 'User not found',
        })
    }
}