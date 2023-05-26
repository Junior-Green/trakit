import dbConnect from "@/src/database/mongoose-connect";
import UserData from "@/src/database/schemas/user-schema";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { IBasketballSeason } from "@/src/database/schemas/basketball-season-schema";

export async function DELETE({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    await dbConnect()

    if (!params.id) {
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
            const bSeason = user.basketballSeasons.find((season) => season.id === params.id)
            if (bSeason) {
                await bSeason.deleteOne()
                return new NextResponse(null, { status: 200 })
            }
            else {
                return new NextResponse(null, { status: 404 })
            }
        case "soccer":
            const sSeason = user.soccerSeasons.find((season) => season.id === params.id)
            if (sSeason) {
                await sSeason.deleteOne()
                return new NextResponse(null, { status: 200 })
            }
            else {
                return new NextResponse(null, { status: 404 })
            }
        case "football":
            const fSeason = user.footballSeasons.find((season) => season.id === params.id)
            if (fSeason) {
                await fSeason.deleteOne()
                return new NextResponse(null, { status: 200 })
            }
            else {
                return new NextResponse(null, { status: 404 })
            }
        case "hockey":
            const hSeason = user.hockeySeasons.find((season) => season.id === params.id)
            if (hSeason) {
                await hSeason.deleteOne()
                return new NextResponse(null, { status: 200 })
            }
            else {
                return new NextResponse(null, { status: 404 })
            }
    }

}