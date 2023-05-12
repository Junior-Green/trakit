import {getServerSession} from "next-auth";
import {authOptions} from "../../../auth/[...nextauth]/route";
import {NextResponse} from "next/server";

export async function PUT({params}: {params: {sport: string;};}) {
    const session = await getServerSession(authOptions);
    if(!session){
        
    }
}