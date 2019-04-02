var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: {
        type: String,
        trim: true,
    },
    notes: {
        type: String,
        trim: true
    },
    favorited: {
        type: Boolean,
        default: false
    },
    link: {
        type: String,
        trim: true,
    },

    // notes: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Notes"
    // }]
});

var Article = mongoose.model("Article", articleSchema)

module.exports = Article;