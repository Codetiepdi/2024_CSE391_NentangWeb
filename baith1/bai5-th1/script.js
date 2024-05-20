let employees = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    address: "Hà Nội, Việt Nam",
    phone: "0123456789",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@example.com",
    address: "TP Hồ Chí Minh, Việt Nam",
    phone: "0987654321",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@example.com",
    address: "Đà Nẵng, Việt Nam",
    phone: "0123456789",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    address: "Cần Thơ, Việt Nam",
    phone: "0987654321",
  },
  {
    id: 5,
    name: "Đặng Văn E",
    email: "dangvane@example.com",
    address: "Hải Phòng, Việt Nam",
    phone: "0123456789",
  },
];

let editingEmployeeId = null;

document
  .getElementById("employeeFormElement")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    if (editingEmployeeId === null) {
      const newEmployee = {
        id: employees.length ? employees[employees.length - 1].id + 1 : 1,
        name,
        email,
        address,
        phone,
      };
      employees.push(newEmployee);
    } else {
      const employee = employees.find((emp) => emp.id === editingEmployeeId);
      employee.name = name;
      employee.email = email;
      employee.address = address;
      employee.phone = phone;
      editingEmployeeId = null;
    }

    hideForm();
    renderEmployeeTable();
  });

function renderEmployeeTable() {
  const tbody = document.getElementById("employeeTableBody");
  tbody.innerHTML = "";
  employees.forEach((employee) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><input type="checkbox" class="employeeCheckbox" data-id="${employee.id}"></td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.address}</td>
            <td>${employee.phone}</td>
            <td>
                <button class="edit-button" onclick="editEmployee(${employee.id})">✏️</button>
                <button class="delete-button" onclick="deleteEmployee(${employee.id})">🗑️</button>
            </td>
        `;
    tbody.appendChild(row);
  });
}

function showAddEmployeeForm() {
  document.getElementById("formTitle").textContent = "Thêm nhân viên mới";
  document.getElementById("employeeFormElement").reset();
  editingEmployeeId = null;
  document.getElementById("employeeForm").style.display = "block";
}

function editEmployee(id) {
  const employee = employees.find((emp) => emp.id === id);
  document.getElementById("formTitle").textContent = "Sửa thông tin nhân viên";
  document.getElementById("name").value = employee.name;
  document.getElementById("email").value = employee.email;
  document.getElementById("address").value = employee.address;
  document.getElementById("phone").value = employee.phone;
  editingEmployeeId = id;
  document.getElementById("employeeForm").style.display = "block";
}

function hideForm() {
  document.getElementById("employeeForm").style.display = "none";
}

function deleteEmployee(id) {
  employees = employees.filter((employee) => employee.id !== id);
  renderEmployeeTable();
}

function selectAllEmployees() {
  const selectAllCheckbox = document.getElementById("selectAll");
  const employeeCheckboxes = document.querySelectorAll(".employeeCheckbox");
  employeeCheckboxes.forEach((checkbox) => {
    checkbox.checked = selectAllCheckbox.checked;
  });
}

function deleteSelectedEmployees() {
  const selectedCheckboxes = document.querySelectorAll(
    ".employeeCheckbox:checked"
  );
  selectedCheckboxes.forEach((checkbox) => {
    const employeeId = parseInt(checkbox.getAttribute("data-id"));
    employees = employees.filter((employee) => employee.id !== employeeId);
  });
  renderEmployeeTable();
}

function searchEmployee() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchInput) ||
      employee.email.toLowerCase().includes(searchInput) ||
      employee.address.toLowerCase().includes(searchInput) ||
      employee.phone.includes(searchInput)
  );
  renderFilteredTable(filteredEmployees);
}

function renderFilteredTable(filteredEmployees) {
  const tbody = document.getElementById("employeeTableBody");
  tbody.innerHTML = "";
  filteredEmployees.forEach((employee) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><input type="checkbox" class="employeeCheckbox" data-id="${employee.id}"></td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.address}</td>
            <td>${employee.phone}</td>
            <td>
                <button class="edit-button" onclick="editEmployee(${employee.id})">✏️</button>
                <button class="delete-button" onclick="deleteEmployee(${employee.id})">🗑️</button>
            </td>
        `;
    tbody.appendChild(row);
  });
}

// Render initial table
renderEmployeeTable();
