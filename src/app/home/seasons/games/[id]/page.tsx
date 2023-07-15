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
import { camelCaseToTitleCase, formatDate } from "@/src/utils/utils";
import classNames from "classnames";
import { AchievementBadge } from "@/src/components/achievement-badge/achievement-badge";
import { DeleteGameButton } from "@/src/components/delete-game-button/delete-game-button";

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

    const gameObj = game.toObject();
    delete gameObj.date;
    delete gameObj._id;
    delete gameObj.opponentTeam;
    delete gameObj.teamScore;
    delete gameObj.opponentScore;
    delete gameObj.team;

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.scoreContainer}>
                    <h2 className={styles.teamLabel}>{game.team}</h2>
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

                        <div key={'date'} className={styles.statBody}>
                            <h1 className={styles.statLabel}>Date</h1>
                            <div className={styles.row}>
                                <span style={{ fontSize: "2vmax" }}>{formatDate(new Date(game.date))}</span>
                            </div>
                        </div>

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
            <div className="flex w-full items-center justify-center">
                <hr className={styles.roundedDivider} />
            </div>
            <div className={styles.achievementContainer}>
                {
                    Object.keys(gameObj).map((key) => {
                        if (user.selectedSport === "basketball") {
                            return getBasketballAchievement(key, gameObj);
                        }
                        else if (user.selectedSport === "football") {
                            return getFootballAchievement(key, gameObj);
                        }
                        else if (user.selectedSport === "hockey") {
                            return getHockeyAchievement(key, gameObj);
                        }
                        else {
                            return getSoccerAchievement(key, gameObj);
                        }
                    })
                }
            </div>
            <div className={styles.footer}>
                <DeleteGameButton id={String(game._id)} />
            </div>
        </div>
    );

    

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
}

