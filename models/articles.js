var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: {
        type: String,
        unique: true,
        trim: true
    },
    favorited: {
        type: Boolean,
        default: false
    }
});

var Article = mongoose.model("Article", articleSchema)

module.exports = Article;