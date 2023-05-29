import { IBasketballSeason } from "@/src/database/schemas/basketball-season-schema"
import { IFootballSeason } from "@/src/database/schemas/football-season-schema"
import { IHockeySeason } from "@/src/database/schemas/hockey-season-schema"
import { ISoccerSeason } from "@/src/database/schemas/soccer-season-schema"
import styles from "./SeasonDropdown.module.css"
import { useState } from "react"
import { IBasketBallGame } from "@/src/database/schemas/basketball-game-schema"
import { IFootballGame } from "@/src/database/schemas/football-game-schema"
import { IHockeyGame } from "@/src/database/schemas/hockey-game-schema"
import { ISoccerGame } from "@/src/database/schemas/soccer-game-schema"
import { CancelIcon, DownArrowIcon } from "../svgs"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

type SeasonDropdownProps = {
    season: IBasketballSeason | ISoccerSeason | IFootballSeason | IHockeySeason,
    deleteSeason: (id: string) => void
}

export const SeasonDropdown = ({ season, deleteSeason }: SeasonDropdownProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const session = useSession()
    const router = useRouter()

    return (
        <div className={styles.root}>
            <div className={styles.seasonPanelBody + ((!isCollapsed) ? " " + styles.selected : "")} onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
                <div className={styles.topContainer}>
                    <div className={styles.mainTextContainer}>
                        <h1>{getSeasonTitle(season.games)}</h1>
                        <h2>{season.games.length !== 0 && `${season.games.length} game${season.games.length === 1 ? "" : "s"}`}</h2>
                    </div>
                    <button className={styles.cancelButton} onClick={() => deleteSeason(season._id)}>
                        <CancelIcon className={styles.cancelIcon} />
                    </button>
                </div>
                <DownArrowIcon className={styles.downArrowIcon} />
            </div>
            {
                !isCollapsed && season.games.map((game) =>
                    <div className={styles.gamePanelBody} onClick={() => {
                        goToGameSummary(game.id);
                    }}>
                        <div className={styles.mainTextContainer}>
                            <h1>{`vs ${game.opponentTeam}`}</h1>
                            <h2>{`${game.teamScore} - ${game.opponentScore}`}</h2>
                        </div>
                        <div className={styles.resultLabelContainer}>
                            <span className={getResultLabelClassName(game.teamScore, game.opponentScore)}>{getResultLabel(game.teamScore, game.opponentScore)}</span>
                        </div>
                    </div>
                )
            }
        </div >
    )

    function goToGameSummary(id: any) {
        router.push(`home/seasons/games/${id}`)
    }

    function getResultLabel(teamScore: number, opponentScore: number): string {
        if (teamScore > opponentScore) return 'W'
        else if (opponentScore > teamScore) return 'L'
        else return 'T'
    }

    function getResultLabelClassName(teamScore: number, opponentScore: number): string {
        if (teamScore > opponentScore) return styles.winText
        else if (opponentScore > teamScore) return styles.loseText
        else return styles.tieText
    }

    function getSeasonTitle(games: IBasketBallGame[] | ISoccerGame[] | IFootballGame[] | IHockeyGame[]): string {
        const months: any = {
            0: "Jan",
            1: "Feb",
            2: "Mar",
            3: "Apr",
            4: "May",
            5: "Jun",
            6: "Jul",
            7: "Aug",
            8: "Sep",
            9: "Oct",
            10: "Nov",
            11: "Dec"
        }

        if (games.length === 0) {
            return "No Games Recorded"
        }

        const firstGame = games.at(0)?.date
        if (!firstGame) {
            throw new Error("Error parsing game data")
        }
        const firstDate = new Date(firstGame)
        console.log(firstDate.getMonth())
        const lastGame = games.at(-1)!.date;
        const lastDate = new Date(lastGame)

        return `${months[firstDate.getMonth()]} ${firstDate.getFullYear()} - ${months[lastDate.getMonth()]} ${lastDate.getFullYear()}`
    }
}