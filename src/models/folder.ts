import mongoose from 'mongoose'

import { documentSchema } from './document'

// Yeni bir dokümentasyon oluşturabilmek için gerekli alanları belirten
// interface
interface FolderAttrs {
  title: string
  createdBy: string
  createdAt: Date
}

// Documentation Model'inde bulunan özellikleri belirten interface
interface FolderModel extends mongoose.Model<FolderDoc> {
  build(attrs: FolderAttrs): FolderDoc
}

// Documentation objesinde bulunan özellikleri belirten interface
interface FolderDoc extends mongoose.Document {
  title: string
  content: string
  documents: [{ _id?: any; title: string; content: string }]
  createdBy: string
  createdAt: Date
}

const folderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  documents: [documentSchema],
  createdBy: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
})

folderSchema.statics.build = (attrs: FolderAttrs) => {
  return new Folder(attrs)
}

const Folder = mongoose.model<FolderDoc, FolderModel>('Folder', folderSchema)

export { Folder }
