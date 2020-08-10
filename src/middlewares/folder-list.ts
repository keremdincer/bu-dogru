import { Request, Response, NextFunction } from 'express'
import { Folder } from '../models/folder'

import _ from 'lodash'

declare global {
  namespace Express {
    interface Request {
      folderList?: object[]
    }
  }
}

export const folderList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const folders = await Folder.find({})
  const sortedFolders = _.sortBy(folders, folder => {
    return folder.title
  })

  // FIXME: any'yi kaldır.
  const sortedDocuments = sortedFolders.map(folder => {
    folder.documents = _.sortBy(folder.documents, doc => {
      return doc.title
    }) as any
    return folder
  })

  req.folderList = sortedFolders
  return next()
}
