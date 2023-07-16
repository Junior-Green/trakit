import {getServerSession} from "next-auth";
import styles from "./Settings.module.css";
import {authOptions} from "../../api/auth/[...nextauth]/route";
import {SettingsModal} from "@/src/components/settings-modal/settings-modal";
import dbConnect from "@/src/database/mongoose-connect";
import UserData from "@/src/database/schemas/user-schema";
import {ObjectId} from "mongodb";

export default async function Settings() {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error("No user found");
    }

    await dbConnect();

    const user = await UserData.findOne({userId: new ObjectId(session.user.id)}).exec();

    console.log(user)

    if (!user) {
        throw new Error("No user found");
    }
    if (!user.selectedSport) {
        throw new Error("Sport not chosen");
    }

    return (
        <div className={styles.root}>
            <SettingsModal teamName={user.teamName} selectedSport={user.selectedSport}  />
        </div>
    );
}