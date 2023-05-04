const { v4: uuidv4 } = require('uuid');
const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const db = client.db('clinic');
const collection = db.collection('users');

module.exports = (app) => {
    app.post('/user', async (req, res) => {
        try {
            await client.connect();
            // res.write('Connected...');
            req.body.uuid = uuidv4();
            const quest = req.body;
            const insertResult = await collection.insertOne(quest);
            res.send(insertResult);
        } catch (error) {
            console.log(`Error worth logging: ${error}`);
        } finally { () => client.close(); }
    });
};