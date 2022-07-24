var form = document.getElementById("sign_form_id");
var userName = document.getElementById("user_id");
var userEmail = document.getElementById("email_id");
var pass = document.getElementById("pass_id");
var repass = document.getElementById("repass_id");
var nameRegex = /^[a-zA-Z\-]+$/;
var emailRegex = /\S+@\S+\.\S+/;
var x_name = document.getElementById("x_id");
var x_pass = document.getElementById("x_pass_id");
var x_email = document.getElementById("x_email_id");

form.addEventListener("submit", function (e) {
  var email = userEmail.value;
  var user = userName.value;
  var password = pass.value;
  var re_pass = repass.value;
  if (nameRegex.test(user) === true) {
    if (emailRegex.test(email) === true) {
      if (password === re_pass) {
        window.localStorage.setItem("name", user);
        window.localStorage.setItem("email", email);
        window.localStorage.setItem("password", password);
      } else {
        e.preventDefault();
        repass.value = "";
        repass.setAttribute("placeholder", "Not Matching Password");
        x_pass.style.visibility = "visible";
        repass.style.borderBottom = "solid 2px red";
      }
    } else {
      e.preventDefault();
      userEmail.value = "";
      userEmail.setAttribute("placeholder", "Not A Valid Email");
      x_email.style.visibility = "visible";
      userEmail.style.borderBottom = "solid 2px red";
    }
  } else {
    e.preventDefault();
    userName.value = "";
    userName.setAttribute("placeholder", "Enter A valid Name");
    x_name.style.visibility = "visible";
    userName.style.borderBottom = "solid 2px red";
  }
});
userName.addEventListener("input", function () {
  x_name.style.visibility = "hidden";
  userName.style.borderBottom = "solid 1px rgb(165, 113, 154)";
});
repass.addEventListener("input", function () {
  x_pass.style.visibility = "hidden";
  repass.style.borderBottom = "solid 1px rgb(165, 113, 154)";
});
userEmail.addEventListener("input", function () {
  x_email.style.visibility = "hidden";
  userEmail.style.borderBottom = "solid 1px rgb(165, 113, 154)";
});
