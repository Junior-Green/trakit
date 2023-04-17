import mongoose from 'mongoose'

export default async function connectDatabase() : Promise<void> {
    await mongoose.connect('mongodb+srv://juniorgreen9185:S3vB154U1ObOuQgX@cluster0.ggacb6d.mongodb.net/?retryWrites=true&w=majority');
    console.log('Database connected...');
}