import Student from "../models/Student.js";
import City from "../models/City.js";
import {
  emailValidator,
  validateFrenchPhoneNumber,
} from "../utils/validations.js";

//ajouter un vérificateur lié aux cours, si le dernier cours a eu lieu il y'a plus de 6 mois (par exemple passer l'étudiant en mode inactif)
const getAllStudents = async (req, res) => {
  try {
    const userId = parseInt(req.user.id);

    const students = await Student.getByProfessorId(userId);

    if (students.length === 0) {
      return res.status(404).json({ error: "Students not found" });
    }

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneStudent = async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    const studentId = parseInt(req.params.id);

    const student = await Student.getById(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    if (student.createdBy !== userId) {
      return res
        .status(403)
        .json({ error: "You are not allowed to access this student" });
    }

    return res.status(200).json(student);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
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
      cityDb = await City.create({ country, name: city, postCode: postCode });
    }

    const newStudent = await Student.create({
      name,
      surname,
      address,
      cityId: cityDb.id,
      isActive: true,
      createdBy: userId,
      createdAt: new Date(),
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

const updateStudent = async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    const studentId = parseInt(req.params.id);

    //is_active sera géré par les cours, si + de 6 mois => inactif, si inactif et nouveau cour => actif
    const { name, surname, address, city, postCode, country, email, tel, age } =
      req.body;

    const student = await Student.getById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    if (parseInt(student.createdBy) !== userId) {
      return res
        .status(403)
        .json({ error: "You are not allowed to update this student" });
    }

    //keep actual city id
    let cityId = student.cityId;

    // If Post code or city then check is city in DB
    if (city && postCode && country) {
      let cityDb = await City.getByPostCode(country, postCode);

      if (!cityDb) {
        //if not, create city in DB
        cityDb = await City.create({
          country,
          name: city,
          postCode: postCode,
        });
      }

      cityId = cityDb.id;
    }

    if (tel) {
      const validTel = validateFrenchPhoneNumber(tel);
      if (!validTel) {
        return res.status(400).json({ error: "Phone number must be valid" });
      }
    }

    if (email) {
      const validMail = emailValidator(email);
      if (!validMail) {
        return res.status(400).json({ error: "email must be valid" });
      }
    }

    // update student infos
    const updatedStudent = await Student.update(studentId, {
      name: name || student.name,
      surname: surname || student.surname,
      address: address || student.address,
      cityId: cityId,
      email: email || student.email,
      tel: tel || student.tel,
      age: age || student.age,
    });

    return res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    const studentId = parseInt(req.params.id);

    const student = await Student.getById(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    if (parseInt(student.createdBy) !== userId) {
      return res
        .status(403)
        .json({ error: "You are not allowed to delete this student" });
    }

    if (student.isDeleted) {
      return res.status(400).json({ error: "Student is already deleted" });
    }

    const deleteResult = await Student.delete(studentId);

    if (!deleteResult) {
      return res.status(500).json({ error: "Failed to delete student" });
    }

    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const studentController = {
  getAllStudents,
  getOneStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};

export default studentController;
