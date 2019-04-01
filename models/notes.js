var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var notesSchema = new Schema({
    articleID: {
        type: String
    },
    notes: {
        type: String,
        trim: true
    }

});

var Notes = mongoose.model("Notes", notesSchema)

module.exports = Notes;