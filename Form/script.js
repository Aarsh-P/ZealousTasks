function validateForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var age = document.getElementById('age').value;
    var gender = document.getElementById('gender').value;

    document.getElementById('nameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('ageError').innerText = '';
    document.getElementById('genderError').innerText = '';

    var isValid = true;

    var namePattern = /^[A-Za-z\s]+$/;
    if (name === "") {
        document.getElementById('nameError').innerText = 'Name is required.';
        isValid = false;
    } else if (!name.match(namePattern)) {
        document.getElementById('nameError').innerText = 'Name can only contain letters.';
        isValid = false;
    }

    var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email === "") {
        document.getElementById('emailError').innerText = 'Email is required.';
        isValid = false;
    } else if (!email.match(emailPattern)) {
        document.getElementById('emailError').innerText = 'Please enter a valid email address.';
        isValid = false;
    }

    if (age === "") {
        document.getElementById('ageError').innerText = 'Age is required.';
        isValid = false;
    } else if (isNaN(age) || age < 18) {
        document.getElementById('ageError').innerText = 'Age must be a number greater than 18.';
        isValid = false;
    }

    if (gender === "") {
        document.getElementById('genderError').innerText = 'Please select a gender.';
        isValid = false;
    }

    if (isValid) {
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('age', age);
        localStorage.setItem('gender', gender);

        alert('Form submitted successfully and data stored in localStorage!');
    }
    return isValid;
}
