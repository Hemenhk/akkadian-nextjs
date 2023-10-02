import mongoose, { Document, Model } from "mongoose";

export interface AdminDashboardDocument extends Document {
  announcementText: string;
  announcementColor: string;
  heroImage: string;
  heroHeading: string;
  heroSubHeading: string;
  heroButtonText: string;
  heroButtonColor: string;
}

const adminDashboard = new mongoose.Schema({
  announcementText: {
    type: String,
    required: [true, "A store must have an announcement text"],
  },
  announcementColor: {
    type: String,
    required: [true, "A store must have an announcement color"],
  },
  heroImage: {
    type: String,
    required: [true, "A store must have a hero image"],
  },
  heroHeading: {
    type: String,
    required: [true, "A store must have a hero heading"],
  },
  heroSubHeading: {
    type: String,
    required: [true, "A store must have a hero sub-heading"],
  },
  heroButtonText: {
    type: String,
  },
  heroButtonColor: {
    type: String,
  },
  footerBackgroundColor: {
    type: String
  },
  logo: {
    type: String
  }
});

const AdminDashboard: Model<AdminDashboardDocument> =
  mongoose.models.AdminDashboard ||
  mongoose.model<AdminDashboardDocument>("AdminDashboard", adminDashboard);

export default AdminDashboard;
