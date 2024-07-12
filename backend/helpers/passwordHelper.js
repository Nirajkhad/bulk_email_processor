const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generatePassHash = async (password) => {
    return await bcrypt.hash(password,10);
}

const createJwtToken = (username) => {
    return jwt.sign({username}, process.env.JWT_SECRET, { expiresIn: '10d' });
}

module.exports = { generatePassHash, createJwtToken }