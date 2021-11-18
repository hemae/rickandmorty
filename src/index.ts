import express, {Express} from 'express'
import config from 'config'
import log from '../logger'
const path = require('path')

const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, '..', 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
    })
}

const PORT: number = config.get('port') || 5000

function start() {
    try {
        app.listen(PORT, () => log.info(`Server has been started on port ${PORT}`))
    } catch (e: any) {
        log.info(`Server Error: ${e.message}`)
        process.exit(1)
    }
}

start()

