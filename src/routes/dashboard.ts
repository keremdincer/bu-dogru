import express from 'express'

import { Folder } from '../models/folder'

const router = express.Router()

router.get('/', async (req, res) => {
  res.render('index', {
    title: 'Anasayfa',
    currentUser: req.currentUser!,
    folders: req.folderList
  })
})

export { router as dashboardRouter }
