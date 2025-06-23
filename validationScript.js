
const form = document.getElementById("myForm");
const inputField = document.getElementById("inputField");
form.addEventListener("submit", function(event) {
  const inputValue = inputField.value;
  const alphnum = /^[a-zA-Z0-9]+$/;
  if (!alphnum.test(inputValue)) {
    event.preventDefault();
    console.log("Invalid input. Please enter only letters and numbers.");
    alert("Invalid input. Please enter only letters and numbers.");
  } else {
    event.preventDefault(); 
    alert("Form submitted successfully with valid input: " + inputValue);
  }
});