export function getBasketballAchievement(key: string, gameObj: any): JSX.Element | null {
    switch (key) {
        case "assists":
            const assists: number = gameObj['assists'];
            const assistBadgeName = 'Dimer';
            if (assists >= 5) {
                return getAchievmentBadgeComponent(assistBadgeName, <AchievementBadge badgeIcon={'assist'} tier={'gold'} />);
            }
            else if (assists >= 3) {
                return getAchievmentBadgeComponent(assistBadgeName, <AchievementBadge badgeIcon={'assist'} tier={'silver'} />);
            }
            else if (assists >= 2) {
                return getAchievmentBadgeComponent(assistBadgeName, <AchievementBadge badgeIcon={'assist'} tier={'bronze'} />);
            }
            return null;
        case "minutesPlayed":
            const minutes: number = gameObj['minutesPlayed'];
            const minutesPlayedBadgeName = 'X-Factor';
            if (minutes > 25) {
                return getAchievmentBadgeComponent(minutesPlayedBadgeName, <AchievementBadge badgeIcon={'clock'} tier={'gold'} />);
            }
            else if (minutes > 15) {
                return getAchievmentBadgeComponent(minutesPlayedBadgeName, <AchievementBadge badgeIcon={'clock'} tier={'silver'} />);
            }
            else if (minutes > 10) {
                return getAchievmentBadgeComponent(minutesPlayedBadgeName, <AchievementBadge badgeIcon={'clock'} tier={'bronze'} />);
            }
            return null;
        case "pointsScored":
            const pointsScored: number = gameObj['pointsScored'];
            const pointsScoredBadgeName = 'Scoring Machine';
            if (pointsScored > 25) {
                return getAchievmentBadgeComponent(pointsScoredBadgeName, <AchievementBadge badgeIcon={'star'} tier={'gold'} />);
            }
            else if (pointsScored > 15) {
                return getAchievmentBadgeComponent(pointsScoredBadgeName, <AchievementBadge badgeIcon={'star'} tier={'silver'} />);
            }
            else if (pointsScored > 8) {
                return getAchievmentBadgeComponent(pointsScoredBadgeName, <AchievementBadge badgeIcon={'star'} tier={'bronze'} />);
            }
            return null;
        case "fieldGoalsMade":
            const fgMade: number = gameObj['fieldGoalsMade'];
            const fgMissed: number = gameObj['fieldGoalsMissed'];
            const fgPercentage: number = (fgMade / (fgMade + fgMissed)) * 100;
            const fieldGoalsBadgeName = 'Deadeye';
            if (fgPercentage >= 60) {
                return getAchievmentBadgeComponent(fieldGoalsBadgeName, <AchievementBadge badgeIcon={'eye'} tier={'gold'} />);
            }
            else if (fgPercentage >= 50) {
                return getAchievmentBadgeComponent(fieldGoalsBadgeName, <AchievementBadge badgeIcon={'eye'} tier={'silver'} />);
            }
            else if (fgPercentage >= 40) {
                return getAchievmentBadgeComponent(fieldGoalsBadgeName, <AchievementBadge badgeIcon={'eye'} tier={'bronze'} />);
            }
            return null;
        case "threePointersMade":
            const threesMade: number = gameObj['threePointersMade'];
            const threesMissed: number = gameObj['threePointersMissed'];
            const threePercentage: number = (threesMade / (threesMade + threesMissed)) * 100;
            const threesBadgeName = 'Sniper';
            if (threePercentage >= 40) {
                return getAchievmentBadgeComponent(threesBadgeName, <AchievementBadge badgeIcon={'target'} tier={'gold'} />);
            }
            else if (threePercentage >= 35) {
                return getAchievmentBadgeComponent(threesBadgeName, <AchievementBadge badgeIcon={'target'} tier={'silver'} />);
            }
            else if (threePercentage >= 30) {
                return getAchievmentBadgeComponent(threesBadgeName, <AchievementBadge badgeIcon={'target'} tier={'bronze'} />);
            }
            return null;
        case "freeThrowsMade":
            const freesMade: number = gameObj['freeThrowsMade'];
            const freesMissed: number = gameObj['freeThrowsMissed'];
            const freePercentage: number = (freesMade / (freesMade + freesMissed)) * 100;
            const freeBadgeName = 'Free Throw Ace';
            if (freePercentage >= 80) {
                return getAchievmentBadgeComponent(freeBadgeName, <AchievementBadge badgeIcon={'target'} tier={'gold'} />);
            }
            else if (freePercentage >= 75) {
                return getAchievmentBadgeComponent(freeBadgeName, <AchievementBadge badgeIcon={'target'} tier={'silver'} />);
            }
            else if (freePercentage >= 70) {
                return getAchievmentBadgeComponent(freeBadgeName, <AchievementBadge badgeIcon={'target'} tier={'bronze'} />);
            }
            return null;
        case "offensiveRebounds":
            const oRebounds: number = gameObj['offensiveRebounds'];
            const offensiveReboundName = 'Glass Crasher';
            if (oRebounds >= 5) {
                return getAchievmentBadgeComponent(offensiveReboundName, <AchievementBadge badgeIcon={'block'} tier={'gold'} />);
            }
            else if (oRebounds >= 3) {
                return getAchievmentBadgeComponent(offensiveReboundName, <AchievementBadge badgeIcon={'block'} tier={'silver'} />);
            }
            else if (oRebounds >= 1) {
                return getAchievmentBadgeComponent(offensiveReboundName, <AchievementBadge badgeIcon={'block'} tier={'bronze'} />);
            }
            return null;
        case "defensiveRebounds":
            const dRebounds: number = gameObj['defensiveRebounds'];
            const defensiveReboundName = 'Rim Protector';
            if (dRebounds >= 5) {
                return getAchievmentBadgeComponent(defensiveReboundName, <AchievementBadge badgeIcon={'block'} tier={'gold'} />);
            }
            else if (dRebounds >= 3) {
                return getAchievmentBadgeComponent(defensiveReboundName, <AchievementBadge badgeIcon={'block'} tier={'silver'} />);
            }
            else if (dRebounds >= 1) {
                return getAchievmentBadgeComponent(defensiveReboundName, <AchievementBadge badgeIcon={'block'} tier={'bronze'} />);
            }
            return null;
        case "dunks":
            const dunks: number = gameObj['dunks'];
            const dunksName = 'Acrobatic';
            if (dunks >= 5) {
                return getAchievmentBadgeComponent(dunksName, <AchievementBadge badgeIcon={'dunk-ball'} tier={'gold'} />);
            }
            else if (dunks >= 3) {
                return getAchievmentBadgeComponent(dunksName, <AchievementBadge badgeIcon={'dunk-ball'} tier={'silver'} />);
            }
            else if (dunks >= 2) {
                return getAchievmentBadgeComponent(dunksName, <AchievementBadge badgeIcon={'dunk-ball'} tier={'bronze'} />);
            }
            return null;
        case "turnovers":
            const to: number = gameObj['turnovers'];
            const toName = 'Sticky Fingers';
            if (to === 0) {
                return getAchievmentBadgeComponent(toName, <AchievementBadge badgeIcon={'slime'} tier={'gold'} />);
            }
            else if (to === 1) {
                return getAchievmentBadgeComponent(toName, <AchievementBadge badgeIcon={'slime'} tier={'silver'} />);
            }
            else if (to === 2) {
                return getAchievmentBadgeComponent(toName, <AchievementBadge badgeIcon={'slime'} tier={'bronze'} />);
            }
            return null;
        case "steals":
            const steals: number = gameObj['steals'];
            const stealsName = 'Pickpocketer';
            if (steals >= 5) {
                return getAchievmentBadgeComponent(stealsName, <AchievementBadge badgeIcon={'coins'} tier={'gold'} />);
            }
            else if (steals >= 3) {
                return getAchievmentBadgeComponent(stealsName, <AchievementBadge badgeIcon={'coins'} tier={'silver'} />);
            }
            else if (steals >= 2) {
                return getAchievmentBadgeComponent(stealsName, <AchievementBadge badgeIcon={'coins'} tier={'bronze'} />);
            }
            return null;
        case "blocks":
            const blocks: number = gameObj['blocks'];
            const blocksName = 'Brick Wall';
            if (blocks >= 3) {
                return getAchievmentBadgeComponent(blocksName, <AchievementBadge badgeIcon={'brick-wall'} tier={'gold'} />);
            }
            else if (blocks >= 2) {
                return getAchievmentBadgeComponent(blocksName, <AchievementBadge badgeIcon={'brick-wall'} tier={'silver'} />);
            }
            else if (blocks >= 1) {
                return getAchievmentBadgeComponent(blocksName, <AchievementBadge badgeIcon={'brick-wall'} tier={'bronze'} />);
            }
            return null;
        default:
            return null;
    }
}

