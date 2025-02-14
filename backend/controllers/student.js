import Student from "../models/Student.js";
import City from "../models/City.js";
import {
  emailValidator,
  validateFrenchPhoneNumber,
} from "../utils/validations.js";

const createStudent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, surname, address, city, postCode, country, email, tel, age } =
      req.body;

    const requiredFields = [
      "name",
      "surname",
      "address",
      "city",
      "postCode",
      "country",
      "age",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Those fields are required : ${missingFields.join(", ")}`,
      });
    }

    if (
      (tel && !validateFrenchPhoneNumber(tel)) ||
      (email && !emailValidator(email))
    ) {
      return res.status(400).json({ error: "Please enter valid informations" });
    }

    const studentDb = await Student.getByInfos(name, surname, address);
    if (studentDb) {
      return res.status(409).json({ error: "Student already exists" });
    }

    let cityDb = await City.getByPostCode(country, postCode);
    if (!cityDb) {
      cityDb = await City.create({ country, name: city, post_code: postCode });
    }

    const newStudent = await Student.create({
      name,
      surname,
      address,
      city_id: cityDb.id,
      is_active: true,
      created_by: userId,
      created_at: new Date(),
      email,
      tel,
      age,
    });

    res
      .status(201)
      .json({ message: "Student Created Successfully", student: newStudent });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const studentController = { createStudent };

export default studentController;
