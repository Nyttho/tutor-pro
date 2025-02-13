import bcrypt from "bcryptjs";
import User from "../models/User.js";
import City from "../models/City.js";
import { emailValidator, postCodeCityValidator } from "../utils/validations.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    const cleanedUser = users.map(({ password, ...rest }) => rest);

    return res.status(200).json({ users: cleanedUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.getById(id);
    const { password, ...cleanedUser } = user;
    return res.status(200).json({ user: cleanedUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, countryName, cityName, postCode } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !countryName ||
      !cityName ||
      !postCode
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const isValidEmail = emailValidator(email);

    if (!isValidEmail) {
      return res.status(400).json({ error: "email must be valid" });
    }

    const isValidCp = await postCodeCityValidator(postCode, cityName);
    if (!isValidCp) {
      return res.status(422).json({ error: "city does not match code post" });
    }

    const existingUser = await User.getByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    let city = await City.getByPostCode(countryName, postCode);
    if (!city) {
      console.log("City not found, creating new city...");
      city = await City.create({
        country: countryName,
        name: cityName,
        post_code: postCode,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully.");

    const newUser = {
      name,
      email,
      password: hashedPassword,
      is_admin: false,
      city_id: city.id,
      created_at: new Date(),
    };

    const user = await User.create(newUser);
    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (err) {
    console.error("Error during user registration:", err);
    return res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const tokenId = req.user.id;
    const isAdmin = req.user.admin;

    const { is_admin, ...updateFields } = req.body;

    //Verify if user in database
    const existingUser = await User.getById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    //Verify if user is trying to update himself, or if he is admin
    if (!isAdmin && userId !== tokenId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this user" });
    }

    //Verify if user is admin
    if (!isAdmin && is_admin !== undefined) {
      return res.status(403).json({ message: "You can't change your role" });
    }

    const fieldsToUpdate = isAdmin ? req.body : updateFields;

    const updatedUser = await User.update(userId, fieldsToUpdate);

    const {password, ...user} = updatedUser

    return res
      .status(200)
      .json({ message: "User updated successfully", user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tokenId = req.user.id;

    const existingUser = await User.getById(id);

    if (!existingUser) {
      return res.status(400).json({ error: "Invalid request" });
    }

    if (id !== tokenId) {
      return res
        .status(403)
        .json({ error: "You're not authorized to delete this user" });
    }

    await User.delete(id);

    return res.status(200).json({ message: "user deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const userController = { getAllUsers, getOneUser, createUser,updateUser, deleteUser };
export default userController;
