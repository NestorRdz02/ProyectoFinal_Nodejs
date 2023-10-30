window.onload = init;
var headers = { 'Content-Type': 'application/json' };
var urlAPI = "http://localhost:3000";

function init() {
    if (localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': "bearer" + localStorage.getItem("token")
            }
        }
    }
    else {
        window.location.href = "index.html";
    }
}

function loadEmployee() {
    axios.get(url + "/employee", headers).then(function (res) {
        console.log(res);
        displayEmployee(res.data.message);
    }).catch(function (err) {
        console.log(err);
    })
}

function displayEmployee(employee) {
    var body = document.querySelector("body");
    for (var i = 0; i < employee.length; i++) {
        body.innerHTML += `<h3>${employee[i].employee_name}</h3>`;
    }
}

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
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
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
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
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
    var urlAPI = "http://localhost:3000";
    var id = document.getElementById('employeeId').value;
    try {
        const response = await fetch(`${urlAPI}/employees/${id}`, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") },
            method: 'delete'
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
        const response = await fetch(`${urlAPI}/employees/${id}`, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        });
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
        const response = await fetch(`${urlAPI}/employees/${name}`, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        });
        const data = await response.json();
        if (data.code === 200) {
            document.getElementById('message').innerHTML = "";
            data.message.forEach(employee => {
                let jump = document.createElement("div");
                jump.textContent = `Employee ID: ${employee.employee_id}, 
                Name: ${employee.employee_name}, 
                Last Name: ${employee.employee_last_name}, 
                Phone: ${employee.employee_phone_number}, 
                Email: ${employee.employee_mail}, 
                Address: ${employee.employee_address}`
                document.getElementById('message').append(jump);
            });
        } else {
            document.getElementById('message').textContent = data.message;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Error searching for employee.';
    }
}