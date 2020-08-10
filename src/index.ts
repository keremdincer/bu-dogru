import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import mongoose from 'mongoose'
import { username, password } from './config'

import { ipRestrict } from './middlewares/ip-restrict'
import { folderList } from './middlewares/folder-list'

import { dashboardRouter } from './routes/dashboard'
import { createFolderRouter } from './routes/create-folder'
import { createDocumentRouter } from './routes/create-document'
import { updateDocumentRouter } from './routes/update-document'
import { documentRouter } from './routes/document'

const app = express()

app.set('view engine', 'pug')

app.use(compression())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(ipRestrict)
app.use(folderList)

app.use(dashboardRouter)
app.use(createFolderRouter)
app.use(createDocumentRouter)
app.use(updateDocumentRouter)
app.use(documentRouter)

app.get('/create', (req, res, next) => {
  res.render('create', { title: 'Doküman Başlığı', message: 'Hi there!' })
})

const bootstrap = async () => {
  try {
    await mongoose.connect(
      `mongodb://${username}:${password}@172.26.1.48:27017/budogru`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    )

    console.log('Connected to MongoDb')
  } catch (err) {
    console.log(err)
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000')
  })
}

bootstrap()
