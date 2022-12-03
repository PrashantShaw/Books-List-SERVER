const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: { type: String, required: true },
    isbn: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    publisher: { type: String, required: true },
    publishedDate: { type: String, default: Date() },

    user: { type: Schema.Types.ObjectId, ref: 'users' }
})

const booklistModel = mongoose.model('booklists', bookSchema)

module.exports = booklistModel