import express from 'express'
import bodyParser from 'body-parser';

const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded(
    { extended: true }
));

app.use(express.json({
    limit: '16kb'
}));

import repoRoutes from './routes/repo.routes.js'
import userRoutes from './routes/user.routes.js'

app.use('/api/v1/repos',repoRoutes)
app.use('/api/v1/users',userRoutes)

export { app }