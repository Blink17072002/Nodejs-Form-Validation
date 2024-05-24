window.onload = () => {  // making sure DOM is loaded before running code
    const form = document.getElementById('form');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const otherNames = document.getElementById('otherNames');
    const email = document.getElementById('email');
    const phoneNumber = document.getElementById('phoneNumber');
    const gender = document.getElementById('gender');

    form.addEventListener('submit', e => {  // tracking submit button click event
        e.preventDefault();
        console.log('Form submit event triggered'); 
        if(checkInputs()) {
            console.log('Form inputs are valid'); 
            submitForm();
            console.log('Form submitted'); 
        }
    });

    function checkInputs() { // validating form with requirements
        const firstNameValue = firstName.value.trim();
        const lastNameValue = lastName.value.trim();
        const otherNamesValue = otherNames.value.trim();
        const emailValue = email.value.trim();
        const phoneNumberValue = phoneNumber.value.trim();
        const genderValue = gender.value;

        let isValid = true; // Assume form is valid initially

        if (firstNameValue === '') {
            setErrorFor(firstName, 'First name is required');
            isValid = false;
        } else if (!isValidName(firstNameValue)) {
            setErrorFor(firstName, 'First name cannot contain numbers');
            isValid = false;
        } else {
            setSuccessFor(firstName);
        }

        if (lastNameValue === '') {
            setErrorFor(lastName, 'Last name is required');
            isValid = false;
        } else if (!isValidName(lastNameValue)) {
            setErrorFor(lastName, 'Last name cannot contain numbers');
            isValid = false;
        } else {
            setSuccessFor(lastName);
        }

        if (otherNamesValue !== '' && !isValidName(otherNamesValue)) {
            setErrorFor(otherNames, 'Other names cannot contain numbers');
            isValid = false;
        } else {
            setSuccessFor(otherNames);
        }

        if (emailValue === '') {
            setErrorFor(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            setErrorFor(email, 'Email is not valid');
            isValid = false;
        } else {
            setSuccessFor(email);
        }

        if (phoneNumberValue === '') {
            setErrorFor(phoneNumber, 'Phone number is required');
            isValid = false;
        } else if (!isValidPhoneNumber(phoneNumberValue)) {
            setErrorFor(phoneNumber, 'Phone number is not valid');
            isValid = false;
        } else {
            setSuccessFor(phoneNumber);
        }

        if (genderValue === '') {
            setErrorFor(gender, 'Gender is required');
            isValid = false;
        } else {
            setSuccessFor(gender);
        }

        return isValid; // Return the validity status
    }

    function setErrorFor(input, message) {  // for error messages
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        small.innerText = message;
        formControl.className = 'form-control error';
    }

    function setSuccessFor(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    }

    function isValidName(name) {
        return /^[a-zA-Z]+$/.test(name);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhoneNumber(phone) {
        return /^\d{11}$/.test(phone);
    }

    function submitForm(){
        console.log('Submitting form...');

        const formData = {  // json
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            otherNames: otherNames.value.trim(),
            email: email.value.trim(),
            phoneNumber: phoneNumber.value.trim(),
            gender: gender.value
        }

        fetch('http://localhost:3000/submit', {  // fetching form data when a POST method is used
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success: ', data); // Handle success i.e show a success message
        })
        .catch(error => {
            console.error('Error', error); // Handle error i.e show error message
        });
    }
};
