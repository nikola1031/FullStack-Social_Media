import mongoose from 'mongoose';
const connectionString = 
`mongodb+srv://konimperator:${process.env.DB_PASSWORD}@gather-grid.l6woqfg.mongodb.net/`
// `mongodb+srv://konimperator:${process.env.DB_PASSWORD}@gather-grid.l6woqfg.mongodb.net/?retryWrites=true&w=majority&appName=gather-grid`

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
