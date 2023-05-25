"use client"

import { IBasketballSeason } from "@/src/database/schemas/basketball-season-schema"
import styles from "./SeasonDropdownMenu.module.css"
import { IFootballSeason } from "@/src/database/schemas/football-season-schema"
import { ISoccerSeason } from "@/src/database/schemas/soccer-season-schema"
import { IHockeySeason } from "@/src/database/schemas/hockey-season-schema"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Alert } from "@mui/material"
import { SeasonDropdown } from "../season-dropdown/season-dropdown"

export const SeasonDropdownMenu = () => {
    const [fetchSeasons, setFetchSeasons] = useState(true)
    const [error, showError] = useState(false)
    const [seasons, setSeasons] = useState<IBasketballSeason[] | ISoccerSeason[] | IFootballSeason[] | IHockeySeason[]>([])

    useEffect(() => {
        fetch("/api/users/seasons", { cache: "no-cache", method: "GET" }).then((res) => {
            if (res.status != 200) {
                console.error("Error fetching game data")
                return
            }
            res.json().then(val => {
                setSeasons(val)
                setFetchSeasons(false)
            })

        })
    }, [fetchSeasons, setFetchSeasons])

    async function addNewSeason(): Promise<void> {
        await fetch("/api/users/seasons", { cache: "no-store", method: "POST" }).then(res => {
            if (res.status != 200) {
                showError(true)
                console.error(res.statusText)
            }
            setFetchSeasons(true)
        }).catch((err) => {
            console.error(err)
        })

    }

    return (
        <div className={styles.root}>
            {seasons.map((val) => <SeasonDropdown season={val} />)}
            <div className={styles.placeholder} onClick={() => addNewSeason()}>
                <span>Start New Season + </span>
            </div>

        </div>
    )
}