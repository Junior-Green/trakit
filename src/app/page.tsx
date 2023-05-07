import {authOptions} from './api/auth/[...nextauth]/route';
import {getServerSession} from 'next-auth';
import {redirect} from "next/navigation";


export default async function Main() {
    const session = await getServerSession(authOptions);
    session ? redirect("/signin") : redirect("/home");
}
