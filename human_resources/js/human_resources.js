window.onload = init;
var headers = {'Content-Type': 'application/json'};
var url = "http://localhost:3000";

async function addEmployee() {
    var name = document.getElementById('employeeName').value;
    var lastName = document.getElementById('employeeLastName').value;
    var phone = document.getElementById('employeePhone').value;
    var email = document.getElementById('employeeEmail').value;
    var address = document.getElementById('employeeAddress').value;

    try {
        const response = await fetch('/employees', {
            method: 'post',
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
    const id = document.getElementById('employeeId').value;
    const name = document.getElementById('employeeName').value;
    const lastName = document.getElementById('employeeLastName').value;
    const phone = document.getElementById('employeePhone').value;
    const email = document.getElementById('employeeEmail').value;
    const address = document.getElementById('employeeAddress').value;

    try {
        const response = await fetch(`/employees/${id}`, {
            method: 'PUT',
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
    const id = document.getElementById('employeeId').value;

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