let reportRedirect = function reportRedirect() {
  window.setTimeout(function () {
    location.href = "/";
  }, 3000);
};

let submitButton = document.getElementById("reportSubmit");
let wordInput = document.getElementById("wordInput");
let reportForm = document.getElementById("reportForm");

submitButton.addEventListener("keyup", function (event) {
  if (event.key === 13) {
    reportForm.submit();
    submitButton.click();
  }
});

function success() {
  if (wordInput.value === "") {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}
function enableModal() {
  submitButton.setAttribute("data-bs-toggle", "modal");
  submitButton.setAttribute("data-bs-dismiss", "modal");
  submitButton.click();
  reportRedirect();
}

if (reportForm.addEventListener) {
  reportForm.addEventListener("submit", enableModal, false); //Modern browsers
} else if (ele.attachEvent) {
  reportForm.attachEvent("onsubmit", enableModal); //Old IE
}
