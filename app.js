const myform = document.getElementById("myForm");
const email = document.getElementById("email");
const username = document.getElementById("username");
const phone = document.getElementById("phone");
const dateInput = document.getElementById('date');
const genderRadios = document.getElementsByName('gender');
const interest = document.getElementsByName('interests');
const countrySelect = document.getElementById('country');
const fileInput = document.getElementById("uploadedFile");

myform.addEventListener('click', () => {
   if (email.validity.typeMismatch) {
          email.setCustomValidity('I am expecting an email address!');
          email.classList.add('error');
      } else {
          email.setCustomValidity('');
          email.classList.remove('error'); // Remove the 'error' class if it was previously added
        }

    const trimmedUsername = username.value.trim();
    if (trimmedUsername.length < 3) {
        username.setCustomValidity("Username should have at least 3 characters.");
        username.classList.add('error');
    } else {
        username.setCustomValidity("");
        username.classList.remove('error');
    }
    

    if (phone.validity.patternMismatch) {
        phone.setCustomValidity("Enter your phone number.");
        phone.classList.add('error');
    } else {
        phone.setCustomValidity("");
        phone.classList.remove('error');
    }

    const checkedRadio = Array.from(genderRadios).find(radio => radio.checked);

    if (!checkedRadio) {
        genderRadios.forEach(radio => {
            radio.setCustomValidity("Please select a gender.");
            radio.classList.add('error');
        });
        
    } else {
        genderRadios.forEach(radio => {
            radio.setCustomValidity("");
            radio.classList.remove('error');
        });
        
    }

    const checkedCheckbox = Array.from(interest).find(check => check.checked);
    if (!checkedCheckbox) {
        interest.forEach(check => {
            check.setCustomValidity('Please select at least one interest.');
        });
    } else {
        interest.forEach(check => {
            check.setCustomValidity('');
        });
    }

    if (dateInput.value === '') {
        dateInput.setCustomValidity('Please enter a valid date.');
    } else {
        // Clear the custom validity if the date is valid
        dateInput.setCustomValidity('');
    }

   


    if (countrySelect.value === '') {;
        countrySelect.setCustomValidity('Please select a country.');
    } else {
        // Clear the custom validity if a country is selected
        countrySelect.setCustomValidity('');
    }

    const file = fileInput.files[0];
    if (file) {
        // validateFile(file);
        validateFile(fileInput)
    }
   
});





function validateFile(fileInput) {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 60 * 1024; // 60 KB in bytes
  
    const file = fileInput.files[0]; // Access the file object from the file input
  
    if (!file) {
      // No file selected
      fileInput.setCustomValidity("Please select a file.");
      fileInput.reportValidity();
      return;
    }
  
    if (file.size > maxSize) {
      // File size exceeds the allowed limit
      const maxFileSizeKB = maxSize / 1024;
      const actualFileSizeKB = file.size / 1024;
      fileInput.setCustomValidity(`File is too big. Please select a file smaller than ${maxFileSizeKB} KB (Current size: ${actualFileSizeKB.toFixed(2)} KB).`);
      fileInput.reportValidity();
      fileInput.value = ""; // Clear the file input to allow reselection
      return;
    }
  
    if (!allowedTypes.includes(file.type)) {
      // Invalid file type
      fileInput.setCustomValidity("Please select a valid file type (JPEG, PNG, or PDF).");
      fileInput.reportValidity();
      fileInput.value = ""; // Clear the file input to allow reselection
      return;
    }
  
    // File is valid, clear custom validity
    fileInput.setCustomValidity("");
    fileInput.reportValidity();
  }
  