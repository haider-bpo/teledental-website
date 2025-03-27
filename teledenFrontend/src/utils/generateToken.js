import jwt from "jsonwebtoken";

export default function generateToken({ user, activeChat }) {
  return jwt.sign(
    {
      model: user?.model,
      name: user?.firstName,
      userId: user?._id,
      meetingId: activeChat?._id,
      app_id: 'teledental'
    },
    "-123abcl1;"
  );
}
