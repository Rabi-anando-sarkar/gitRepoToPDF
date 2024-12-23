import dotenv from 'dotenv'
import connectDB from './db/index.js'
import { app } from './app.js'
import { PORT } from './constants.js'

dotenv.config({
    path: './.env'
})

connectDB()
    .then(() => {
        app.on('error',(error) => {
            console.log(`:: Error => ${error} ::`);
            throw error
        })
        app.listen(PORT || 8001, () => {
            console.log(`:: Server is running at port ${PORT} or check port 8001 ::`);
        })
    })
    .catch((error) => {
        console.log(`:: Mongo DB connection failed, error => ${error} ::`);
    })