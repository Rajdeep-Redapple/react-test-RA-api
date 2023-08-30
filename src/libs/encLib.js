const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const password = process.env.ENC_KEY;
const iv = process.env.IV;

const encrypt = (plaintext) => {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(password), Buffer.from(iv));
    let encrypted = cipher.update(plaintext, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
};

const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(password), Buffer.from(iv));
    let decrypted = decipher.update(hash, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

module.exports = {
    encrypt,
    decrypt
};
