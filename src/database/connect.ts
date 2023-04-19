import mongoose from 'mongoose';
import dotenv from 'dotenv';

export default async function connectDatabase(): Promise<void> {
    dotenv.config();
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ggacb6d.mongodb.net/?retryWrites=true&w=majority`).then(
        () => {
            console.log('Database connected...');
        },
        () => {
            console.log('Error connecting to database');
        });
}