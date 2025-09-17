import mongoose, {Document , Model , Schema} from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
require("dotenv").config();
import jwt from "jsonwebtoken";

// const emailRegexPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  }
  role: string;
  isVerified: boolean;
  courses: Array<{courseId: string}>;
  comparePassword(password: string): Promise<boolean>;
  SignAccessToken(): string;
  SignRefreshToken(): string;
};

const userSchema: Schema<IUser> = new Schema({
    name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
   email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "Invalid email format",
      },
    },
  password: {
    type: String,
    minlength: [6, "Password must be at least 6 characters long"],
    select: false,
  },
  avatar: {
    public_id: { type: String },
    url: { type: String }
  },
  role: {
    type: String,
    default: "user"
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  courses: [{
    courseId: { type: String, required: true }
  }]
}, { timestamps: true });

userSchema.pre<IUser>("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  
    this.password = await bcrypt.hash(this.password,10);
    next();
});

userSchema.methods.SignAccessToken = function() {
  return jwt.sign({ id: this.id }, process.env.ACCESS_TOKEN || '',{
    expiresIn: '5m'
  });
};

userSchema.methods.SignRefreshToken = function() {
  return jwt.sign({ id: this.id }, process.env.REFRESH_TOKEN || '', {
    expiresIn: '3d'
  });
};

userSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: { _id: any; id?: string; password?: string }) {
  ret.id = ret._id.toString();
  delete ret._id;
  delete ret.password;
}

});


const userModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);



export default userModel;
