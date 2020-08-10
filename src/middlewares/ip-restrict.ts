import { Request, Response, NextFunction } from 'express'
import { User } from '../models/users'

declare global {
  namespace Express {
    interface Request {
      currentUser?: string
    }
  }
}

export const ipRestrict = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const address = req.connection.remoteAddress
  const ip = address?.split('::ffff:')[1] || ''
  const user = await User.findOne({ ipAddresses: ip })

  if (user) {
    req.currentUser = user.username
    return next()
  }

  return res.render('error', {
    message: '401',
    error: { status: 'Unauthorized' }
  })
}
