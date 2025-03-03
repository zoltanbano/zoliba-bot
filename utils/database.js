import { MongoClient } from 'mongodb';
import config from '../config/databaseConfig.js';

let db = null;

export async function connectDB() {
    if (db) return db;
    
    try {
        const client = await MongoClient.connect(config.mongodb.uri);
        db = client.db(config.mongodb.dbName);
        console.log('Connected to MongoDB Atlas');
        return db;
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
}

export const rpsCollection = {
    async updateScore(userId, username, result) {
        if (!db) {
            throw new Error('Database connection not established');
        }

        const collection = db.collection('rps_scores');
        
        // Debug logging
        console.log(`Updating score for ${username} (${userId}) with result: ${result}`);

        // First, ensure the user exists
        const existingUser = await collection.findOne({ userId });
        if (!existingUser) {
            await collection.insertOne({
                userId,
                username,
                wins: 0,
                losses: 0,
                draws: 0
            });
        }

        // Update based on game result
        const update = {
            $inc: {},
            $set: { 
                username,
                lastPlayed: new Date()
            }
        };

        // Set the increment field based on result
        if (result === 'win') {
            update.$inc.wins = 1;
        } else if (result === 'draw') {
            update.$inc.draws = 1;
        } else if (result === 'loss') {
            update.$inc.losses = 1;
        }

        // Debug logging
        console.log('Update operation:', update);

        return await collection.updateOne(
            { userId },
            update
        );
    },

    async getScore(userId) {
        const collection = db.collection('rps_scores');
        return await collection.findOne({ userId });
    },

    async getLeaderboard() {
        const collection = db.collection('rps_scores');
        return await collection.aggregate([
            {
                $project: {
                    username: 1,
                    wins: 1,
                    losses: 1,
                    draws: 1,
                    total: { $add: ['$wins', '$losses', '$draws'] },
                    winRate: {
                        $multiply: [
                            { $divide: ['$wins', { $add: ['$wins', '$losses', '$draws'] }] },
                            100
                        ]
                    }
                }
            },
            { $sort: { wins: -1 } },
            { $limit: 5 }
        ]).toArray();
    }
};