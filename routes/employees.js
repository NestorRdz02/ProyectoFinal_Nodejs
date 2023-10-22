const express = require('express');
const employees = express.Router();
const db = require('../config/database');

employees.post("/", async (req, res, next) => {
    //const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
    const { employee_name, employee_last_name, employee_phone_number, employee_email, employee_address } = req.body;
    if (employee_name && employee_last_name && employee_phone_number && employee_email && employee_address) {
        let query = "INSERT INTO employees(employee_name, employee_last_name, employee_phone_number, employee_email, employee_address)";
        query += ` VALUES('${employee_name}', ${employee_last_name}, ${employee_phone_number}, ${employee_email}, ${employee_address})`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Información del empleado insertada." });
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error." });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

employees.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = `DELETE FROM employees WHERE employee_id=${req.params.id}`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "Empleado borrado correctamente" });
    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
});

employees.put('/:id([0-9]{1,3})', async (req, res, next) => {
    const {  employee_name, employee_last_name, employee_phone_number, employee_email, employee_address } = req.body;

    if (employee_name && employee_last_name && employee_phone_number && employee_email && employee_address) {
        let query = `UPDATE employees SET employee_name='${employee_name}', employee_last_name=${employee_last_name},`;
        query += `employee_phone_number=${employee_phone_number}, employee_email=${employee_email},`;
        query += `employee_email=${employee_email} WHERE employee_id=${req.params.id};`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente." });
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error." });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos." });
});

employees.patch('/:id([0-9]{1,3})', async (req, res, next) => {
    if (req.body.employee_name) {
        let query = `UPDATE employees SET employee_name='${req.body.employee_name}' WHERE employee_id=${req.params.id};`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
});

employees.get("/", async (req, res, next) => {
    const emply = await db.query("SELECT * FROM employees",);
    return res.status(200).json({ code: 200, message: emply });
});

employees.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    if (id >= 1 && id <= 722) {
        const emply = await db.query("SELECT * FROM employees WHERE employee_id=" + id + ";");
        return res.status(200).json({ code: 200, message: emply });
    }
    return res.status(404).send({ code: 404, message: "Empleado no encontrado." });
});

employees.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    const emply = await db.query("SELECT * FROM employees WHERE employee_name=" + name + ";");
    if (emply.length > 0) {
        return res.status(200).json({ code: 200, message: emply });
    }
    return res.status(404).send({ code: 404, message: "Empleado no encontrado" });
});

module.exports = employees;