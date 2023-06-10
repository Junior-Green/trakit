import {authOptions} from "@/src/app/api/auth/[...nextauth]/route";
import dbConnect from "@/src/database/mongoose-connect";
import {IBasketBallGame} from "@/src/database/schemas/basketball-game-schema";
import {IFootballGame} from "@/src/database/schemas/football-game-schema";
import {IHockeyGame} from "@/src/database/schemas/hockey-game-schema";
import {ISoccerGame} from "@/src/database/schemas/soccer-game-schema";
import UserData, {IUserData} from "@/src/database/schemas/user-schema";
import {ObjectId} from "mongodb";
import {getServerSession} from "next-auth";
import styles from "./GameSummary.module.css";


export default async function GameSummary({params: {id}}: {params: {id: string;};}) {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new Error("No current user session");
    }
    await dbConnect();

    const user = await UserData.findOne({userId: new ObjectId(session.user.id)}).exec();

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

    const gameObj = game.toObject();


    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.scoreContainer}>

                </div>
            </div>
        </div>
    );
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
