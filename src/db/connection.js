import mongoose from 'mongoose';

mongoose.connect(process.env.MONGOOSE);

let db;
db = mongoose.connection;

const Connect = () => {
    db.on('connected', async () => {
        console.log('Successfully connected to the database!', {
            tag: 'Database'
        });
    });
    
    db.on('disconnected', () => {
        console.error('Disconnected from the database!', {
            tag: 'Database'
        });
    });
    
    db.on('error', (error) => {
        console.error(`Unable to connect to the database!\nError: ${error}`, {
            tag: 'Database'
        });
    });
    
    db.on('reconnected', async () => {
        console.log('Reconnected to the database!', {
            tag: 'Database'
        });
    });
}

export default {
    Connect
};