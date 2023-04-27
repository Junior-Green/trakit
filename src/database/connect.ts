import mongoose from 'mongoose';

export default async function connectDatabase(): Promise<void> {
    if (!process.env.MONGODB_URI) {
        return Promise.reject('Invalid/Missing environment variable: "MONGODB_URI"');
    }

    await mongoose.connect(process.env.MONGODB_URI).then(
        () => {
            console.log('Database connected...');
        },
        () => {
            console.log('Error connecting to database');
        });
}