const express = require('express')
const { default: mongoose } = require('mongoose')
const router = express.Router()
const booklistModel = require('../models/booklistModel')


router.get('/', async (req, res) => {
    try {
        const bookList = await booklistModel.find({ user: req.user })
        res.status(200).json({ bookList })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.post('/', async (req, res) => {
    try {
        const createdBook = await booklistModel.create({
            ...req.body,
            user: req.user
        })
        res.status(200).json({
            status: 'success',
            createdBook
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'book id not found' })
        }
        const deletedBook = await booklistModel.deleteOne({ _id: req.params.id })
        res.status(200).json({
            message: 'book deleted.',
            deletedBook
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        console.log('edit api')
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'book id not found' })
        }
        const updatedBook = await booklistModel.updateOne(
            { _id: req.params.id }, { $set: req.body })
        res.status(200).json({
            message: 'book updated.',
            updatedBook
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})



module.exports = router

