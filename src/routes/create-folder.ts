import express from 'express'

import { Folder } from '../models/folder'

const router = express.Router()

router.post('/folders', async (req, res) => {
  const { title } = req.body

  const folder = Folder.build({
    title,
    createdAt: new Date(),
    createdBy: req.currentUser!
  })
  await folder.save()

  res.redirect('/')
})

export { router as createFolderRouter }
