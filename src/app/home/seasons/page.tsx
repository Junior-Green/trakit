import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import dbConnect from "@/src/database/mongoose-connect";
import UserData from "@/src/database/schemas/user-schema";
import { ObjectId } from "mongodb";
import BasketballSeason, { IBasketballSeason } from "@/src/database/schemas/basketball-season-schema";
import SoccerSeason, { ISoccerSeason } from "@/src/database/schemas/soccer-season-schema";
import FootballSeason, { IFootballSeason } from "@/src/database/schemas/football-season-schema";
import HockeySeason, { IHockeySeason } from "@/src/database/schemas/hockey-season-schema";
import { SeasonDropdown } from "@/src/components/season-dropdown/season-dropdown";
import styles from "./Seasons.module.css"
import { SeasonDropdownMenu } from "@/src/components/season-dropdown-menu/season-dropdown-menu";

export const metadata = {
    title: 'Seasons',
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
};

export default async function Seasons() {
    return (
        <div className={styles.root}>
            <h1 className={styles.header}>Game History</h1>
            <SeasonDropdownMenu />
        </div>
    );
}
