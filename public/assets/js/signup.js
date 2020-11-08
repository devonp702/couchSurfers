$(document).ready(function() {
  var signUpForm = $("form.signup");
  var usernameInput = $("#username-input");
  var passwordInput = $("#password-input");

  // Event listener and validation that inputs are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim()
    };
    console.log(userData);
    // If either input is blank, return
    if (!userData.username || !userData.password) {
      return;
    }
    // If both inputs have been entered, run the signUpUser function
    signUpUser(userData.username, userData.password);
    username.val("");
    password.val("");
  });

  // POST to the signup route. If successful, redirect to the members page; otherwise, log any errors
  function signUpUser(username, password) {
    $.post("/signup", {
      username: username,
      password: password
    })
      .then(function(data) {
        window.location.replace("../../login.html");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
