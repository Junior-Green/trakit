import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import dbConnect from "@/src/database/mongoose-connect";
import { IBasketBallGame } from "@/src/database/schemas/basketball-game-schema";
import { IFootballGame } from "@/src/database/schemas/football-game-schema";
import { IHockeyGame } from "@/src/database/schemas/hockey-game-schema";
import { ISoccerGame } from "@/src/database/schemas/soccer-game-schema";
import UserData, { IUserData } from "@/src/database/schemas/user-schema";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import styles from "./GameSummary.module.css";
import { camelCaseToTitleCase } from "@/src/utils";
import { AchievementsCarousel } from "@/src/components/achievements-carousel/achievements-carousel";


export default async function GameSummary({ params: { id } }: { params: { id: string; }; }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new Error("No current user session");
    }
    await dbConnect();

    const user = await UserData.findOne({ userId: new ObjectId(session.user.id) }).exec();

    if (!user) {
        throw new Error("No user found");
    }
    if (!user.selectedSport) {
        throw new Error("Sport not chosen");
    }

    const game = getGameFromId(id, user);
    if (!game) {
        throw new Error("No game found");
    }

    const gameObj = game.toObject()
    delete gameObj.date;
    delete gameObj._id;
    delete gameObj.opponentTeam
    delete gameObj.teamScore
    delete gameObj.opponentScore


    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.scoreContainer}>
                    <h2 className={styles.teamLabel}>My Team</h2>
                    <h1 className={styles.scoreLabel}>{game.teamScore}</h1>
                </div>
                <span style={{ fontSize: "1.5vmax", fontWeight: 600, color: "rgb(140, 113, 244)" }}>FINAL</span>
                <div className={styles.scoreContainer}>
                    <h2 className={styles.teamLabel}>{game.opponentTeam}</h2>
                    <h1 className={styles.scoreLabel}>{game.opponentScore}</h1>
                </div>
            </div>
            <div className={styles.statContainer}>
                {
                    [
                        <>
                            <div className={styles.statBody}>
                                <h1 className={styles.statLabel}>Date</h1>
                                <div className={styles.row}>
                                    <span style={{ fontSize: "2vmax" }}>{formatDate(new Date(game.date))}</span>
                                </div>

                            </div>
                        </>
                    ]
                        .concat(Object.keys(gameObj).sort((a, b) => a.localeCompare(b)).map(
                            (key) =>
                                <div key={key} className={styles.statBody}>
                                    <h1 className={styles.statLabel}>{camelCaseToTitleCase(key)}</h1>
                                    <div className={styles.row}>
                                        <span className={styles.statCounter}>{gameObj[key]}</span>
                                    </div>
                                </div>
                        ))
                }
            </div>
            <div style={{display:"flex", alignItems: "center", justifyContent:"center", width: "100%"}}>
                <AchievementsCarousel game={game.toObject()} sport={"basketball"}></AchievementsCarousel>
            </div>
        </div>
    );
}

function formatDate(date: Date): string {
    const months: any = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'Novemeber',
        11: 'December'
    }

    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

function getGameFromId(id: string, user: IUserData): IBasketBallGame | ISoccerGame | IFootballGame | IHockeyGame | null | undefined {
    switch (user.selectedSport) {
        case "basketball":
            let bGame;
            user.basketballSeasons.forEach((season) => {
                const game = season.games.find((game) => game._id == id);
                if (game) {
                    bGame = game;
                }
            });
            return bGame;
        case "hockey":
            let hGame;
            user.hockeySeasons.forEach((season) => {
                const game = season.games.find((game) => game._id == id);
                if (game) {
                    hGame = game;
                }
            });
            return hGame;
        case "football":
            let fGame;
            user.footballSeasons.forEach((season) => {
                const game = season.games.find((game) => game._id == id);
                if (game) {
                    fGame = game;
                }
            });
            return fGame;
        case "soccer":
            let sGame;
            user.soccerSeasons.forEach((season) => {
                const game = season.games.find((game) => game._id == id);
                if (game) {
                    sGame = game;
                }
            });
            return sGame;
        default:
            return null;
    }
}
