import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import UserData from "@/src/database/schemas/user-schema";
import { ObjectId } from "mongodb";
import { GameRecorder } from "@/src/components/game-recorder/game-recorder";

export const metadata = {
    title: 'Live Game',
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

export default async function LiveGame() {
    const session = await getServerSession(authOptions)
    if (!session) {
        throw new Error('No user session')
    }
    const user = await UserData.findOne({ userId: new ObjectId(session.user.id) });
    if (!user || !user.selectedSport) {
        throw new Error('Invalid or missing user information');
    }

    return (
        <div style={{ width: '100%', height: '100%', overflowY: "scroll"}}>
            <GameRecorder sport={user.selectedSport} teamName={user.teamName} />
        </div>
    );
}
