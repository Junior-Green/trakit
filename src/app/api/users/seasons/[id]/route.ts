import dbConnect from "@/src/database/mongoose-connect";
import UserData from "@/src/database/schemas/user-schema";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function DELETE(_: NextRequest, { params: { id } }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    await dbConnect()

    if (!id) {
        return new NextResponse(null, {
            status: 400,
            statusText: 'Invalid url',
        })
    }

    if (!session) {
        return new NextResponse(null, {
            status: 403,
            statusText: 'No user session detected',
        })
    }

    const user = await UserData.findOne({ userId: new ObjectId(session.user.id) }).exec()

    if (!user) {
        return new NextResponse(null, {
            status: 404,
            statusText: 'User not found',
        })
    }

    switch (user.selectedSport) {
        case "basketball":
            console.log(id)
        
            return await UserData.updateOne({ userId: new ObjectId(session.user.id) }, {
                $pull: {
                    basketballSeasons: { _id: new ObjectId(id) }
                }
            }).then((res) => {
                console.log(res)
                return new NextResponse(null, { status: 200 })
            }).catch((err) => {
                console.error(err);
                return new NextResponse(null, { status: 500, statusText: "Error modifying database" })
            })
        case "soccer":
            UserData.updateOne({ userId: new ObjectId(session.user.id) }, {
                $pull: {
                    soccerSeasons: { _id: id }
                }
            }).then(() => {
                return new NextResponse(null, { status: 200 })
            }).catch((err) => {
                console.error(err);
                return new NextResponse(null, { status: 500, statusText: "Error modifying database" })
            })

        case "football":
            UserData.updateOne({ userId: new ObjectId(session.user.id) }, {
                $pull: {
                    footballSeasons: { _id: id }
                }
            }).then(() => {
                return new NextResponse(null, { status: 200 })
            }).catch((err) => {
                console.error(err);
                return new NextResponse(null, { status: 500, statusText: "Error modifying database" })
            })
        case "hockey":
            UserData.updateOne({ userId: new ObjectId(session.user.id) }, {
                $pull: {
                    hockeySeasons: { _id: id }
                }
            }).then(() => {
                return new NextResponse(null, { status: 200 })
            }).catch((err) => {
                console.error(err);
                return new NextResponse(null, { status: 500, statusText: "Error modifying database" })
            })
    }
}