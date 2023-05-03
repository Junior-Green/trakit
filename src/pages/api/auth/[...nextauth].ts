import {randomBytes, randomUUID} from "crypto";
import NextAuth, {NextAuthOptions} from "next-auth";
import RedditProvider from "next-auth/providers/reddit";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import clientPromise from "@/src/database/mongo-client";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";

const REDDIT_ID = process.env.REDDIT_ID;
const REDDIT_SECRET = process.env.REDDIT_SECRET;

const DISCORD_ID = process.env.DISCORD_ID;
const DISCORD_SECRET = process.env.DISCORD_SECRET;

const GOOGLE_ID = process.env.GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;

const TWITTER_ID = process.env.TWITTER_ID;
const TWITTER_SECRET = process.env.TWITTER_SECRET;

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

if (!REDDIT_ID) throw new Error('Invalid/Missing environment variable: "REDDIT_ID"');
if (!REDDIT_SECRET) throw new Error('Invalid/Missing environment variable: "REDDIT_SECRET"');
if (!DISCORD_ID) throw new Error('Invalid/Missing environment variable: "DISCORD_ID"');
if (!DISCORD_SECRET) throw new Error('Invalid/Missing environment variable: "DISCORD_SECRET"');
if (!GOOGLE_ID) throw new Error('Invalid/Missing environment variable: "GOOGLE_ID"');
if (!GOOGLE_SECRET) throw new Error('Invalid/Missing environment variable: "GOOGLE_SECRET"');
if (!TWITTER_ID) throw new Error('Invalid/Missing environment variable: "TWITTER_ID"');
if (!TWITTER_SECRET) throw new Error('Invalid/Missing environment variable: "TWITTER_SECRET"');
if (!NEXTAUTH_SECRET) throw new Error('Invalid/Missing environment variable: "NEXTAUTH_SECRET"');

export const authOptions: NextAuthOptions = {
    providers: [
        RedditProvider({
            clientId: REDDIT_ID,
            clientSecret: REDDIT_SECRET
        }),
        DiscordProvider({
            clientId: DISCORD_ID,
            clientSecret: DISCORD_SECRET
        }),
        GoogleProvider({
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }
        }),
        TwitterProvider({
            clientId: TWITTER_ID,
            clientSecret: TWITTER_SECRET,
            version: "2.0", // opt-in to Twitter OAuth 2.0
        })
        // ...add more providers here
    ],
    secret: NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    },
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
    },
    callbacks: {
        async session({session, token, user}) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.user.id = user.id;
            return session;
        }
    },
    adapter: MongoDBAdapter(clientPromise)
};

export default NextAuth(authOptions);