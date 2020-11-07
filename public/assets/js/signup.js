$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var usernameInput = $("#username-input");
  var passwordInput = $("#password-input");

  // When the signup button is clicked, we validate the username and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim()
    };
    if (!userData.username || !userData.password) {
      return;
    } else {
    // If we have an username and password, run the signUpUser function
    signUpUser(userData.username, userData.password);
    usernameInput.val("");
    passwordInput.val("");
  }});

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(usernameInput, passwordInput) {
    $.post("/signup", {
      username: usernameInput,
      password: passwordInput
    })
      .then(function(data) {
        window.location.replace("../../members.html");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
