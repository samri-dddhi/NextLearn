import mongoose, {Document , Model , Schema} from "mongoose";
import bcrypt from "bcryptjs";

const emailRegexPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
    validate: {
        validator: function(v: string) {
            return emailRegexPattern.test(v);
        },
        message: "Invalid email format"
    },
    unique: true,
   
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
    select: false,
  },
  avatar: {
    public_id: { type: String, required: [true, "Public ID is required"] },
    url: { type: String, required: [true, "URL is required"] }
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

userSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const userModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default userModel;
