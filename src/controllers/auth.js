import { ONE_DAY } from '../constans/index.js';
import { loginUser, logoutUser, refreshUserSession, registerUser, requestPasswordReset, resetPwd } from '../services/auth.js';

export function setupCookies(res, session) {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
}

export async function registerController(req, res) {
  await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      name: req.body.name,
      email: req.body.email,
    },
  });
}

export async function loginController(req, res) {
  const user = await loginUser(req.body);

  setupCookies(res, user);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      email: user.email,
      accessToken: user.accessToken,
    },
  });
}

export async function refreshController(req, res) {
   const session = await refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });
  setupCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed user session!',
    data: {
      accessToken: session.accessToken,
    },
  });
}

export async function logoutController(req, res) {
  if (!req.cookies.sessionId) {
    await logoutUser({ sessionId: req.cookies.sessionId });
  }
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');
  res.status(204).send();
}

export async function sendResetEmailController (req, res) {
    const email = await requestPasswordReset(req.body.email);
    console.log("🚀 ~ sendResetEmailController ~ email:", email)
    res.json({
       status: 200,
       message: "Reset password email has been successfully sent.",
});
}

export async function resetPwdController (req, res) {
    const { token, password } = req.body;
    await resetPwd(token, password);
    res.json({
       status: 200,
       message: "Password has been successfully reset.",
   });
}