import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";

export const createJWTToken = (user) => {
    const userForToken = {
        username: user.username,
        role: user.role,
        id: user.id
    };

    // token expires in 24 hours
    const token = jwt.sign(userForToken, config.JWT_SECRET, {
        expiresIn: 24 * 60 * 60
    });

    return token;
};

export const loginUser = async (req, res) => {
    const body = req.body;

    const user = await User.findOne({
        username: body.username,
    });

    const passwordCorrect =
        // Condition: Check if user exists AND password_hash is truthy (exists and not empty)
        user.password_hash
            ? await bcrypt.compare(body.password, user.password_hash)
            : false;

    if (!(user && passwordCorrect)) {
        throw new Error("Invalid username or password");
    }

    const token = createJWTToken(user);

    const authenticatedUser = {
        id: user?.id,
        username: user.username,
        token: token,
    }

    return res.status(200).json(authenticatedUser);
};
