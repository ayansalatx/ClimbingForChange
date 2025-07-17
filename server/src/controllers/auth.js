import bcrypt from 'bcrypt'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import config from '../utils/config.js'

export const createJWTToken = (user) => {
  const userForToken = {
    username: user.username,
    role: user.role,
    id: user.id,
  }

  // token expires in 24 hours
  const token = jwt.sign(userForToken, config.JWT_SECRET, {
    expiresIn: 24 * 60 * 60,
  })

  return token
}

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (!user) {
      return res.status(401).json({ error: 'Invalid username' })
    }

    const passwordCorrect = user.password_hash
      ? await bcrypt.compare(password, user.password_hash)
      : false

    if (!passwordCorrect) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    const token = createJWTToken(user)

    const authenticatedUser = {
      id: user.id,
      username: user.username,
      token,
    }

    return res.status(200).json(authenticatedUser)
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}
