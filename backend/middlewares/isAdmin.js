const isAdmin = (req, res, next) => {
  const user = req.user;

  const admin = user.admin;

  if (!admin) {
    return res.status(403).json({ error: "You must be admin" });
  }

  next();
};

export default isAdmin;
