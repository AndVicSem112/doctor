const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const db = client.db('clinic');
const collection = db.collection('doctors');


module.exports = (app) => {
    app.post('/make', async (req, res) => {
        try {
            await client.connect();
            const quest = {uuid : req.body.doctor_id, slots : {$all : [req.body.slot]}};
            const insertResult = await collection.findOne(quest);
            const patientData = await db.collection('users').findOne({uuid : req.body.user_id});
            // (insertResult) ? res.send(insertResult) : res.send("Это время не свободно");
            (insertResult) ? res.send(`Пациент записан на ${req.body.slot}`) : res.send("Это время не свободно");
            if (insertResult) {
                let newArr = [...insertResult.slots];
                req.body.doctor_spec = insertResult.spec;
                req.body.user_name = patientData.name;
                req.body.user_phone = patientData.phone;
                newArr.splice(newArr.indexOf(req.body.slot), 1);
                await collection.updateOne({uuid : req.body.doctor_id}, {$set: {slots: newArr}});
                await db.collection('notific').insertOne(req.body);
            }
        } catch (error) {
            console.log(`Error worth logging: ${error}`);
        } finally { () => client.close(); }
    });
};