var crypto = require('crypto');

export function getPasswordHash(password) {
    return crypto.createHash('sha256').update(password+"adasjhjk3434").digest('hex');
}

export function getAuthKeyHash(email, username, passwordHash) {
    return crypto.createHash('sha256').update(passwordHash + email + username).digest('hex');
}