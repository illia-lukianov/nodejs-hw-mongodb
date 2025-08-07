import createHttpError from "http-errors";
import { userModel } from "../models/user.js";
import bcrypt from "bcrypt";
import { randomBytes } from 'crypto';
import { sessionModel } from "../models/session.js";
import { FIFTEEN_MINUTES, THIRTY_DAYS } from "../constans/index.js";
import jwt from 'jsonwebtoken';
import { sendMail } from "../utils/sendMail.js";
import getEnvVariables from "../utils/getEnvVariables.js";

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
};

export const registerUser = async ({email, password, name}) => {
    
    if (await userModel.findOne({ email: email}) !== null) {
        throw createHttpError(409, 'User with this email already exists');
    }

   const hashedPassword = await bcrypt.hash(password, 10);
   return await userModel.create({
        email,
        name,
        password: hashedPassword
   });
};

export const loginUser = async ({email, password}) => {
  const user = await userModel.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  if (!user) {
    throw createHttpError(401, 'Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid email or password');
  }

  await sessionModel.deleteOne({ userId: user._id });
  
  return await sessionModel.create({
    userId: user._id,
    ...createSession(),
  });
}

export const refreshUserSession = async ({sessionId, refreshToken}) => {
     const session = await sessionModel.findOne({ 
        _id: sessionId,
        refreshToken,
     });
    if (!session) {
        throw createHttpError(401, 'Session not found');
    }
    if (session.refreshTokenValidUntil < new Date()) {
        throw createHttpError(401, 'Refresh token expired');
    } 
    const newSession = createSession();
    await sessionModel.updateOne(
  { _id: sessionId, refreshToken },
  {
    $set: {
      accessToken: newSession.accessToken,
      refreshToken: newSession.refreshToken,
      accessTokenValidUntil: newSession.accessTokenValidUntil,
      refreshTokenValidUntil: newSession.refreshTokenValidUntil,
    },
  }
);

    return newSession;
}

export const logoutUser = async ({sessionId}) => {
  await sessionModel.deleteOne({ _id: sessionId });
}

export const requestPasswordReset = async (email) => {
  const user = await userModel.findOne({ email });

  if (user === null) {
    throw new createHttpError.NotFound('User not found');
  }

  const token = jwt.sign(
    {
      sub: user._id,
      name: user.name,
    },
    getEnvVariables('SECRET_JWT'),
    {
      expiresIn: '15m',
    },
  );
  const mail = await sendMail({
      to: email,
      subject: 'Reset password',
      html: `<p>To reset password please visit this <a href="http://localhost:3000/reset-password/${token}">link</a></p>`,
    });
    if (!mail.accepted || mail.accepted.length === 0) {
      throw createHttpError(500, "Failed to send the email, please try again later.");
    }
};

export const resetPwd = async (token, password) => {
    try {
    const decoded = jwt.verify(token, getEnvVariables('SECRET_JWT'));

    const user = await userModel.findById(decoded.sub);

    if (user === null) {
      throw new createHttpError.NotFound('User not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new createHttpError.Unauthorized('Token is expired');
    }

    if (error.name === 'JsonWebTokenError') {
      throw new createHttpError.Unauthorized('Token is unauthorized');
    }

    throw error;
  }
}