document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const contactTable = document.getElementById('contactTable');

    // Load contacts from local storage if available
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    let contactId = contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;
    renderContacts();

    function renderContacts() {
        contactTable.innerHTML = '';
        contacts.forEach(contact => {
            const newRow = `
                <tr id="contact-${contact.id}">
                    <td>${contact.id}</td>
                    <td>${contact.name}</td>
                    <td>${contact.phone}</td>
                    <td>${contact.email}</td>
                    <td>${contact.date}</td>
                    <td>
                        <button type="button" class="Edit" onclick="editContact(${contact.id})">Edit</button>
                        <button type="button" class="Delete" onclick="removeContact(${contact.id})">Delete</button>
                    </td>
                </tr>
            `;
            contactTable.insertAdjacentHTML('beforeend', newRow);
        });
    }

    function saveContactsToLocalStorage() {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    function clearForm() {
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('email').value = '';
    }

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();

        if (name && email) {
            const now = new Date();
            const dateString = now.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
            const newContact = { id: contactId++, name, phone, email, date: dateString };
            contacts.push(newContact);
            saveContactsToLocalStorage();
            renderContacts();
            clearForm();
        } else {
            alert('Please fill out all fields.');
        }
    });

    window.editContact = function (id) {
        const index = contacts.findIndex(contact => contact.id === id);
        if (index !== -1) {
            const name = prompt('Enter new name:');
            const phone = prompt('Enter new phone:');
            const email = prompt('Enter new email:');
            if (name && email) {
                contacts[index].name = name;
                contacts[index].phone = phone;
                contacts[index].email = email;
                const now = new Date();
                contacts[index].date = now.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',});
                saveContactsToLocalStorage();
                renderContacts();
            } else {
                alert('Please fill out all fields.');
            }
        }
    };

    window.removeContact = function (id) {
        const index = contacts.findIndex(contact => contact.id === id);
        if (index !== -1) {
            contacts.splice(index, 1);
            saveContactsToLocalStorage();
            renderContacts();
        }
    };
});