const mongoose = require('mongoose');
const config = require('config');
//const db = config.get('mongodata');


const mongodb = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27018/MEAN", {
            useNewUrlPareser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('Mongodb connected.....')
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }
}

module.exports = mongodb;