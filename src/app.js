import express from 'express'

const app = express()

app.use(express.json({
    limit: '16kb'
}));

import repoRoutes from './routes/repo.routes.js'

app.use('/api/v1/repos',repoRoutes)

export { app }