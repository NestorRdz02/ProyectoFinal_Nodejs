window.onload = init;
var headers = { 'Content-Type': 'application/json' };
var urlAPI = "http://localhost:3000";

async function addEmployee() {
    var urlAPI = "http://localhost:3000";
    var name = document.getElementById('employeeName').value;
    var lastName = document.getElementById('employeeLastName').value;
    var phone = document.getElementById('employeePhone').value;
    var email = document.getElementById('employeeEmail').value;
    var address = document.getElementById('employeeAddress').value;

    console.log("Name:", name);
    console.log("Last Name:", lastName);
    console.log("Phone:", phone);
    console.log("Email:", email);
    console.log("Address:", address);
    try {
        const response = await fetch(`${urlAPI}/employees/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                employee_name: name,
                employee_last_name: lastName,
                employee_phone_number: phone,
                employee_mail: email,
                employee_address: address
            })
        });
        const data = await response.json();
        document.getElementById('message').textContent = data.message;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Error al añadir empleado.';
    }
}

async function updateEmployee() {
    var urlAPI = "http://localhost:3000";
    var id = document.getElementById('employeeId').value;
    var name = document.getElementById('employeeName').value;
    var lastName = document.getElementById('employeeLastName').value;
    var phone = document.getElementById('employeePhone').value;
    var email = document.getElementById('employeeEmail').value;
    var address = document.getElementById('employeeAddress').value;

    try {
        const response = await fetch(`${urlAPI}/employees/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                employee_name: name,
                employee_last_name: lastName,
                employee_phone_number: phone,
                employee_mail: email,
                employee_address: address
            })
        });
        const data = await response.json();
        document.getElementById('message').textContent = data.message;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Error al actualizar empleado.';
    }
}

async function deleteEmployee() {
    const id = document.getElementById('${urlAPI}employeeId').value;

    try {
        const response = await fetch(`/employees/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        document.getElementById('message').textContent = data.message;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Error al eliminar empleado.';
    }
}

async function searchEmployeeById() {
    var urlAPI = "http://localhost:3000";

    var id = document.getElementById('searchEmployeeId').value;

    try {
        const response = await fetch(`${urlAPI}/employees/${id}`);
        const data = await response.json();
        if (data.code === 200) {
            var employee = data.message[0];
            document.getElementById('message').textContent = `Employee ID: ${employee.employee_id}, 
            Name: ${employee.employee_name}, 
            Last Name: ${employee.employee_last_name}, 
            Phone: ${employee.employee_phone_number}, 
            Email: ${employee.employee_mail}, 
            Address: ${employee.employee_address}`;
        } else {
            document.getElementById('message').textContent = data.message;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Error searching for employee.';
    }
}

async function searchEmployeeByName() {
    var urlAPI = "http://localhost:3000";

    var name = document.getElementById('searchEmployeeName').value;

    try {
        const response = await fetch(`${urlAPI}/employees/${name}`);
        const data = await response.json();
        if (data.code === 200) {
            var employee = data.message[0];
            document.getElementById('message').textContent = `Employee ID: ${employee.employee_id}, 
            Name: ${employee.employee_name}, 
            Last Name: ${employee.employee_last_name}, 
            Phone: ${employee.employee_phone_number}, 
            Email: ${employee.employee_mail}, 
            Address: ${employee.employee_address}`;
        } else {
            document.getElementById('message').textContent = data.message;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Error searching for employee.';
    }
}

