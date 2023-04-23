import {randomBytes, randomUUID} from "crypto";
import NextAuth, {NextAuthOptions} from "next-auth";
import AppleProvider from "next-auth/providers/apple";

const APPLE_ID = process.env.APPLE_ID
const APPLE_SECRET = process.env.APPLE_SECRET

if(!APPLE_ID) throw Error('Apple client id not defined.')
if (!APPLE_SECRET) throw Error('Apple secret id not defined.')

export const authOptions : NextAuthOptions = {
    providers: [
        AppleProvider({
            clientId: APPLE_ID,
            clientSecret: APPLE_SECRET
        })
        // ...add more providers here
    ],
    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        strategy: "database",

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours

        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex");
        }
    }
};

export default NextAuth(authOptions);