import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import noteRoutes from './routers/noteRoutes.js'
import dotenv from 'dotenv'

dotenv.config()


const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 5001

console.log('MONGODB_URI:', process.env.MONGODB_URI)

const app =express()

//midlleware
app.use(cors())
app.use(express.json())

//health check endpoint
app.get('/', (req, res) =>{
res.status(200).json({status: 'ok' , message: 'server is live'})
})

// routes
app.use('/api/notes', noteRoutes)

// mongodb connection
mongoose
.connect (MONGODB_URI)
.then(() => console.log('connected to MongoDB'))
.catch((err)=> console.error('MongoDB connection error:', err))

app.listen(PORT,() =>{
    console.log(`server running on port ${PORT}`)
})