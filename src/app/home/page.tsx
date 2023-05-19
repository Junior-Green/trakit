import { GameRecorder } from "@/src/components/game-recorder/game-recorder";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import UserData from "@/src/database/schemas/user-schema";

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
    
}
