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
import {camelCaseToTitleCase} from "@/src/utils";
import classNames from "classnames";
import {AchievementBadge} from "@/src/components/achievement-badge/achievement-badge";
import {DeleteGameButton} from "@/src/components/delete-game-button/delete-game-button";

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
    gameObj.interceptions = 4;
    delete gameObj.date;
    delete gameObj._id;
    delete gameObj.opponentTeam;
    delete gameObj.teamScore;
    delete gameObj.opponentScore;

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.scoreContainer}>
                    <h2 className={styles.teamLabel}>My Team</h2>
                    <h1 className={styles.scoreLabel}>{game.teamScore}</h1>
                </div>
                <span style={{fontSize: "1.5vmax", fontWeight: 600, color: "rgb(140, 113, 244)"}}>FINAL</span>
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
                                <span style={{fontSize: "2vmax"}}>{formatDate(new Date(game.date))}</span>
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
            <hr className={styles.roundedDivider} />
            <div className={styles.achievementContainer}>
                {
                    Object.keys(gameObj).map((key) => {
                        if (user.selectedSport === "basketball") {
                            return getBasketballAchievement(key);
                        }
                        else if (user.selectedSport === "football") {
                            return getFootballAchievement(key);
                        }
                        else if (user.selectedSport === "hockey") {
                            return getHockeyAchievement(key);
                        }
                        else {
                            return getSoccerAchievement(key);
                        }
                    })
                }
            </div>
            <div className={styles.footer}>
                <DeleteGameButton id={String(game._id)} />
            </div>
        </div>
    );

    function getBasketballAchievement(key: string): JSX.Element | null {
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

    function getSoccerAchievement(key: string): JSX.Element | null {
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
                const shotAccuracy = shotsOnTarget / ((shotsOnTarget + shotsOffTarget)) * 100;
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

    function getFootballAchievement(key: string): JSX.Element | null {
        switch (key) {
            case "assists":

                break;
            default:
                return <></>;
        }
        return null;
    }

    function getHockeyAchievement(key: string): JSX.Element | null {
        switch (key) {
            case "assists":

                break;
            default:
                return <></>;
        }
        return null;
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
        };

        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
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
}