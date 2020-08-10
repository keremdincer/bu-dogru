import express from 'express'
import { Folder } from '../models/folder'

const router = express.Router()

router.get('/folders/:folderId/:documentId', async (req, res) => {
  const folder = await Folder.findById(req.params.folderId)

  if (!folder) {
    return res.status(404)
  }

  const document = folder.documents.find(
    doc => doc._id == req.params.documentId
  )

  res.render('document', {
    title: folder.title,
    folders: req.folderList,
    currentUser: req.currentUser,
    createdBy: folder.createdBy,
    document
  })
})

export { router as documentRouter }
