import express from 'express'
import { Folder } from '../models/folder'

const router = express.Router()

router.put('/folders/:folderId/:documentId', async (req, res) => {
  const { content } = req.body

  const folder = await Folder.findById(req.params.folderId)
  if (!folder) {
    return res.status(404)
  }

  const document = folder.documents.find(
    doc => doc._id == req.params.documentId
  )
  if (!document) {
    return res.status(404)
  }

  document.content = content
  await folder.save()

  return res.json({})
})

export { router as updateDocumentRouter }
