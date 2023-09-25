import mongoose, { Document, Model } from "mongoose";

export interface AdminAuthDocument extends Document {
  email: string;
  password: string;
}

const adminAuthSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "An admin must have an email"],
  },
  password: {
    type: String,
    required: [true, "An admin must have a password"],
    minLength: 8,
    select: false,
  },
});

const AdminAuth: Model<AdminAuthDocument> =
  mongoose.models.AdminAuth ||
  mongoose.model<AdminAuthDocument>("AdminAuth", adminAuthSchema);

// const AdminAuth = mongoose.model("AdminAuth", adminAuthSchema)

export default AdminAuth;
