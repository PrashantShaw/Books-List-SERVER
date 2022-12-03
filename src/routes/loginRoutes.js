const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel.js')
const jwt = require('jsonwebtoken')
const secret_key = 'this is a secret key'


router.post('/register', async (req, res) => {
    try {
        const { username, password, confPassword } = req.body
        console.log(req.body)
        if (username.length) {
            if (password !== confPassword)
                return res.status(400).json(
                    { message: 'Confirm Password didnt match.' })
            const regUser = await userModel.create({
                username, password
            })
            res.status(200).json({
                status: 'Success',
                regUser
            })
        }
        else {
            return res.status(400).json({ message: 'Invalid Fields.' })
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        if (username.length && password.length) {
            const user = await userModel.findOne({
                username, password
            })
            if (!user) return res.status(404).json({ message: 'Invalid credentials' })

            const token = jwt.sign(
                { data: user._id },
                secret_key,
                { expiresIn: '1h' }
            )

            res.status(200).json({ token })
        }
        else {
            return res.status(400).json({ message: 'Invalid Fields.' })
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})

module.exports = router