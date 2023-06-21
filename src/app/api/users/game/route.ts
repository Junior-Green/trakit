import {getServerSession} from "next-auth";
import {authOptions} from "../../auth/[...nextauth]/route";
import {NextRequest, NextResponse} from "next/server";
import dbConnect from "@/src/database/mongoose-connect";
import UserData from "@/src/database/schemas/user-schema";
import {ObjectId} from "mongodb";
import BasketballSeason from "@/src/database/schemas/basketball-season-schema";
import BasketballGame from "@/src/database/schemas/basketball-game-schema";
import SoccerSeason from "@/src/database/schemas/soccer-season-schema";
import HockeySeason from "@/src/database/schemas/hockey-season-schema";
import FootballSeason from "@/src/database/schemas/football-season-schema";
import SoccerGame from "@/src/database/schemas/soccer-game-schema";
import HockeyGame from "@/src/database/schemas/hockey-game-schema";
import FootballGame from "@/src/database/schemas/football-game-schema";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const body = await req.json();

    if (!session) {
        return new NextResponse(null, {
            status: 403,
            statusText: 'No user session detected',
        });
    }

    await dbConnect();

    const user = await UserData.findOne({userId: new ObjectId(session.user.id)}).exec();

    if (!user) {
        return new NextResponse(null, {
            status: 404,
            statusText: 'User not found',
        });
    }

    switch (user.selectedSport) {
        case "basketball":
            return saveBasektballGame().then(_ => {
                return new NextResponse(null, {
                    status: 200
                });
            }).catch(err => {
                console.log(err);
                return new NextResponse(null, {
                    status: 500,
                    statusText: 'Internal server error'
                });
            });
        case "soccer":
            return saveSoccerGame().then(_ => {
                return new NextResponse(null, {
                    status: 200
                });
            }).catch(err => {
                console.log(err);
                return new NextResponse(null, {
                    status: 500,
                    statusText: 'Internal server error'
                });
            });
        case "football":
            return saveFootballGame().then(_ => {
                return new NextResponse(null, {
                    status: 200
                });
            }).catch(err => {
                console.log(err);
                return new NextResponse(null, {
                    status: 500,
                    statusText: 'Internal server error'
                });
            });
        case "hockey":
            return saveHockeyGame().then(_ => {
                return new NextResponse(null, {
                    status: 200
                });
            }).catch(err => {
                console.log(err);
                return new NextResponse(null, {
                    status: 500,
                    statusText: 'Internal server error'
                });
            });
        default:
            return new NextResponse(null, {
                status: 500,
                statusText: 'Internal server error'
            });
    }

    async function saveBasektballGame() {
        if (!user) return Promise.reject(401);
        if (user.basketballSeasons.length === 0) {
            const newSeason = new BasketballSeason({
                seasons: [],
            });
            user.basketballSeasons.push(newSeason);
        }

        const season = user.basketballSeasons.at(-1);

        if (!season) {
            return Promise.reject(404);
        }

        try {
            const newGame = new BasketballGame({
                opponentTeam: body.opponentTeam,
                teamScore: body.teamScore,
                opponentScore: body.opponentScore,
                date: Date.now(),
                assists: body.assists,
                dunks: body.dunks,
                minutesPlayed: body.minutesPlayed,
                pointsScored: body.pointsScored,
                fieldGoalsMade: body.fieldGoalsMade,
                fieldGoalsMissed: body.fieldGoalsMissed,
                threePointersMade: body.threePointersMade,
                threePointersMissed: body.threePointersMissed,
                freeThrowsMade: body.freeThrowsMade,
                freeThrowsMissed: body.freeThrowsMissed,
                offensiveRebounds: body.offensiveRebounds,
                defensiveRebounds: body.defensiveRebounds,
                turnovers: body.turnovers,
                steals: body.steals,
                blocks: body.blocks,
                personalFouls: body.personalFouls,
            });
            season.games.push(newGame);
            await user.save();
            return Promise.resolve(200);
        } catch (error) {
            return Promise.reject(400);
        }
    }

    async function saveSoccerGame() {
        if (!user) return Promise.reject(401);
        if (user.soccerSeasons.length === 0) {
            const newSeason = new SoccerSeason({
                seasons: [],
            });
            user.soccerSeasons.push(newSeason);
        }

        const season = user!.soccerSeasons.at(-1);

        if (!season) {
            return Promise.reject(404);
        }

        try {
            const newGame = new SoccerGame({
                opponentTeam: body.opponentTeam,
                teamScore: body.teamScore,
                opponentScore: body.opponentScore,
                date: Date.now(),
                minutesPlayed: body.minutesPlayed,
                goals: body.goals,
                assists: body.assists,
                foulsCommitted: body.foulsCommitted,
                redCards: body.redCards,
                yellowCards: body.yellowCards,
                offSides: body.offSides,
                shotsOffTarget: body.shotsOffTarget,
                shotsOnTarget: body.shotsOnTarget,
                tackles: body.tackles,
                blocks: body.blocks,
                interceptions: body.interceptions,
                clearances: body.clearances,
                turnovers: body.turnovers,
                saves: body.saves,
                goalsGiven: body.goalsGiven,
            });
            season.games.push(newGame);
            await user.save();
            return Promise.resolve(200);
        } catch (error) {
            return Promise.reject(400);
        }
    }

    async function saveHockeyGame() {
        if (!user) return Promise.reject(401);
        if (user.hockeySeasons.length === 0) {
            const newSeason = new HockeySeason({
                seasons: [],
            });
            user.hockeySeasons.push(newSeason);
        }

        const season = user.hockeySeasons.at(-1);

        if (!season) {
            return Promise.reject("No season exists");
        }

        try {
            const newGame = new HockeyGame({
                opponentTeam: body.opponentTeam,
                teamScore: body.teamScore,
                opponentScore: body.opponentScore,
                date: Date.now(),
                minutesPlayed: body.minutesPlayed,
                goals: body.goals,
                assists: body.assists,
                penaltyMinutes: body.penaltyMinutes,
                powerPlayGoals: body.powerPlayGoals,
                shortHandedGoals: body.shortHandedGoals,
                overTimeGoals: body.overTimeGoals,
                shotsTaken: body.shotsTaken,
                faceoffWins: body.faceoffWins,
                faceOffLosses: body.faceOffLosses,
                saves: body.saves,
                goalsGiven: body.goalsGiven,
                shutOuts: body.shutOuts,
            });
            season.games.push(newGame);
            await user.save();
            return Promise.resolve(200);
        } catch (error) {
            return Promise.reject(400);
        }
    }

    async function saveFootballGame() {
        if (!user) return Promise.reject(401);

        if (user.footballSeasons.length === 0) {
            const newSeason = new FootballSeason({
                seasons: [],
            });
            user.footballSeasons.push(newSeason);
        }

        const season = user!.footballSeasons.at(-1);

        if (!season) {
            return Promise.reject(404);
        }

        try {
            const newGame = new FootballGame({
                opponentTeam: body.opponentTeam,
                teamScore: body.teamScore,
                opponentScore: body.opponentScore,
                date: Date.now(),
                passingStats: {
                    passesMade: body.passesMade,
                    passesMissed: body.passesMissed,
                    passingTouchDowns: body.passingTouchDowns,
                    interceptedPasses: body.interceptedPasses,
                    totalPassingYards: body.totalPassingYards
                },
                rushingStats: {
                    carries: body.carries,
                    totalRushingYards: body.totalRushingYards,
                    rushingTouchDowns: body.rushingTouchDowns,
                    fumbles: body.fumbles
                },
                recievingStats: {
                    receptions: body.receptions,
                    targets: body.targets,
                    totalRecievingYards: body.totalRecievingYards,
                    receivingTouchDowns: body.receivingTouchDowns,
                    drops: body.drops,
                },
                defenceStats: {
                    tackles: body.tackles,
                    sacks: body.sacks,
                    passesDefended: body.passesDefended,
                    interceptions: body.interceptions,
                    hurries: body.hurries,
                    safeties: body.safeties
                },
                kickingStats: {
                    kickoffs: body.kickoffs,
                    touchbacks: body.touchbacks,
                    fieldGoalsMade: body.fieldGoalsMade,
                    fieldGoalsMissed: body.fieldGoalsMissed
                },
            });
            season.games.push(newGame);
            await user.save();
            return Promise.resolve(200);
        } catch (error) {
            return Promise.reject(400);
        }
    }
}

