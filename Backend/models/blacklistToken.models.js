import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

// Automatically delete expired tokens using TTL index
blacklistTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const BlacklistToken = mongoose.model("BlacklistToken", blacklistTokenSchema);

export default BlacklistToken;
