import { AchievementBadge } from "@/src/components/achievement-badge/achievement-badge"
import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { IBasketballSeason } from "@/src/database/schemas/basketball-season-schema"
import { ISoccerSeason } from "@/src/database/schemas/soccer-season-schema"
import { IFootballSeason } from "@/src/database/schemas/football-season-schema"
import { IHockeySeason } from "@/src/database/schemas/hockey-season-schema"
import UserData from "@/src/database/schemas/user-schema"
import { ObjectId } from "mongodb"
import { IBasketBallGame } from "@/src/database/schemas/basketball-game-schema"
import { IFootballGame } from "@/src/database/schemas/football-game-schema"
import { IHockeyGame } from "@/src/database/schemas/hockey-game-schema"
import { ISoccerGame } from "@/src/database/schemas/soccer-game-schema"
import { camelCaseToTitleCase } from "@/src/utils/utils"


export const metadata = {
    title: 'Dashboard',
    generator: 'Next.js',
    applicationName: 'TrakIt',
    authors: [{ name: 'Junior' }],
    colorScheme: 'dark',
    creator: 'Junior Green',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
}

export default async function Dashboard() {
    const session = await getServerSession(authOptions)
    if (!session) {
        throw new Error('No user session')
    }
    const user = await UserData.findOne({ userId: new ObjectId(session.user.id) });
    if (!user || !user.selectedSport) {
        throw new Error('Invalid or missing user information');
    }

    const percentStats = new Set<string>([
        'fieldGoalsMade',
        'threePointersMade',
        'freeThrowsMade',
        'passesMade',
        'faceoffWins',
        'shotsOnTarget',
        'winrate'
    ])
    const nonPercentStats: Set<string> = new Set<string>([
        'assists',
        'dunks',
        'minutesPlayed',
        'pointsScored',
        'offensiveRebounds',
        'defensiveRebounds',
        'turnovers',
        'steals',
        'blocks',
        'personalFouls',
        'passingTouchDowns',
        'interceptedPasses',
        'totalPassingYards',
        'tackles',
        'sacks',
        'passesDefended',
        'interceptions',
        'hurries',
        'safeties',
        'receptions',
        'targets',
        'totalRecievingYards',
        'receivingTouchDowns',
        'drops',
        'carries',
        'totalRushingYards',
        'rushingTouchDowns',
        'fumbles',
        'kickoffs',
        'touchbacks',
        'goals',
        'penaltyMinutes',
        'powerPlayGoals',
        'shortHandedGoals',
        'overTimeGoals',
        'shotsTaken',
        'saves',
        'foulsCommitted',
        'redCards',
        'yellowCards',
        'offSides',
        'tackles',
        'blocks',
        'interceptions',
        'clearances',
    ])
    const statMap = new Map<string, number[]>()
    const badges: { tier: 'bronze' | 'silver' | 'gold', badge: JSX.Element }[] = []
    let seasons: IBasketballSeason[] | ISoccerSeason[] | IFootballSeason[] | IHockeySeason[] = []
    const games: (ISoccerGame | IBasketBallGame | IFootballGame | IHockeyGame)[] = []

    switch (user.selectedSport) {
        case 'basketball':
            seasons = user.basketballSeasons;
            break;
        case 'soccer':
            seasons = user.soccerSeasons;
            break;
        case 'football':
            seasons = user.footballSeasons;
            break;
        case 'hockey':
            seasons = user.hockeySeasons;
            break;
        default:
            seasons = []
    }

    seasons.forEach((season) => {
        season.games.forEach((game) => {
            const obj = game.toObject()
            // console.log(obj)
            delete obj.opponentTeam
            delete obj.opponentScore
            delete obj.teamScore
            delete obj.date
            delete obj._id
            delete obj.team

            games.push(game)

            Object.keys(obj).forEach((key) => {
                statMap.has(key) ? statMap.get(key)?.push(obj[key]) : statMap.set(key, [obj[key]])

                switch (user.selectedSport) {
                    case 'basketball':
                        processBasketballStat(key, obj)
                    case 'soccer':
                        processSoccerStat(key, obj)
                    case 'football':
                        processFootballStat(key, obj)
                    case 'hockey':
                        processHockeyStat(key, obj)
                }
            })
        })
    }
    )
    console.log(statMap)

    function processBasketballStat(key: string, game: any) {
        switch (key) {
            case "assists":
                const assists: number = game['assists'];
                const assistBadgeName = 'Dimer';
                if (assists >= 5) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(assistBadgeName, <AchievementBadge badgeIcon={'assist'} tier={'gold'} />) })
                }
                else if (assists >= 3) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(assistBadgeName, <AchievementBadge badgeIcon={'assist'} tier={'silver'} />) })
                }
                else if (assists >= 2) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(assistBadgeName, <AchievementBadge badgeIcon={'assist'} tier={'bronze'} />) })
                }
                return null;
            case "minutesPlayed":
                const minutes: number = game['minutesPlayed'];
                const minutesPlayedBadgeName = 'X-Factor';
                if (minutes > 25) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(minutesPlayedBadgeName, <AchievementBadge badgeIcon={'clock'} tier={'gold'} />) })
                }
                else if (minutes > 15) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(minutesPlayedBadgeName, <AchievementBadge badgeIcon={'clock'} tier={'silver'} />) })
                }
                else if (minutes > 10) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(minutesPlayedBadgeName, <AchievementBadge badgeIcon={'clock'} tier={'bronze'} />) })
                }
                return null;
            case "pointsScored":
                const pointsScored: number = game['pointsScored'];
                const pointsScoredBadgeName = 'Scoring Machine';
                if (pointsScored > 25) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(pointsScoredBadgeName, <AchievementBadge badgeIcon={'star'} tier={'gold'} />) })
                }
                else if (pointsScored > 15) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(pointsScoredBadgeName, <AchievementBadge badgeIcon={'star'} tier={'silver'} />) })
                }
                else if (pointsScored > 8) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(pointsScoredBadgeName, <AchievementBadge badgeIcon={'star'} tier={'bronze'} />) })
                }
                return null;
            case "fieldGoalsMade":
                const fgMade: number = game['fieldGoalsMade'];
                const fgMissed: number = game['fieldGoalsMissed'];
                const fgPercentage: number = (fgMade / (fgMade + fgMissed)) * 100;
                const fieldGoalsBadgeName = 'Deadeye';
                if (fgPercentage >= 60) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(fieldGoalsBadgeName, <AchievementBadge badgeIcon={'eye'} tier={'gold'} />) })
                }
                else if (fgPercentage >= 50) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(fieldGoalsBadgeName, <AchievementBadge badgeIcon={'eye'} tier={'silver'} />) })
                }
                else if (fgPercentage >= 40) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(fieldGoalsBadgeName, <AchievementBadge badgeIcon={'eye'} tier={'bronze'} />) })
                }
                return null;
            case "threePointersMade":
                const threesMade: number = game['threePointersMade'];
                const threesMissed: number = game['threePointersMissed'];
                const threePercentage: number = (threesMade / (threesMade + threesMissed)) * 100;
                const threesBadgeName = 'Sniper';
                if (threePercentage >= 40) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(threesBadgeName, <AchievementBadge badgeIcon={'target'} tier={'gold'} />) })
                }
                else if (threePercentage >= 35) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(threesBadgeName, <AchievementBadge badgeIcon={'target'} tier={'silver'} />) })
                }
                else if (threePercentage >= 30) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(threesBadgeName, <AchievementBadge badgeIcon={'target'} tier={'bronze'} />) })
                }
                return null;
            case "freeThrowsMade":
                const freesMade: number = game['freeThrowsMade'];
                const freesMissed: number = game['freeThrowsMissed'];
                const freePercentage: number = (freesMade / (freesMade + freesMissed)) * 100;
                const freeBadgeName = 'Free Throw Ace';
                if (freePercentage >= 80) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(freeBadgeName, <AchievementBadge badgeIcon={'target'} tier={'gold'} />) })
                }
                else if (freePercentage >= 75) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(freeBadgeName, <AchievementBadge badgeIcon={'target'} tier={'silver'} />) })
                }
                else if (freePercentage >= 70) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(freeBadgeName, <AchievementBadge badgeIcon={'target'} tier={'bronze'} />) })
                }
                return null;
            case "offensiveRebounds":
                const oRebounds: number = game['offensiveRebounds'];
                const offensiveReboundName = 'Glass Crasher';
                if (oRebounds >= 5) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(offensiveReboundName, <AchievementBadge badgeIcon={'block'} tier={'gold'} />) })
                }
                else if (oRebounds >= 3) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(offensiveReboundName, <AchievementBadge badgeIcon={'block'} tier={'silver'} />) })
                }
                else if (oRebounds >= 1) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(offensiveReboundName, <AchievementBadge badgeIcon={'block'} tier={'bronze'} />) })
                }
                return null;
            case "defensiveRebounds":
                const dRebounds: number = game['defensiveRebounds'];
                const defensiveReboundName = 'Rim Protector';
                if (dRebounds >= 5) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(defensiveReboundName, <AchievementBadge badgeIcon={'block'} tier={'gold'} />) })
                }
                else if (dRebounds >= 3) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(defensiveReboundName, <AchievementBadge badgeIcon={'block'} tier={'silver'} />) })
                }
                else if (dRebounds >= 1) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(defensiveReboundName, <AchievementBadge badgeIcon={'block'} tier={'bronze'} />) })
                }
                return null;
            case "dunks":
                const dunks: number = game['dunks'];
                const dunksName = 'Acrobatic';
                if (dunks >= 5) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(dunksName, <AchievementBadge badgeIcon={'dunk-ball'} tier={'gold'} />) })
                }
                else if (dunks >= 3) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(dunksName, <AchievementBadge badgeIcon={'dunk-ball'} tier={'silver'} />) })
                }
                else if (dunks >= 2) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(dunksName, <AchievementBadge badgeIcon={'dunk-ball'} tier={'bronze'} />) })
                }
                return null;
            case "turnovers":
                const to: number = game['turnovers'];
                const toName = 'Sticky Fingers';
                if (to === 0) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(toName, <AchievementBadge badgeIcon={'slime'} tier={'gold'} />) })
                }
                else if (to === 1) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(toName, <AchievementBadge badgeIcon={'slime'} tier={'silver'} />) })
                }
                else if (to === 2) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(toName, <AchievementBadge badgeIcon={'slime'} tier={'bronze'} />) })
                }
                return null;
            case "steals":
                const steals: number = game['steals'];
                const stealsName = 'Pickpocketer';
                if (steals >= 5) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(stealsName, <AchievementBadge badgeIcon={'coins'} tier={'gold'} />) })
                }
                else if (steals >= 3) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(stealsName, <AchievementBadge badgeIcon={'coins'} tier={'silver'} />) })
                }
                else if (steals >= 2) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(stealsName, <AchievementBadge badgeIcon={'coins'} tier={'bronze'} />) })
                }
                return null;
            case "blocks":
                const blocks: number = game['blocks'];
                const blocksName = 'Brick Wall';
                if (blocks >= 3) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(blocksName, <AchievementBadge badgeIcon={'brick-wall'} tier={'gold'} />) })
                }
                else if (blocks >= 2) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(blocksName, <AchievementBadge badgeIcon={'brick-wall'} tier={'silver'} />) })
                }
                else if (blocks >= 1) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(blocksName, <AchievementBadge badgeIcon={'brick-wall'} tier={'bronze'} />) })
                }
                return null;
            default:
                return null;
        }
    }

    function processSoccerStat(key: string, game: any) {
        switch (key) {
            case "assists":
                const assists: number = game['assists'];
                const assistBadgeName = 'Tunnel Vision';
                if (assists >= 3) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(assistBadgeName, <AchievementBadge badgeIcon={'eye'} tier={'gold'} />) })
                }
                else if (assists >= 2) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(assistBadgeName, <AchievementBadge badgeIcon={'eye'} tier={'silver'} />) })
                }
                else if (assists >= 1) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(assistBadgeName, <AchievementBadge badgeIcon={'eye'} tier={'bronze'} />) })
                }
                return null;
            case "goals":
                const goals: number = game['goals'];
                const goalsBadgeName = 'Scoring Machine';
                if (goals >= 3) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(goalsBadgeName, <AchievementBadge badgeIcon={'star'} tier={'gold'} />) })
                }
                else if (goals >= 2) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(goalsBadgeName, <AchievementBadge badgeIcon={'star'} tier={'silver'} />) })
                }
                else if (goals >= 1) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(goalsBadgeName, <AchievementBadge badgeIcon={'star'} tier={'bronze'} />) })
                }
                return null;
            case "redCards":
                const redCards: number = game['redCards'];
                const yellowCards: number = game['yellowCards'];
                const redCardsBadgeName = 'Clean Player';
                if (redCards === 0 && yellowCards === 0) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(redCardsBadgeName, <AchievementBadge badgeIcon={'warning-card'} tier={'gold'} />) })
                }
                else if (yellowCards === 1 && redCards === 0) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(redCardsBadgeName, <AchievementBadge badgeIcon={'warning-card'} tier={'bronze'} />) })
                }
                return null;
            case "shotsOnTarget":
                const shotsOnTarget = game['shotsOnTarget'];
                const shotsOffTarget = game['shotsOffTarget'];
                const shotAccuracy = (shotsOnTarget / (shotsOnTarget + shotsOffTarget)) * 100;
                const shotAccuracyBadgeName = 'Sniper';
                if (shotAccuracy >= 60) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(shotAccuracyBadgeName, <AchievementBadge badgeIcon={'target'} tier={'gold'} />) })
                }
                else if (shotAccuracy >= 50) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(shotAccuracyBadgeName, <AchievementBadge badgeIcon={'target'} tier={'silver'} />) })
                }
                else if (shotAccuracy >= 45) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(shotAccuracyBadgeName, <AchievementBadge badgeIcon={'target'} tier={'bronze'} />) })
                }
            case "tackles":
                const tackles = game['tackles'];
                const tacklesBadgeName = 'Penguin';
                if (tackles >= 4) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(tacklesBadgeName, <AchievementBadge badgeIcon={'penguin'} tier={'gold'} />) })
                }
                else if (tackles >= 3) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(tacklesBadgeName, <AchievementBadge badgeIcon={'penguin'} tier={'silver'} />) })
                }
                else if (tackles >= 2) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(tacklesBadgeName, <AchievementBadge badgeIcon={'penguin'} tier={'bronze'} />) })
                }
                return null;
            case "blocks":
                const blocks: number = game['blocks'];
                const blocksName = 'Brick Wall';
                if (blocks >= 3) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(blocksName, <AchievementBadge badgeIcon={'brick-wall'} tier={'gold'} />) })
                }
                else if (blocks >= 2) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(blocksName, <AchievementBadge badgeIcon={'brick-wall'} tier={'silver'} />) })
                }
                else if (blocks >= 1) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(blocksName, <AchievementBadge badgeIcon={'brick-wall'} tier={'bronze'} />) })
                }
                return null;
            case "turnovers":
                const to: number = game['turnovers'];
                const toName = 'Sticky Feet';
                if (to === 0) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(toName, <AchievementBadge badgeIcon={'brick-wall'} tier={'gold'} />) })
                }
                else if (to === 1) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(toName, <AchievementBadge badgeIcon={'brick-wall'} tier={'silver'} />) })
                }
                else if (to === 2) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(toName, <AchievementBadge badgeIcon={'brick-wall'} tier={'bronze'} />) })
                }
                return null;
            case "saves":
                const saves: number = game['saves'];
                const savesName = 'Savior';
                if (saves >= 3) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(savesName, <AchievementBadge badgeIcon={'angel-wings'} tier={'gold'} />) })
                }
                else if (saves === 2) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(savesName, <AchievementBadge badgeIcon={'angel-wings'} tier={'silver'} />) })
                }
                else if (saves === 1) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(savesName, <AchievementBadge badgeIcon={'angel-wings'} tier={'bronze'} />) })
                }
                return null;
            case "interceptions":
                const interceptions: number = game['interceptions'];
                const interceptionsName = 'Ninja';
                if (interceptions >= 3) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(interceptionsName, <AchievementBadge badgeIcon={'ninja'} tier={'gold'} />) })
                }
                else if (interceptions === 2) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(interceptionsName, <AchievementBadge badgeIcon={'ninja'} tier={'silver'} />) })
                }
                else if (interceptions === 1) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(interceptionsName, <AchievementBadge badgeIcon={'ninja'} tier={'bronze'} />) })
                }
                return null;
            default:
                return <></>;
        }
    }

    function processFootballStat(key: string, game: any) {
        switch (key) {
            case "passesMade":
                const passesMade = game['passesMade'];
                const passesMissed = game['passesMissed'];
                const passAccuracy = (passesMade / (passesMissed + passesMade)) * 100;
                const shotAccuracyBadgeName = 'Sniper';
                if (passAccuracy >= 0.70) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(shotAccuracyBadgeName, <AchievementBadge badgeIcon={'target'} tier={'gold'} />) })
                }
                else if (passAccuracy >= 0.60) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(shotAccuracyBadgeName, <AchievementBadge badgeIcon={'target'} tier={'silver'} />) })
                }
                else if (passAccuracy >= 0.5) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(shotAccuracyBadgeName, <AchievementBadge badgeIcon={'target'} tier={'bronze'} />) })
                }
                return null;
            case "passingTouchDowns":
                const passingTouchDowns = game['passingTouchDowns'];
                const passingTouchDownsName = 'Tunnel Vision';
                if (passingTouchDowns >= 3) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(passingTouchDownsName, <AchievementBadge badgeIcon={'eye'} tier={'gold'} />) })
                }
                else if (passingTouchDowns >= 2) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(passingTouchDownsName, <AchievementBadge badgeIcon={'eye'} tier={'silver'} />) })
                }
                else if (passingTouchDowns >= 1) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(passingTouchDownsName, <AchievementBadge badgeIcon={'eye'} tier={'bronze'} />) })
                }
                return null;
            case "totalPassingYards":
                const totalPassingYards = game['totalPassingYards'];
                const totalPassingYardsName = 'Strong Arm';
                if (totalPassingYards >= 200) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(totalPassingYardsName, <AchievementBadge badgeIcon={'arm'} tier={'gold'} />) })
                }
                else if (totalPassingYards >= 100) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(totalPassingYardsName, <AchievementBadge badgeIcon={'arm'} tier={'silver'} />) })
                }
                else if (totalPassingYards >= 50) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(totalPassingYardsName, <AchievementBadge badgeIcon={'arm'} tier={'bronze'} />) })
                }
                return null;
            case "tackles":
                const tackles = game['tackles'];
                const tacklesBadgeName = 'Brick Wall';
                if (tackles >= 4) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(tacklesBadgeName, <AchievementBadge badgeIcon={'brick-wall'} tier={'gold'} />) })
                }
                else if (tackles >= 3) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(tacklesBadgeName, <AchievementBadge badgeIcon={'brick-wall'} tier={'silver'} />) })
                }
                else if (tackles >= 2) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(tacklesBadgeName, <AchievementBadge badgeIcon={'brick-wall'} tier={'bronze'} />) })
                }
                return null;
            case "sacks":
                const sacks = game['sacks'];
                const sacksBadgeName = 'Slicky';
                if (sacks >= 3) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(sacksBadgeName, <AchievementBadge badgeIcon={'bug'} tier={'gold'} />) })
                }
                else if (sacks >= 2) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(sacksBadgeName, <AchievementBadge badgeIcon={'bug'} tier={'silver'} />) })
                }
                else if (sacks >= 1) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(sacksBadgeName, <AchievementBadge badgeIcon={'bug'} tier={'bronze'} />) })
                }
                return null;
            case "interceptions":
                const interceptions = game['interceptions'];
                const interceptionsBadgeName = 'Ninja';
                if (interceptions >= 3) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(interceptionsBadgeName, <AchievementBadge badgeIcon={'ninja'} tier={'gold'} />) })
                }
                else if (interceptions >= 2) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(interceptionsBadgeName, <AchievementBadge badgeIcon={'ninja'} tier={'silver'} />) })
                }
                else if (interceptions >= 1) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(interceptionsBadgeName, <AchievementBadge badgeIcon={'ninja'} tier={'bronze'} />) })
                }
                return null;
            case "receptions":
                const receptions = game['receptions'];
                const receptionsBadgeName = 'Sticky Fingers';
                if (receptions >= 5) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(receptionsBadgeName, <AchievementBadge badgeIcon={'slime'} tier={'gold'} />) })
                }
                else if (receptions >= 3) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(receptionsBadgeName, <AchievementBadge badgeIcon={'slime'} tier={'silver'} />) })
                }
                else if (receptions >= 2) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(receptionsBadgeName, <AchievementBadge badgeIcon={'slime'} tier={'bronze'} />) })
                }
                return null;
            case "targets":
                const targets = game['targets'];
                const targetsBadgeName = 'Reliable Catcher';
                if (targets >= 8) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(targetsBadgeName, <AchievementBadge badgeIcon={'catch-football'} tier={'gold'} />) })
                }
                else if (targets >= 5) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(targetsBadgeName, <AchievementBadge badgeIcon={'catch-football'} tier={'silver'} />) })
                }
                else if (targets >= 3) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(targetsBadgeName, <AchievementBadge badgeIcon={'catch-football'} tier={'bronze'} />) })
                }
                return null;
            case "totalRecievingYards":
                const totalRecievingYards = game['totalRecievingYards'];
                const totalRecievingYardsBadgeName = 'Distant Catcher';
                if (totalRecievingYards >= 45) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(totalRecievingYardsBadgeName, <AchievementBadge badgeIcon={'measuring-tape'} tier={'gold'} />) })
                }
                else if (totalRecievingYards >= 30) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(totalRecievingYardsBadgeName, <AchievementBadge badgeIcon={'measuring-tape'} tier={'silver'} />) })
                }
                else if (totalRecievingYards >= 10) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(totalRecievingYardsBadgeName, <AchievementBadge badgeIcon={'measuring-tape'} tier={'bronze'} />) })
                }
                return null;
            case "totalRushingYards":
                const totalRushingYards = game['totalRushingYards'];
                const totalRushingYardsBadgeName = 'Track Star';
                if (totalRushingYards >= 50) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(totalRushingYardsBadgeName, <AchievementBadge badgeIcon={'star'} tier={'gold'} />) })
                }
                else if (totalRushingYards >= 30) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(totalRushingYardsBadgeName, <AchievementBadge badgeIcon={'star'} tier={'silver'} />) })
                }
                else if (totalRushingYards >= 10) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(totalRushingYardsBadgeName, <AchievementBadge badgeIcon={'star'} tier={'bronze'} />) })
                }
                return null;
            case "receivingTouchDowns":
                const receivingTouchDowns: number = game['receivingTouchDowns'];
                const rushingTouchDowns: number = game['rushingTouchDowns'];
                const totalTouchDowns: number = receivingTouchDowns + rushingTouchDowns;
                const totalTouchDownsName: string = "Juggernuat";

                if (totalTouchDowns >= 3) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(totalTouchDownsName, <AchievementBadge badgeIcon={'gas-mask'} tier={'gold'} />) })
                }
                else if (totalTouchDowns >= 2) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(totalTouchDownsName, <AchievementBadge badgeIcon={'gas-mask'} tier={'silver'} />) })
                }
                else if (totalTouchDowns >= 1) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(totalTouchDownsName, <AchievementBadge badgeIcon={'gas-mask'} tier={'bronze'} />) })
                }
                return null;
            case "fieldGoalsMade":
                const fieldGoalsMade: number = game['fieldGoalsMade'];
                const fieldGoalsMissed: number = game['fieldGoalsMissed'];
                const fieldAGoalAccuracy = (fieldGoalsMade / (fieldGoalsMade + fieldGoalsMissed)) * 100;
                const fieldGoalName: string = "Steel Toe";

                if (fieldAGoalAccuracy >= 80) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(fieldGoalName, <AchievementBadge badgeIcon={'anvil'} tier={'gold'} />) })
                }
                else if (fieldAGoalAccuracy >= 70) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(fieldGoalName, <AchievementBadge badgeIcon={'anvil'} tier={'silver'} />) })
                }
                else if (fieldAGoalAccuracy >= 60) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(fieldGoalName, <AchievementBadge badgeIcon={'anvil'} tier={'bronze'} />) })
                }
                return null;
            default:
                return null;
        }
    }

    function processHockeyStat(key: string, game: any) {
        switch (key) {
            case "goals":
                const goals: number = game['goals'];
                const goalsName = 'Scoring Machine';
                if (goals >= 3) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(goalsName, <AchievementBadge badgeIcon={'star'} tier={'gold'} />) })
                }
                else if (goals > 2) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(goalsName, <AchievementBadge badgeIcon={'star'} tier={'silver'} />) })
                }
                else if (goals > 1) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(goalsName, <AchievementBadge badgeIcon={'star'} tier={'bronze'} />) })
                }
                return null;
            case "assists":
                const assists: number = game['assists'];
                const assistBadgeName = 'Tunnel Vision';
                if (assists >= 3) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(assistBadgeName, <AchievementBadge badgeIcon={'eye'} tier={'gold'} />) })
                }
                else if (assists >= 2) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(assistBadgeName, <AchievementBadge badgeIcon={'eye'} tier={'silver'} />) })
                }
                else if (assists >= 1) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(assistBadgeName, <AchievementBadge badgeIcon={'eye'} tier={'bronze'} />) })
                }
                return null;
            case "penaltyMinutes":
                const penaltyMinutes: number = game['penaltyMinutes'];
                const penaltyMinutesBadgeName = 'Clean Player';
                if (penaltyMinutes === 0) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(penaltyMinutesBadgeName, <AchievementBadge badgeIcon={'angel-wings'} tier={'gold'} />) })
                }
                return null;
            case "shortHandedGoals":
                const shortHandedGoals: number = game['shortHandedGoals'];
                const shortHandedGoalsBadgeName = 'Underdog';
                if (shortHandedGoals >= 3) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(shortHandedGoalsBadgeName, <AchievementBadge badgeIcon={'reverse-arrows'} tier={'gold'} />) })
                }
                else if (shortHandedGoals >= 2) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(shortHandedGoalsBadgeName, <AchievementBadge badgeIcon={'reverse-arrows'} tier={'silver'} />) })
                }
                else if (shortHandedGoals >= 1) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(shortHandedGoalsBadgeName, <AchievementBadge badgeIcon={'reverse-arrows'} tier={'bronze'} />) })
                }
                return null;
            case "overTimeGoals":
                const overTimeGoals: number = game['overTimeGoals'];
                const overTimeGoalsBadgeName = 'Clutch';
                if (overTimeGoals >= 3) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(overTimeGoalsBadgeName, <AchievementBadge badgeIcon={'clock'} tier={'gold'} />) })
                }
                else if (overTimeGoals >= 2) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(overTimeGoalsBadgeName, <AchievementBadge badgeIcon={'clock'} tier={'silver'} />) })
                }
                else if (overTimeGoals >= 1) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(overTimeGoalsBadgeName, <AchievementBadge badgeIcon={'clock'} tier={'bronze'} />) })
                }
                return null;
            case "saves":
                const saves: number = game['saves'];
                const savesName = 'Savior';
                if (saves >= 3) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(savesName, <AchievementBadge badgeIcon={'angel-wings'} tier={'gold'} />) })
                }
                else if (saves === 2) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(savesName, <AchievementBadge badgeIcon={'angel-wings'} tier={'silver'} />) })
                }
                else if (saves === 1) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(savesName, <AchievementBadge badgeIcon={'angel-wings'} tier={'bronze'} />) })
                }
                return null;
            case "faceoffWins":
                const faceoffWins: number = game['faceoffWins'];
                const faceoffLosses: number = game['faceoffLosses'];
                const faceoffPercentage = (faceoffWins / (faceoffWins + faceoffLosses)) * 100;
                const faceoffPercentageName = 'Duelist';
                if (faceoffPercentage >= 60) {
                    badges.push({ tier: 'gold', badge: getAchievmentBadgeComponent(faceoffPercentageName, <AchievementBadge badgeIcon={'swords'} tier={'gold'} />) })
                }
                else if (faceoffPercentage >= 55) {
                    badges.push({ tier: 'silver', badge: getAchievmentBadgeComponent(faceoffPercentageName, <AchievementBadge badgeIcon={'swords'} tier={'silver'} />) })
                }
                else if (faceoffPercentage >= 50) {
                    badges.push({ tier: 'bronze', badge: getAchievmentBadgeComponent(faceoffPercentageName, <AchievementBadge badgeIcon={'swords'} tier={'bronze'} />) })
                }
                return null;
            default:
                return null;
        }
    }

    function getNonPercentStatName(): string | undefined {
        const stats: string[] = Array.from(nonPercentStats)
        let statName: string = ""

        while (true) {
            if (games.length === 0 || stats.length === 0)
                break
            const index = Math.floor(Math.random() * stats.length)
            const stat = stats[index]
            if (Object.keys(games[0].toObject()).includes(stat)) {
                statName = stat
                nonPercentStats.delete(statName)
                break
            }
            stats.splice(index, 1)
        }

        return statName === "" ? undefined : statName
    }

    function getPercentStatName(): string | undefined {
        const stats: string[] = Array.from(percentStats)
        let statName: string = ""

        while (true) {
            if (games.length === 0 || stats.length === 0)
                break
            const index = Math.floor(Math.random() * stats.length)
            const stat = stats[index]
            if (Object.keys(games[0].toObject()).includes(stat)) {
                statName = stat
                percentStats.delete(statName)
                break
            }
            stats.splice(index, 1)
        }

        return statName === "" ? undefined : statName
    }

    function oneByOne(): JSX.Element {
        const statName = getNonPercentStatName()

        if (!statName) {
            throw new Error('No valid fields')
        }


        const nums = statMap.get(statName)
        if (!nums) {
            throw new Error('Invalid field')
        }

        const avg1 = calculateNonPercentAverage(nums)
        nums.pop()
        const avg2 = calculateNonPercentAverage(nums)

        let fontColor: string = ""

        if (avg1 > avg2) {
            fontColor = "text-green-500"
        }
        else if (avg1 < avg2) {
            fontColor = "text-red-600"
        }
        else {
            fontColor = "text-white"
        }


        return (games.length === 0 || statName === '') ?
            (
                <div className="w-full h-full rounded-xl bg-trakit-500 flex flex-col place-items-start p-3 shadow-lg">
                    <span className="text-trakit-100 font-semibold text-sm">No Data</span>
                </div>
            )
            : (
                <div className="w-full h-full rounded-xl bg-trakit-500 flex flex-col place-items-start p-3 shadow-lg">
                    <span className="text-trakit-100 font-semibold text-sm">{camelCaseToTitleCase(statName)}</span>
                    <div className="flex flex-col w-full h-5/6 items-center justify-center">
                        <span className={`${fontColor} text-3xl font-semibold`}>{avg1}</span>
                    </div>
                </div>
            )


    }

    function twoByTwoLineGraph(): JSX.Element {
        let statName = getNonPercentStatName()

        if (!statName) {
            statName = getPercentStatName()
        }

        if (!statName) {
            throw new Error("Invalid field")
        }


        const nums = statMap.get(statName)
        if (!nums) {
            throw new Error('Invalid field')
        }

        return (
            <div className="w-full h-full rounded-xl bg-trakit-500 flex flex-col place-items-start p-3 col-span-2 row-span-2">
                <span className="text-trakit-100 font-semibold text-sm">{camelCaseToTitleCase(statName)}</span>
                <div className="flex flex-col w-full h-5/6 items-center justify-center">

                </div>
            </div>
        )
    }

    return (
        <div className="flex w-full h-full items-center justify-center p-10 animate-fade">
            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 lg:grid-rows-5  w-full h-full items-start justify-center gap-5 place-items-center overflow-scroll">
                {oneByOne()}
                {oneByOne()}
                {oneByOne()}
                {oneByOne()}
                {oneByOne()}
                {/* <Skeleton variant="rounded" width={"100%"} height={"100%"} />
                <Skeleton variant="rounded" width={"100%"} height={"100%"} />
                <Skeleton variant="rounded" width={"100%"} height={"100%"} />
                <Skeleton variant="rounded" width={"100%"} height={"100%"} />
                <Skeleton variant="rounded" width={"100%"} height={"100%"} />
                <Skeleton className="col-span-2 row-span-2" variant="rounded" width={"100%"} height={"100%"} />
                <Skeleton className="row-span-2" variant="rounded" width={"100%"} height={"100%"} />
                <Skeleton className="col-span-2 row-span-2" variant="rounded" width={"100%"} height={"100%"} />
                <Skeleton className="col-span-2 row-span-2" variant="rounded" width={"100%"} height={"100%"} />
                <Skeleton className="col-span-3 row-span-2" variant="rounded" width={"100%"} height={"100%"} /> */}
            </div>
        </div>
    );
}

function getAchievmentBadgeComponent(achievementName: string, badgeIcon: JSX.Element): JSX.Element {
    return (
        <div className="">
            <div className="">
                {badgeIcon}
            </div>
            <h2 className="">{achievementName}</h2>
        </div>
    );
}

function calculateNonPercentAverage(array: number[]): number {
    if (array.length === 0) {
        return 0
    }

    const total: number = array.reduce((prev, curr) => prev + curr)
    return Math.round(total / array.length * 10) / 10
}