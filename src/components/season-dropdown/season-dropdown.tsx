import { IBasketballSeason } from "@/src/database/schemas/basketball-season-schema"
import { IFootballSeason } from "@/src/database/schemas/football-season-schema"
import { IHockeySeason } from "@/src/database/schemas/hockey-season-schema"
import { ISoccerSeason } from "@/src/database/schemas/soccer-season-schema"
import { Alert } from "@mui/material"
import styles from "./SeasonDropdown.module.css"
import { useState } from "react"
import { IBasketBallGame } from "@/src/database/schemas/basketball-game-schema"
import { IFootballGame } from "@/src/database/schemas/football-game-schema"
import { IHockeyGame } from "@/src/database/schemas/hockey-game-schema"
import { ISoccerGame } from "@/src/database/schemas/soccer-game-schema"
import { CancelIcon } from "../svgs"

type SeasonDropdownProps = {
    season: IBasketballSeason | ISoccerSeason | IFootballSeason | IHockeySeason,
    deleteSeason: (id: string) => void
}

export const SeasonDropdown = ({ season, deleteSeason }: SeasonDropdownProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true)

    return (
        <div className={styles.root}>
            <div className={styles.seasonPanelBody} onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
                <div className={styles.topContainer}>
                    <div className={styles.mainTextContainer}>
                        <h1>{getSeasonTitle(season.games)}</h1>
                        <h2>{season.games.length !== 0 && `${season.games.length} game${season.games.length === 1 ? "" : "s"}`}</h2>
                    </div>
                    <button className={styles.cancelButton} onClick={() => deleteSeason(season._id)}>
                        <CancelIcon className={styles.cancelIcon} />
                    </button>
                </div>


            </div>
            {
                !isCollapsed && season.games.map((game) =>
                    <div className={styles.gamePanelBody}>

                    </div>
                )
            }
        </div >
    )

    function getSeasonTitle(games: IBasketBallGame[] | ISoccerGame[] | IFootballGame[] | IHockeyGame[]): string {   
        if (games.length === 0) {
            return "No Games Recorded"
        }

        let title = ""
        const firstDay = games.at(0)?.date
        if (!firstDay){
            return ""
        }
        

        return ""
    }
}