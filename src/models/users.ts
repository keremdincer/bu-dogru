import mongoose from 'mongoose'

interface UserDoc extends mongoose.Document {
  ipAddresses: string[]
  username: string
}

interface UserModel extends mongoose.Model<UserDoc> {}

const userSchema = new mongoose.Schema({
  ipAddresses: {
    type: [String],
    required: true
  },
  username: {
    type: String,
    required: true
  }
})

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }
