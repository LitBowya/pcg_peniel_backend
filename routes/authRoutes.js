import express from 'express';
import {loginUser, logoutUser, registerUser, requestPasswordReset, resetPassword, verifyUserOTP} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/verify', verifyUserOTP);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);


export default router;
