const User = require("../models/users.modele");
const httpStatus = require("../utils/http.status");
const asyncWrapper = require("../middlewares/asyncWrapper");
const ERROR = require("../utils/ERROR");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const register = asyncWrapper(async (req, res, next) => {
  const { first_name, last_name, email, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    const error = ERROR.create("Passwords do not match", 422, "password mismatch");
    return next(error);
  }

  const existsUser = await User.findOne({ email: email });
  if (existsUser) {
    const error = ERROR.create("User already exists", 422, "email already exists");
    return next(error);
  }

  //! password hashing
  const hashingPassword = await bcrypt.hash(password, 12);
  const Registration = new User({ first_name, last_name, email, password: hashingPassword });
  const token = await jwt.sign({ email: Registration.email, id: Registration._id }, process.env.JWT_SECRET_KEY, { expiresIn: "100D" });
  Registration.token = token;

  await Registration.save(); // save data to Database;
  const { password: hashedPassword, ...userWithoutPassword } = Registration.toObject();

  res.status(201).json({ statusCode: 201, message: "User registered successfully", data: { user: userWithoutPassword } });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if(!email && !password) {
    const error = ERROR.create("Please provide email and password", 422, "email and password are required");
    return next(error);
  }

  const user = await User.findOne({ email: email });
  if(!user) {
    const error = ERROR.create("User not found", 404, "not found any user");
    return next(error);
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if(email && matchPassword) {
    //! login Successfully ###
    const token = await jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "100D"});
    res.json({ code: 200, message: httpStatus.OK, information: user });
  }
});

const getAllUsers = async (req, res) => {
  //? get all data
  const query = req.query;
  const limit = query.limit || 8;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({}, { __v: false, password: false }).limit(limit).skip(skip);
  res.json({ code: 200, message: httpStatus.OK, users: users });
};

const getSingleUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.userId).exec();
  if (!user) {
    const error = ERROR.create("User not found", 404, "not found any user");
    return next(error);
  }

  const { password, ...userWithoutPassword } = user.toObject();
  res.json({ code: 200, data: { user: userWithoutPassword } });
});

const delUser = async (req, res) => {
  const data = await User.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: httpStatus.OK, data: null });
};

const chanageUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const changeUserInfo = await User.findByIdAndUpdate(userId, { $set: { ...req.body } }, { new: true });
    res.status(200).json(changeUserInfo);
  } catch (err) {
    return res.status(500).json({ message: httpStatus.ERR });
  }
};

module.exports = { login, register, getAllUsers, getSingleUser, chanageUser, delUser };