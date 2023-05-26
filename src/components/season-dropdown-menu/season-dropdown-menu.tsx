"use client"

import { IBasketballSeason } from "@/src/database/schemas/basketball-season-schema"
import styles from "./SeasonDropdownMenu.module.css"
import { IFootballSeason } from "@/src/database/schemas/football-season-schema"
import { ISoccerSeason } from "@/src/database/schemas/soccer-season-schema"
import { IHockeySeason } from "@/src/database/schemas/hockey-season-schema"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Alert, Skeleton } from "@mui/material"
import { SeasonDropdown } from "../season-dropdown/season-dropdown"

//TODO: ADD _id: String property to all schema definitions

export const SeasonDropdownMenu = () => {
    const [fetchSeasons, setFetchSeasons] = useState(true)
    const [error, showError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [seasons, setSeasons] = useState<IBasketballSeason[] | ISoccerSeason[] | IFootballSeason[] | IHockeySeason[]>([])

    useEffect(() => {
        setIsLoading(true)
        fetch("/api/users/seasons", { cache: "no-cache", method: "GET" }).then((res) => {
            if (res.status != 200) {
                console.error("Error fetching game data")
                return
            }
            res.json().then(val => {
                setSeasons(val)
                setFetchSeasons(false)
                setIsLoading(false)
            })

        })
    }, [fetchSeasons, setFetchSeasons, setIsLoading])

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

    async function deleteSeason(id: string): Promise<boolean> {
        console.log(id)
        const index = seasons.findIndex((season) => season.id === id)
        if (index === -1) {
            return false;
        }

        const res = await fetch(`/api/users/seasons/${id}`, { method: "DELETE" })
        if (res.status === 200) {
            seasons.splice(index, 1);
            setSeasons(seasons)
            return true
        }

        showError(true);
        return false;
    }

    return (
        <div className={styles.root}>
            {isLoading ? <Skeleton variant="rounded" width={"50%"} height={130} /> : seasons.map((val) => <SeasonDropdown key={val.id} season={val} deleteSeason={(id: string) => deleteSeason(id)} />)}
            <div className={styles.placeholder} onClick={() => addNewSeason()}>
                <span>Start New Season + </span>
            </div>
            {error && <Alert className={styles.alert} severity='error' onClose={() => showError(false)} variant='filled'>Error - something went wrong</Alert>}
        </div>
    )
}