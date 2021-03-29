const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var usersSchema = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    }
});

module.exports = Users = mongoose.model('Users', usersSchema);