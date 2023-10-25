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
    var id = document.getElementById('employeeId').value;
    var name = document.getElementById('employeeName').value;
    var lastName = document.getElementById('employeeLastName').value;
    var phone = document.getElementById('employeePhone').value;
    var email = document.getElementById('employeeEmail').value;
    var address = document.getElementById('employeeAddress').value;

    try {
        const response = await fetch(`${urlAPI}/employees/${id}`, {
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


async function searchEmployees() {
  const employeeName = document.getElementById('employeeName').value;
  try {
    const response = await fetch(`${urlAPI}/employees/${employeeName}`);
    const data = await response.json();
    const employeesTableBody = document.getElementById('employeesTableBody');
    employeesTableBody.innerHTML = '';

    if (data.code === 200) {
      data.message.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${employee.employee_name}</td>
          <td>${employee.employee_last_name}</td>
          <td>${employee.employee_phone_number}</td>
          <td>${employee.employee_mail}</td>
          <td>${employee.employee_address}</td>
        `;
        employeesTableBody.appendChild(row);
      });

      document.querySelector('.results').style.display = 'block';
    } else {
      document.querySelector('.results').style.display = 'none';
      alert('Empleado no encontrado.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Ocurrió un error al buscar empleados.');
  }
}
