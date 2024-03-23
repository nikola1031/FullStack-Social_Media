import mongoose from 'mongoose';
const connectionString = process.env.MONGO_URI!;

export async function initDB(): Promise<void> {
    try {
        const db = (await mongoose.connect(connectionString)).connection;
        db.on('open', () => console.log('DB connected successfully'));
        db.on('error', (err) => console.error(err));
        db.on('disconnect', () => console.log('DB has disconnected'));
    } catch (error) {
        console.error(error);
        return process.exit(1);
    }
}
