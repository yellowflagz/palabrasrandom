let submitButton = document.getElementById("reportSubmit");
let ele = document.getElementById("reportForm");
let wordInput = document.getElementById("wordInput");
console.log(wordInput);
if (wordInput.value === "") {
  submitButton.disabled = false;
} else {
  submitButton.disabled = true;
}