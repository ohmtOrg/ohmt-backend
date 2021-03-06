import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import messages from './messages';

const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS, 10));
const secret = process.env.SECRET_KEY;

/**
 * Generate JWT
 * @param {Object} payload - object literal resource to be encoded
 * @param {String} expiresIn jwt expiry date
 * @returns {String} - jwt token
 */
export const generateToken = (payload, expiresIn = '7 days') => {
  const token = jwt.sign({ ...payload }, 'secret', { expiresIn });

  return token;
};

/**
 * @function verifyToken
 * @param {String} token jwt token
 * @returns {Object} decoded object
 */
export const verifyToken = async token => {
  const decoded = await jwt.verify(token, 'secret');
  return decoded;
};

export const verifyResetPasswordToken = async token => {
  const decoded = await jwt.verify(token, 'secret', error => {
    if (error) {
      return { messages: messages.expiredJWT };
    }
  });
  return decoded;
};
