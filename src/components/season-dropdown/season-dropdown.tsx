import { IBasketballSeason } from "@/src/database/schemas/basketball-season-schema"
import { IFootballSeason } from "@/src/database/schemas/football-season-schema"
import { IHockeySeason } from "@/src/database/schemas/hockey-season-schema"
import { ISoccerSeason } from "@/src/database/schemas/soccer-season-schema"
import { Alert } from "@mui/material"
import styles from "./SeasonDropdown.module.css"
import { useState } from "react"

type SeasonDropdownProps = {
    season: IBasketballSeason | ISoccerSeason | IFootballSeason | IHockeySeason
}

export const SeasonDropdown = ({ season }: SeasonDropdownProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true)
    return (
        <div className={styles.root}>
            <div className={styles.panelBody}>
                <span>Start New Season + </span>
            </div>
            {!isCollapsed && season.games.map((game) =>
                <div className={styles.panelBody}>

                </div>
            )}
        </div>


    )
}