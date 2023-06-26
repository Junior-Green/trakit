import dbConnect from "@/src/database/mongoose-connect";
import BasketballSeason from "@/src/database/schemas/basketball-season-schema";
import FootballSeason from "@/src/database/schemas/football-season-schema";
import HockeySeason from "@/src/database/schemas/hockey-season-schema";
import SoccerSeason from "@/src/database/schemas/soccer-season-schema";
import UserData from "@/src/database/schemas/user-schema";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
    const session = await getServerSession(authOptions);
    await dbConnect()

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
            return NextResponse.json(user.basketballSeasons)
        case "soccer":
            return NextResponse.json(user.soccerSeasons)
        case "football":
            return NextResponse.json(user.footballSeasons)
        case "hockey":
            return NextResponse.json(user.hockeySeasons)
    }

}
export async function POST() {
    const session = await getServerSession(authOptions);

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
            user.basketballSeasons.push(new BasketballSeason())
            break;
        case "soccer":
            user.soccerSeasons.push(new SoccerSeason())
            break;
        case "football":
            user.footballSeasons.push(new FootballSeason())
            break;
        case "hockey":
            user.hockeySeasons.push(new HockeySeason())
            break;
    }

    await user.save()

    return new NextResponse(null, {
        status: 200
    })
}