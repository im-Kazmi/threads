import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      min:2,
      max:10
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    isVerified:{
      type:Boolean,
      default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    VerifyToken:String,
    VerifyTokenExpiry:Date,
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friends:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    requestSent:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    requestsRecieved:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ]
  },

  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    return next();
  } else {
    try {
      this.password = await bcrypt.hash(this.password, 12);
      next();
    } catch (error) {
      next(error);
    }
  }
});
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    return next();
  } else {
    try {
      this.fullname = this.firstname + " " + this.lastname
      next();
    } catch (error) {
      next(error);
    }
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
