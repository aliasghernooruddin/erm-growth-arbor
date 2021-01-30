const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    email: { type: String, required: true },
    organisationId: { type: String, required: true },
    department: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    company: { type: String, required: true }
},
    { strict: true }
);



const Employee = mongoose.model("employees", employeeSchema);

module.exports = Employee;