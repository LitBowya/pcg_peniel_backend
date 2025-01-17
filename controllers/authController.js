import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Role from "../models/Role.js";
import User from "../models/User.js";
import { sendOTP, verifyOTP } from "../utils/email.js";

const registerUser = async (req, res) => {
  const { name, email, password, dateOfBirth, address, gender } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Find the "Member" role by name
    const memberRole = await Role.findOne({ name: "Member" });

    // If the "Member" role does not exist, send an error
    if (!memberRole) {
      return res.status(500).json({ message: "Member role not found." });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      dateOfBirth,
      address,
      gender,
      role: memberRole._id,
    });

    // Automatically assign ministry based on age and gender
    user.assignMinistry();

    // Save user to the database
    await user.save();

    // Send OTP for email verification
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const emailResponse = await sendOTP(email, otp);

    if (!emailResponse.success) {
      return res.status(500).json({ message: emailResponse.message });
    }

    // Respond to the client
    res
      .status(201)
      .json({
        message:
          "Registration successful. Please check your email for OTP verification.",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during registration." });
  }
};

const loginUser = async (req, res) => {
  const { identifier, password } = req.body; // Accept either email or name as `identifier`

  try {
    let user;

    // Determine whether the identifier is an email or a name
    if (identifier.includes("@")) {
      // Treat identifier as an email
      user = await User.findOne({ email: identifier }).populate("role");
      if (!user) {
        return res.status(400).json({ message: "Email not found." });
      }

      // Check if the email is verified
      if (!user.isVerified) {
        return res.status(400).json({
          message: "Email not verified. Please verify your email first.",
        });
      }
    } else {
      // Treat identifier as a name
      user = await User.findOne({ name: identifier }).populate("role");
      if (!user) {
        return res.status(400).json({ message: "Name not found." });
      }
    }

    // Check if the user has a valid role
    if (!user.role) {
      return res.status(500).json({ message: "User role not found." });
    }

    // Compare the password using the matchPassword method
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role.name },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Set JWT as HTTP-Only Cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful.",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: `Error during login: ${error.message}` });
  }
};


const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
};

const verifyUserOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpResponse = await verifyOTP(email, otp);

    if (!otpResponse.success) {
      return res.status(400).json({ message: `Opps ${otpResponse.message}` });
    }

    // OTP verified successfully, update user's `isVerified` status
    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h", // 1 hour expiration
    });

    res.status(200).json({ message: "Email verified successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while verifying OTP." });
  }
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found." });
    }

    // Generate OTP for password reset (this part is the same as the email verification)
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

    // Send OTP to the user's email for password reset
    const emailResponse = await sendOTP(email, otp);

    if (!emailResponse.success) {
      return res.status(500).json({ message: emailResponse.message });
    }

    res
      .status(200)
      .json({
        message:
          "OTP sent to email for password reset. Please check your inbox.",
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while requesting password reset." });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Verify OTP
    const otpResponse = await verifyOTP(email, otp);

    if (!otpResponse.success) {
      return res.status(400).json({ message: otpResponse.message });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword, otp: undefined, otpExpiration: undefined },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while resetting password." });
  }
};

export {
  registerUser,
  loginUser,
  verifyUserOTP,
  requestPasswordReset,
  resetPassword,
  logoutUser,
};
