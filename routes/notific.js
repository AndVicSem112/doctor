const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const db = client.db('clinic');
const collection = db.collection('notific');
const fs = require('fs');

module.exports = async function find() {
    setInterval(async () => {
        try {
            let day = new Date().getDay().toString().padStart(2, 0);
            let month = (new Date().getMonth() + 1).toString().padStart(2, 0);
            let hour = new Date().getHours().toString().padStart(2, 0);
            let minutes = new Date().getMinutes().toString().padStart(2, 0);
            let date = `${day}${month}_${(parseInt(hour) + 2).toString().padStart(2, 0)}${minutes}`;
            console.log(date)
            await client.connect();
            const insertResult = collection.find({ slot: date });
            for await (const doc of insertResult) {
                fs.appendFileSync(
                    'notific.log',
                    `${day}.${month} | Привет ${doc.user_name}! Вам через 2 часа к ${doc.doctor_spec} в ${(parseInt(hour) + 2).toString().padStart(2, 0)}:${minutes}!\n`,
                    { flags: 'w' }
                )
            }
            date = `${(parseInt(day) + 1).toString().padStart(2, 0)}${month}_${hour}${minutes}`;
            console.log(date)
            const notificDay = collection.find({ slot: date });
            for await (const doc of notificDay) {
                fs.appendFileSync(
                    'notific.log',
                    `${day}.${month} | Привет ${doc.user_name}! Напоминаем, что вы записаны к ${doc.doctor_spec} в ${hour}:${minutes}!\n`,
                    { flags: 'w' }
                )
            }
        } catch (error) {
            console.log(`Error worth logging: ${error}`);
        } finally { () => client.close(); }
    }, 60000)
};