export function getSoccerAchievement(key: string, gameObj: any): JSX.Element | null {
    switch (key) {
        case "assists":
            const assists: number = gameObj['assists'];
            const assistBadgeName = 'Tunnel Vision';
            if (assists >= 3) {
                return getAchievmentBadgeComponent(assistBadgeName, <AchievementBadge badgeIcon={'eye'} tier={'gold'} />);
            }
            else if (assists >= 2) {
                return getAchievmentBadgeComponent(assistBadgeName, <AchievementBadge badgeIcon={'eye'} tier={'silver'} />);
            }
            else if (assists >= 1) {
                return getAchievmentBadgeComponent(assistBadgeName, <AchievementBadge badgeIcon={'eye'} tier={'bronze'} />);
            }
            return null;
        case "goals":
            const goals: number = gameObj['goals'];
            const goalsBadgeName = 'Scoring Machine';
            if (goals >= 3) {
                return getAchievmentBadgeComponent(goalsBadgeName, <AchievementBadge badgeIcon={'star'} tier={'gold'} />);
            }
            else if (goals >= 2) {
                return getAchievmentBadgeComponent(goalsBadgeName, <AchievementBadge badgeIcon={'star'} tier={'silver'} />);
            }
            else if (goals >= 1) {
                return getAchievmentBadgeComponent(goalsBadgeName, <AchievementBadge badgeIcon={'star'} tier={'bronze'} />);
            }
            return null;
        case "redCards":
            const redCards: number = gameObj['redCards'];
            const yellowCards: number = gameObj['yellowCards'];
            const redCardsBadgeName = 'Clean Player';
            if (redCards === 0 && yellowCards === 0) {
                return getAchievmentBadgeComponent(redCardsBadgeName, <AchievementBadge badgeIcon={'warning-card'} tier={'gold'} />);
            }
            else if (yellowCards === 1 && redCards === 0) {
                return getAchievmentBadgeComponent(redCardsBadgeName, <AchievementBadge badgeIcon={'warning-card'} tier={'bronze'} />);
            }
            return null;
        case "shotsOnTarget":
            const shotsOnTarget = gameObj['shotsOnTarget'];
            const shotsOffTarget = gameObj['shotsOffTarget'];
            const shotAccuracy = (shotsOnTarget / (shotsOnTarget + shotsOffTarget)) * 100;
            const shotAccuracyBadgeName = 'Sniper';
            if (shotAccuracy >= 60) {
                return getAchievmentBadgeComponent(shotAccuracyBadgeName, <AchievementBadge badgeIcon={'target'} tier={'gold'} />);
            }
            else if (shotAccuracy >= 50) {
                return getAchievmentBadgeComponent(shotAccuracyBadgeName, <AchievementBadge badgeIcon={'target'} tier={'silver'} />);
            }
            else if (shotAccuracy >= 45) {
                return getAchievmentBadgeComponent(shotAccuracyBadgeName, <AchievementBadge badgeIcon={'target'} tier={'bronze'} />);
            }
        case "tackles":
            const tackles = gameObj['tackles'];
            const tacklesBadgeName = 'Penguin';
            if (tackles >= 4) {
                return getAchievmentBadgeComponent(tacklesBadgeName, <AchievementBadge badgeIcon={'penguin'} tier={'gold'} />);
            }
            else if (tackles >= 3) {
                return getAchievmentBadgeComponent(tacklesBadgeName, <AchievementBadge badgeIcon={'penguin'} tier={'silver'} />);
            }
            else if (tackles >= 2) {
                return getAchievmentBadgeComponent(tacklesBadgeName, <AchievementBadge badgeIcon={'penguin'} tier={'bronze'} />);
            }
            return null;
        case "blocks":
            const blocks: number = gameObj['blocks'];
            const blocksName = 'Brick Wall';
            if (blocks >= 3) {
                return getAchievmentBadgeComponent(blocksName, <AchievementBadge badgeIcon={'brick-wall'} tier={'gold'} />);
            }
            else if (blocks >= 2) {
                return getAchievmentBadgeComponent(blocksName, <AchievementBadge badgeIcon={'brick-wall'} tier={'silver'} />);
            }
            else if (blocks >= 1) {
                return getAchievmentBadgeComponent(blocksName, <AchievementBadge badgeIcon={'brick-wall'} tier={'bronze'} />);
            }
            return null;
        case "turnovers":
            const to: number = gameObj['turnovers'];
            const toName = 'Sticky Feet';
            if (to === 0) {
                return getAchievmentBadgeComponent(toName, <AchievementBadge badgeIcon={'slime'} tier={'gold'} />);
            }
            else if (to === 1) {
                return getAchievmentBadgeComponent(toName, <AchievementBadge badgeIcon={'slime'} tier={'silver'} />);
            }
            else if (to === 2) {
                return getAchievmentBadgeComponent(toName, <AchievementBadge badgeIcon={'slime'} tier={'bronze'} />);
            }
            return null;
        case "saves":
            const saves: number = gameObj['saves'];
            const savesName = 'Savior';
            if (saves >= 3) {
                return getAchievmentBadgeComponent(savesName, <AchievementBadge badgeIcon={'angel-wings'} tier={'gold'} />);
            }
            else if (saves === 2) {
                return getAchievmentBadgeComponent(savesName, <AchievementBadge badgeIcon={'angel-wings'} tier={'silver'} />);
            }
            else if (saves === 1) {
                return getAchievmentBadgeComponent(savesName, <AchievementBadge badgeIcon={'angel-wings'} tier={'bronze'} />);
            }
            return null;
        case "interceptions":
            const interceptions: number = gameObj['interceptions'];
            const interceptionsName = 'Ninja';
            if (interceptions >= 3) {
                return getAchievmentBadgeComponent(interceptionsName, <AchievementBadge badgeIcon={'ninja'} tier={'gold'} />);
            }
            else if (interceptions === 2) {
                return getAchievmentBadgeComponent(interceptionsName, <AchievementBadge badgeIcon={'ninja'} tier={'silver'} />);
            }
            else if (interceptions === 1) {
                return getAchievmentBadgeComponent(interceptionsName, <AchievementBadge badgeIcon={'ninja'} tier={'bronze'} />);
            }
            return null;
        default:
            return <></>;
    }
}

