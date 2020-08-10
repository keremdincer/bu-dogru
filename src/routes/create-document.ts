import express from 'express'
import { Folder } from '../models/folder'

const router = express.Router()

router.post('/folders/:id', async (req, res) => {
  const { title } = req.body
  const { id } = req.params

  const folder = await Folder.findById(id)
  if (!folder) {
    return res.status(400)
  }

  folder.documents.push({ title, content: `# ${title}` })
  await folder.save()

  // Folder'a eklenen son document'i bulup onun folderId + documentId ile
  // redirect etmek gerekiyor.
  const updatedFolder = await Folder.findById(id)

  const doc = updatedFolder!.documents[updatedFolder!.documents.length - 1]

  console.log(doc)

  res.redirect(`/folders/${folder._id}/${doc._id}`)
})

export { router as createDocumentRouter }
