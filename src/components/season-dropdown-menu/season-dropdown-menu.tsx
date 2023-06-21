"use client"

import { IBasketballSeason } from "@/src/database/schemas/basketball-season-schema"
import styles from "./SeasonDropdownMenu.module.css"
import { IFootballSeason } from "@/src/database/schemas/football-season-schema"
import { ISoccerSeason } from "@/src/database/schemas/soccer-season-schema"
import { IHockeySeason } from "@/src/database/schemas/hockey-season-schema"
import { useEffect, useState } from "react"
import { Alert, Skeleton } from "@mui/material"
import { SeasonDropdown } from "../season-dropdown/season-dropdown"

export const SeasonDropdownMenu = () => {
    const [fetchSeasons, setFetchSeasons] = useState(true)
    const [error, showError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [seasons, setSeasons] = useState<IBasketballSeason[] | ISoccerSeason[] | IFootballSeason[] | IHockeySeason[]>([])

    useEffect(() => {
        setIsLoading(true)
        fetch("/api/users/seasons", { cache: "default", method: "GET" }).then((res) => {
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
        const index = seasons.findIndex((season) => season._id === id)
        if (index === -1) {
            return false;
        }

        setIsLoading(true)
        const res = await fetch(`/api/users/seasons/${id}`, { method: "DELETE" })
        setIsLoading(false)
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
            {isLoading ? getLoadingSkeletons() : seasons.map((val) => <SeasonDropdown key={val._id} season={val} deleteSeason={(id: string) => deleteSeason(id)} />)}
            {
                !isLoading && <div className={styles.placeholder} onClick={() => addNewSeason()}>
                    <span>Start New Season + </span>
                </div>
            }
            {error && <Alert className={styles.alert} severity='error' onClose={() => showError(false)} variant='filled'>Error - something went wrong</Alert>}
        </div>
    )

    function getLoadingSkeletons() {
        const listOfSkeletons = []
        const skeletonCount = 5;

        for (let index = 0; index < skeletonCount; index++) {
            listOfSkeletons.push(<Skeleton key={index} variant="rounded" width={"50%"} height={130} />)
        }

        return listOfSkeletons;
    }
}