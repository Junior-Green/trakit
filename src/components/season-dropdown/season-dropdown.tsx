import { IBasketballSeason } from "@/src/database/schemas/basketball-season-schema"
import { IFootballSeason } from "@/src/database/schemas/football-season-schema"
import { IHockeySeason } from "@/src/database/schemas/hockey-season-schema"
import { ISoccerSeason } from "@/src/database/schemas/soccer-season-schema"
import { Alert } from "@mui/material"
import styles from "./SeasonDropdown.module.css"
import { useState } from "react"

type SeasonDropdownProps = {
    season: IBasketballSeason | ISoccerSeason | IFootballSeason | IHockeySeason,
    deleteSeason: (id: string) => void
}

export const SeasonDropdown = ({ season, deleteSeason }: SeasonDropdownProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true)

    return (
        <div className={styles.root}>
            <div className={styles.panelBody} onClick={() => deleteSeason(season.id)}>
                <div className={styles.mainTextContainer}>
                    <span></span>
                </div>

            </div>
            {!isCollapsed && season.games.map((game) =>
                <div className={styles.panelBody}>

                </div>
            )}
        </div>


    )
}