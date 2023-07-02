import { AchievementBadge } from "@/src/components/achievement-badge/achievement-badge"

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
    const percentStats = new Set<{ statName: string, stat: number }>()
    const nonPercentStats = new Set<{ statName: string, stat: number }>()
    const statMap = new Map()
    const badges: { tier: 'bronze' | 'silver' | 'gold', badge: JSX.Element }[] = []

    await new Promise((res) => setTimeout(() => {res('1')}, 2000000))

    const processBasketballStat = (key: string, game: any) => {
        switch (key) {
            case "assists":
                const assists: number = game['assists'];
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
                const minutes: number = game['minutesPlayed'];
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
                const pointsScored: number = game['pointsScored'];
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
                const fgMade: number = game['fieldGoalsMade'];
                const fgMissed: number = game['fieldGoalsMissed'];
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
                const threesMade: number = game['threePointersMade'];
                const threesMissed: number = game['threePointersMissed'];
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
                const freesMade: number = game['freeThrowsMade'];
                const freesMissed: number = game['freeThrowsMissed'];
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
                const oRebounds: number = game['offensiveRebounds'];
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
                const dRebounds: number = game['defensiveRebounds'];
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
                const dunks: number = game['dunks'];
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
                const to: number = game['turnovers'];
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
                const steals: number = game['steals'];
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
                const blocks: number = game['blocks'];
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

    const processSoccerStat = (key: string, game: any) => {
        switch (key) {
            case "assists":
                const assists: number = game['assists'];
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
                const goals: number = game['goals'];
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
                const redCards: number = game['redCards'];
                const yellowCards: number = game['yellowCards'];
                const redCardsBadgeName = 'Clean Player';
                if (redCards === 0 && yellowCards === 0) {
                    return getAchievmentBadgeComponent(redCardsBadgeName, <AchievementBadge badgeIcon={'warning-card'} tier={'gold'} />);
                }
                else if (yellowCards === 1 && redCards === 0) {
                    return getAchievmentBadgeComponent(redCardsBadgeName, <AchievementBadge badgeIcon={'warning-card'} tier={'bronze'} />);
                }
                return null;
            case "shotsOnTarget":
                const shotsOnTarget = game['shotsOnTarget'];
                const shotsOffTarget = game['shotsOffTarget'];
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
                const tackles = game['tackles'];
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
                const blocks: number = game['blocks'];
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
                const to: number = game['turnovers'];
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
                const saves: number = game['saves'];
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
                const interceptions: number = game['interceptions'];
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

    const processFootballStat = (key: string, game: any) => {
        switch (key) {
            case "passesMade":
                const passesMade = game['passesMade'];
                const passesMissed = game['passesMissed'];
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
                const passingTouchDowns = game['passingTouchDowns'];
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
                const totalPassingYards = game['totalPassingYards'];
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
                const tackles = game['tackles'];
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
                const sacks = game['sacks'];
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
                const interceptions = game['interceptions'];
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
                const receptions = game['receptions'];
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
                const targets = game['targets'];
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
                const totalRecievingYards = game['totalRecievingYards'];
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
                const totalRushingYards = game['totalRushingYards'];
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
                const receivingTouchDowns: number = game['receivingTouchDowns'];
                const rushingTouchDowns: number = game['rushingTouchDowns'];
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
                const fieldGoalsMade: number = game['fieldGoalsMade'];
                const fieldGoalsMissed: number = game['fieldGoalsMissed'];
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

    const processHockeyStat = (key: string, game: any) => {
        switch (key) {
            case "goals":
                const goals: number = game['goals'];
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
                const assists: number = game['assists'];
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
                const penaltyMinutes: number = game['penaltyMinutes'];
                const penaltyMinutesBadgeName = 'Clean Player';
                if (penaltyMinutes === 0) {
                    return getAchievmentBadgeComponent(penaltyMinutesBadgeName, <AchievementBadge badgeIcon={'angel-wings'} tier={'gold'} />);
                }
                return null;
            case "shortHandedGoals":
                const shortHandedGoals: number = game['shortHandedGoals'];
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
                const overTimeGoals: number = game['overTimeGoals'];
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
                const saves: number = game['saves'];
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
                const faceoffWins: number = game['faceoffWins'];
                const faceoffLosses: number = game['faceoffLosses'];
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


    return (
        <div className="flex w-full h-full items-center justify-center p-10">
            <div className="grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-2 w-full h-full items-center justify-center">

            </div>
        </div>

    )

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

