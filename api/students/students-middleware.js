const Students = require('./students-model');

const checkStudentId = async (req, res, next) => {
  const id = req.params.id;
  try {
    const student = await Students.getById(id);
    if (!student) {
      res.status(404).json({
        message: `student with id ${id} is not found`
      });
    } else {
      req.student = student;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}

module.exports= { checkStudentId };