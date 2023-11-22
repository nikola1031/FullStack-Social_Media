import mongoose from 'mongoose';
const connectionString = 'mongodb://127.0.0.1:27017/' + process.env.DB_NAME;

export async function initDB(): Promise<void> {
    try {
        const db = (await mongoose.connect(connectionString)).connection;
        db.once('connection', () => console.log('DB connected successfully'));
        db.on('error', (err) => console.error(err));
        db.on('disconnect', () => console.log('DB has disconnected'));
    } catch (error) {
        console.error(error);
        return process.exit(1);
    }
}
