import bcrypt from "bcrypt";
import mongoose from "mongoose";

const ministriesEnum = [
    "Children Service",
    "Junior Youth",
    "Youth People's Guild",
    "Young Adult Fellowship",
    "Men's Fellowship",
    "Women's Fellowship",
];

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    ministry: {
      type: String,
      enum: ministriesEnum,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    otp: {
      type: String, // Store the OTP temporarily
    },
    otpExpiration: {
      type: Date, // Store when the OTP expires
    },
    isVerified: {
      type: Boolean,
      default: false, // False by default, becomes true after successful OTP verification
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Method to automatically assign ministry based on age and gender
userSchema.methods.assignMinistry = function () {
    const age = new Date().getFullYear() - this.dateOfBirth.getFullYear();
    
    if (age < 12) {
        this.ministry = "Children Service";
    } else if (age >= 12 && age <= 18) {
        this.ministry = "Junior Youth";
    } else if (age > 18 && age <= 30) {
        this.ministry = "Youth People's Guild";
    } else if (age > 30 && age <= 40) {
        this.ministry = "Young Adult Fellowship";
    } else if (age > 40 && this.gender === 'Male') {
        this.ministry = "Men's Fellowship";
    } else if (age > 40 && this.gender === 'Female') {
        this.ministry = "Women's Fellowship";
    }
};

const User = mongoose.model('User', userSchema);

export default User;