export function getFootballAchievement(key: string, gameObj: any): JSX.Element | null {
    switch (key) {
        case "passesMade":
            const passesMade = gameObj['passesMade'];
            const passesMissed = gameObj['passesMissed'];
            const passAccuracy = (passesMade / (passesMissed + passesMade)) * 100;
            const shotAccuracyBadgeName = 'Sniper';
            if (passAccuracy >= 0.70) {
                return getAchievmentBadgeComponent(shotAccuracyBadgeName, <AchievementBadge badgeIcon={'target'} tier={'gold'} />);
            }
            else if (passAccuracy >= 0.60) {
                return getAchievmentBadgeComponent(shotAccuracyBadgeName, <AchievementBadge badgeIcon={'target'} tier={'silver'} />);
            }
            else if (passAccuracy >= 0.5) {
                return getAchievmentBadgeComponent(shotAccuracyBadgeName, <AchievementBadge badgeIcon={'target'} tier={'bronze'} />);
            }
            return null;
        case "passingTouchDowns":
            const passingTouchDowns = gameObj['passingTouchDowns'];
            const passingTouchDownsName = 'Tunnel Vision';
            if (passingTouchDowns >= 3) {
                return getAchievmentBadgeComponent(passingTouchDownsName, <AchievementBadge badgeIcon={'eye'} tier={'gold'} />);
            }
            else if (passingTouchDowns >= 2) {
                return getAchievmentBadgeComponent(passingTouchDownsName, <AchievementBadge badgeIcon={'eye'} tier={'silver'} />);
            }
            else if (passingTouchDowns >= 1) {
                return getAchievmentBadgeComponent(passingTouchDownsName, <AchievementBadge badgeIcon={'eye'} tier={'bronze'} />);
            }
            return null;
        case "totalPassingYards":
            const totalPassingYards = gameObj['totalPassingYards'];
            const totalPassingYardsName = 'Strong Arm';
            if (totalPassingYards >= 200) {
                return getAchievmentBadgeComponent(totalPassingYardsName, <AchievementBadge badgeIcon={'arm'} tier={'gold'} />);
            }
            else if (totalPassingYards >= 100) {
                return getAchievmentBadgeComponent(totalPassingYardsName, <AchievementBadge badgeIcon={'arm'} tier={'silver'} />);
            }
            else if (totalPassingYards >= 50) {
                return getAchievmentBadgeComponent(totalPassingYardsName, <AchievementBadge badgeIcon={'arm'} tier={'bronze'} />);
            }
            return null;
        case "tackles":
            const tackles = gameObj['tackles'];
            const tacklesBadgeName = 'Brick Wall';
            if (tackles >= 4) {
                return getAchievmentBadgeComponent(tacklesBadgeName, <AchievementBadge badgeIcon={'brick-wall'} tier={'gold'} />);
            }
            else if (tackles >= 3) {
                return getAchievmentBadgeComponent(tacklesBadgeName, <AchievementBadge badgeIcon={'brick-wall'} tier={'silver'} />);
            }
            else if (tackles >= 2) {
                return getAchievmentBadgeComponent(tacklesBadgeName, <AchievementBadge badgeIcon={'brick-wall'} tier={'bronze'} />);
            }
            return null;
        case "sacks":
            const sacks = gameObj['sacks'];
            const sacksBadgeName = 'Slicky';
            if (sacks >= 3) {
                return getAchievmentBadgeComponent(sacksBadgeName, <AchievementBadge badgeIcon={'bug'} tier={'gold'} />);
            }
            else if (sacks >= 2) {
                return getAchievmentBadgeComponent(sacksBadgeName, <AchievementBadge badgeIcon={'bug'} tier={'silver'} />);
            }
            else if (sacks >= 1) {
                return getAchievmentBadgeComponent(sacksBadgeName, <AchievementBadge badgeIcon={'bug'} tier={'bronze'} />);
            }
            return null;
        case "interceptions":
            const interceptions = gameObj['interceptions'];
            const interceptionsBadgeName = 'Ninja';
            if (interceptions >= 3) {
                return getAchievmentBadgeComponent(interceptionsBadgeName, <AchievementBadge badgeIcon={'ninja'} tier={'gold'} />);
            }
            else if (interceptions >= 2) {
                return getAchievmentBadgeComponent(interceptionsBadgeName, <AchievementBadge badgeIcon={'ninja'} tier={'silver'} />);
            }
            else if (interceptions >= 1) {
                return getAchievmentBadgeComponent(interceptionsBadgeName, <AchievementBadge badgeIcon={'ninja'} tier={'bronze'} />);
            }
            return null;
        case "receptions":
            const receptions = gameObj['receptions'];
            const receptionsBadgeName = 'Sticky Fingers';
            if (receptions >= 5) {
                return getAchievmentBadgeComponent(receptionsBadgeName, <AchievementBadge badgeIcon={'slime'} tier={'gold'} />);
            }
            else if (receptions >= 3) {
                return getAchievmentBadgeComponent(receptionsBadgeName, <AchievementBadge badgeIcon={'slime'} tier={'silver'} />);
            }
            else if (receptions >= 2) {
                return getAchievmentBadgeComponent(receptionsBadgeName, <AchievementBadge badgeIcon={'slime'} tier={'bronze'} />);
            }
            return null;
        case "targets":
            const targets = gameObj['targets'];
            const targetsBadgeName = 'Reliable Catcher';
            if (targets >= 8) {
                return getAchievmentBadgeComponent(targetsBadgeName, <AchievementBadge badgeIcon={'catch-football'} tier={'gold'} />);
            }
            else if (targets >= 5) {
                return getAchievmentBadgeComponent(targetsBadgeName, <AchievementBadge badgeIcon={'catch-football'} tier={'silver'} />);
            }
            else if (targets >= 3) {
                return getAchievmentBadgeComponent(targetsBadgeName, <AchievementBadge badgeIcon={'catch-football'} tier={'bronze'} />);
            }
            return null;
        case "totalRecievingYards":
            const totalRecievingYards = gameObj['totalRecievingYards'];
            const totalRecievingYardsBadgeName = 'Distant Catcher';
            if (totalRecievingYards >= 45) {
                return getAchievmentBadgeComponent(totalRecievingYardsBadgeName, <AchievementBadge badgeIcon={'measuring-tape'} tier={'gold'} />);
            }
            else if (totalRecievingYards >= 30) {
                return getAchievmentBadgeComponent(totalRecievingYardsBadgeName, <AchievementBadge badgeIcon={'measuring-tape'} tier={'silver'} />);
            }
            else if (totalRecievingYards >= 10) {
                return getAchievmentBadgeComponent(totalRecievingYardsBadgeName, <AchievementBadge badgeIcon={'measuring-tape'} tier={'bronze'} />);
            }
            return null;
        case "totalRushingYards":
            const totalRushingYards = gameObj['totalRushingYards'];
            const totalRushingYardsBadgeName = 'Track Star';
            if (totalRushingYards >= 50) {
                return getAchievmentBadgeComponent(totalRushingYardsBadgeName, <AchievementBadge badgeIcon={'star'} tier={'gold'} />);
            }
            else if (totalRushingYards >= 30) {
                return getAchievmentBadgeComponent(totalRushingYardsBadgeName, <AchievementBadge badgeIcon={'star'} tier={'silver'} />);
            }
            else if (totalRushingYards >= 10) {
                return getAchievmentBadgeComponent(totalRushingYardsBadgeName, <AchievementBadge badgeIcon={'star'} tier={'bronze'} />);
            }
            return null;
        case "receivingTouchDowns":
            const receivingTouchDowns: number = gameObj['receivingTouchDowns'];
            const rushingTouchDowns: number = gameObj['rushingTouchDowns'];
            const totalTouchDowns: number = receivingTouchDowns + rushingTouchDowns;
            const totalTouchDownsName: string = "Juggernuat";

            if (totalTouchDowns >= 3) {
                return getAchievmentBadgeComponent(totalTouchDownsName, <AchievementBadge badgeIcon={'gas-mask'} tier={'gold'} />);
            }
            else if (totalTouchDowns >= 2) {
                return getAchievmentBadgeComponent(totalTouchDownsName, <AchievementBadge badgeIcon={'gas-mask'} tier={'silver'} />);
            }
            else if (totalTouchDowns >= 1) {
                return getAchievmentBadgeComponent(totalTouchDownsName, <AchievementBadge badgeIcon={'gas-mask'} tier={'bronze'} />);
            }
            return null;
        case "fieldGoalsMade":
            const fieldGoalsMade: number = gameObj['fieldGoalsMade'];
            const fieldGoalsMissed: number = gameObj['fieldGoalsMissed'];
            const fieldAGoalAccuracy = (fieldGoalsMade / (fieldGoalsMade + fieldGoalsMissed)) * 100;
            const fieldGoalName: string = "Steel Toe";

            if (fieldAGoalAccuracy >= 80) {
                return getAchievmentBadgeComponent(fieldGoalName, <AchievementBadge badgeIcon={'anvil'} tier={'gold'} />);
            }
            else if (fieldAGoalAccuracy >= 70) {
                return getAchievmentBadgeComponent(fieldGoalName, <AchievementBadge badgeIcon={'anvil'} tier={'silver'} />);
            }
            else if (fieldAGoalAccuracy >= 60) {
                return getAchievmentBadgeComponent(fieldGoalName, <AchievementBadge badgeIcon={'anvil'} tier={'bronze'} />);
            }
            return null;
        default:
            return null;
    }
}

