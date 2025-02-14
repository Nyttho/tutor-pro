import Student from "../models/Student.js";
import City from "../models/City.js";
import {
  emailValidator,
  validateFrenchPhoneNumber,
} from "../utils/validations.js";

//ajouter un vérificateur lié aux cours, si le dernier cours a eu lieu il y'a plus de 6 mois (par exemple passer l'étudiant en mode inactif)
const getAllStudents = async (req, res) => {
  try {
    const user = req.user;

    const students = (await Student.getAll()).filter(
      (s) => s.created_by === user.id
    );

    if (students.length === 0) {
      return res.status(404).json({ error: "Students not found" });
    }

    res.status(200).json({ students });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

const studentController = { getAllStudents, createStudent };

export default studentController;
