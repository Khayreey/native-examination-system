var userEmail = document.getElementById("email_id");
var pass = document.getElementById("pass_id");
var form = document.getElementById("form_id");
var x_pass = document.getElementById("x_pass_id");
var x_email = document.getElementById("x_email_id");

form.addEventListener("submit", function (e) {
  var currentEmail = window.localStorage.getItem("email");
  var currentPassword = window.localStorage.getItem("password");
  var email = userEmail.value;
  var password = pass.value;

  if (email === currentEmail) {
    if (password === currentPassword) {
    } else {
      e.preventDefault();
      pass.value = "";
      pass.setAttribute("placeholder", "Not Matching Password");
      x_pass.style.visibility = "visible";
      pass.style.borderBottom = "solid 2px red";
    }
  } else {
    e.preventDefault();
    userEmail.value = "";
    userEmail.setAttribute("placeholder", "Not A Valid Email");
    x_email.style.visibility = "visible";
    userEmail.style.borderBottom = "solid 2px red";
  }
});
pass.addEventListener("input", function () {
  x_pass.style.visibility = "hidden";
  pass.style.borderBottom = "solid 1px rgb(165, 113, 154)";
});
userEmail.addEventListener("input", function () {
  x_email.style.visibility = "hidden";
  userEmail.style.borderBottom = "solid 1px rgb(165, 113, 154)";
});