export function getHockeyAchievement(key: string, gameObj: any): JSX.Element | null {
    switch (key) {
        case "goals":
            const goals: number = gameObj['goals'];
            const goalsName = 'Scoring Machine';
            if (goals >= 3) {
                return getAchievmentBadgeComponent(goalsName, <AchievementBadge badgeIcon={'star'} tier={'gold'} />);
            }
            else if (goals > 2) {
                return getAchievmentBadgeComponent(goalsName, <AchievementBadge badgeIcon={'star'} tier={'silver'} />);
            }
            else if (goals > 1) {
                return getAchievmentBadgeComponent(goalsName, <AchievementBadge badgeIcon={'star'} tier={'bronze'} />);
            }
            return null;
        case "assists":
            const assists: number = gameObj['assists'];
            const assistBadgeName = 'Tunnel Vision';
            if (assists >= 3) {
                return getAchievmentBadgeComponent(assistBadgeName, <AchievementBadge badgeIcon={'eye'} tier={'gold'} />);
            }
            else if (assists >= 2) {
                return getAchievmentBadgeComponent(assistBadgeName, <AchievementBadge badgeIcon={'eye'} tier={'silver'} />);
            }
            else if (assists >= 1) {
                return getAchievmentBadgeComponent(assistBadgeName, <AchievementBadge badgeIcon={'eye'} tier={'bronze'} />);
            }
            return null;
        case "penaltyMinutes":
            const penaltyMinutes: number = gameObj['penaltyMinutes'];
            const penaltyMinutesBadgeName = 'Clean Player';
            if (penaltyMinutes === 0) {
                return getAchievmentBadgeComponent(penaltyMinutesBadgeName, <AchievementBadge badgeIcon={'angel-wings'} tier={'gold'} />);
            }
            return null;
        case "shortHandedGoals":
            const shortHandedGoals: number = gameObj['shortHandedGoals'];
            const shortHandedGoalsBadgeName = 'Underdog';
            if (shortHandedGoals >= 3) {
                return getAchievmentBadgeComponent(shortHandedGoalsBadgeName, <AchievementBadge badgeIcon={'reverse-arrows'} tier={'gold'} />);
            }
            else if (shortHandedGoals >= 2) {
                return getAchievmentBadgeComponent(shortHandedGoalsBadgeName, <AchievementBadge badgeIcon={'reverse-arrows'} tier={'silver'} />);
            }
            else if (shortHandedGoals >= 1) {
                return getAchievmentBadgeComponent(shortHandedGoalsBadgeName, <AchievementBadge badgeIcon={'reverse-arrows'} tier={'bronze'} />);
            }
            return null;
        case "overTimeGoals":
            const overTimeGoals: number = gameObj['overTimeGoals'];
            const overTimeGoalsBadgeName = 'Clutch';
            if (overTimeGoals >= 3) {
                return getAchievmentBadgeComponent(overTimeGoalsBadgeName, <AchievementBadge badgeIcon={'clock'} tier={'gold'} />);
            }
            else if (overTimeGoals >= 2) {
                return getAchievmentBadgeComponent(overTimeGoalsBadgeName, <AchievementBadge badgeIcon={'clock'} tier={'silver'} />);
            }
            else if (overTimeGoals >= 1) {
                return getAchievmentBadgeComponent(overTimeGoalsBadgeName, <AchievementBadge badgeIcon={'clock'} tier={'bronze'} />);
            }
            return null;
        case "saves":
            const saves: number = gameObj['saves'];
            const savesName = 'Savior';
            if (saves >= 3) {
                return getAchievmentBadgeComponent(savesName, <AchievementBadge badgeIcon={'angel-wings'} tier={'gold'} />);
            }
            else if (saves === 2) {
                return getAchievmentBadgeComponent(savesName, <AchievementBadge badgeIcon={'angel-wings'} tier={'silver'} />);
            }
            else if (saves === 1) {
                return getAchievmentBadgeComponent(savesName, <AchievementBadge badgeIcon={'angel-wings'} tier={'bronze'} />);
            }
            return null;
        case "faceoffWins":
            const faceoffWins: number = gameObj['faceoffWins'];
            const faceoffLosses: number = gameObj['faceoffLosses'];
            const faceoffPercentage = (faceoffWins / (faceoffWins + faceoffLosses)) * 100;
            const faceoffPercentageName = 'Duelist';
            if (faceoffPercentage >= 60) {
                return getAchievmentBadgeComponent(faceoffPercentageName, <AchievementBadge badgeIcon={'swords'} tier={'gold'} />);
            }
            else if (faceoffPercentage >= 55) {
                return getAchievmentBadgeComponent(faceoffPercentageName, <AchievementBadge badgeIcon={'swords'} tier={'silver'} />);
            }
            else if (faceoffPercentage >= 50) {
                return getAchievmentBadgeComponent(faceoffPercentageName, <AchievementBadge badgeIcon={'swords'} tier={'bronze'} />);
            }
            return null;
        default:
            return null;
    }
}

function getAchievmentBadgeComponent(achievementName: string, badgeIcon: JSX.Element): JSX.Element {
    return (
        <div className={styles.achievementBody}>
            <div className={classNames(styles.row)}>
                {badgeIcon}
            </div>
            <h2 className={styles.statLabel}>{achievementName}</h2>
        </div>
    );
}