class Customer {
    constructor(id, fullName, email, phone, address) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }
}

let customers = [];
function init() {
    customers = [
        new Customer(1, "Thủy", "thuy@gmail.com", "012345668", "Huế"),
        new Customer(2, "Bích Thủy", "thuy123@gmail.com", "012345577", "Huế"),
    ]
}

function renderTable() {
    let tbCustomer = '';
    customers.forEach(function (customer) {
        tbCustomer += `<tr>
                            <td scope="row">${customer.id}</td>
                            <td>${customer.fullName}</td>
                            <td>${customer.email}</td>
                            <td>${customer.phone}</td>
                            <td>${customer.address}</td>
                            <td>
                                <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="renderEditModal(${customer.id})">
                                <i class="fa-solid fa-pen-to-square"></i></button>
                                <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" onclick="removeModal(${customer.id})"
                                        data-bs-target="#exampleModal1"><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>`;
        document.querySelector('.table>tbody').innerHTML = tbCustomer;
    })
}

function addCustomer() {
    let id = getMaxId() + 1;
    let fullName = document.getElementById("fullName").value;
    if (isEmpty(fullName)) {
        alert('Please enter information');
        return;
    }
    let email = document.getElementById("email").value;
    if (isEmpty(email)) {
        alert('Please enter information');
        return;
    }
    let phone = document.getElementById("phone").value;
    if (isEmpty(phone)) {
        alert('Please enter information');
        return;
    }
    let address = document.getElementById("address").value;
    if (isEmpty(address)) {
        alert('Please enter information');
        return;
    }

    customers.push(new Customer(id, fullName, email, phone, address));

    renderTable();
    resetForm();
}

function renderEditModal(customer_id) {
    let customer = findCustomerById(customer_id);
    if (customer != null) {
        document.getElementById("idUpdate").value = customer.id;
        document.getElementById("fullnameUpdate").value = customer.fullName;
        document.getElementById("emailUpdate").value = customer.email;
        document.getElementById("phoneUpdate").value = customer.phone;
        document.getElementById("addressUpdate").value = customer.address;
    } else {
        alert("Not found this customer");
    }
}
function saveEdit(id) {
    let customer = findCustomerById(id);
    let fullName = document.getElementById("fullnameUpdate").value;
    if (isEmpty(fullName)) {
        alert('Please enter information');
        return;
    }
    customer.fullName = fullName;
    let email = document.getElementById("emailUpdate").value;
    if (isEmpty(email)) {
        alert('Please enter information');
        return;
    }
    customer.email = email;
    let phone = document.getElementById("phoneUpdate").value;
    if (isEmpty(phone)) {
        alert('Please enter information');
        return;
    }
    customer.phone = phone;
    let address = document.getElementById("addressUpdate").value;
    if (isEmpty(address)) {
        alert('Please enter information');
        return;
    }
    customer.address = address;

    for(let i = 0; i < customers.length; i++){
        if(customers[i].id == customer.id){
            customers[i] = customer;
        }
    }
    renderTable();

}
function removeModal(customer_id){
    let customer = findCustomerById(customer_id);
    if (customer != null) {
        document.getElementById("idRemove").value = customer.id;
        document.getElementById("fullnameRemove").value = customer.fullName;
        document.getElementById("emailRemove").value = customer.email;
        document.getElementById("phoneRemove").value = customer.phone;
        document.getElementById("addressRemove").value = customer.address;
    } else {
        alert("Not found this customer");
    }
}

function remove(id){
    for(let i = 0; i < customers.length; i++){
        if (customers[i].id == id) {
            customers.splice(i, 1);
            renderTable();
        }
    }
}

function findCustomerById(id) {
    for (let i = 0; i < customers.length; i++) {
        if (customers[i].id == id) {
            return customers[i];
        }
    }
    return null;
}

function getMaxId() {
    let max = 0;
    for (let i = 0; i < customers.length; i++) {
        if (customers[i].id > max) {
            max = customers[i].id;
        }
    }
    return max;
}
function resetForm() {
    document.getElementById("fullName").value = '';
    document.getElementById("email").value = '';
    document.getElementById("phone").value = '';
    document.getElementById("address").value = '';
}

function isEmpty(name) {
    return name == null || name.trim() == '';
}

function start() {
    init();
    renderTable();
}
start();