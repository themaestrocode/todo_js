const user = { firstName: "victor", lastName: "soderu", username: "1", email: "victorsoderu@gmail.com", password: "1" };

const loginButton = document.querySelector(".js-login-button");

loginButton.addEventListener("click", () => {
   const usernameInput = document.querySelector(".js-username");
   const passwordInput = document.querySelector(".js-password");

   ((usernameInput.value === user.username || usernameInput.value === user.email) && passwordInput.value === user.password) ?
      window.location.href = "home.html" : alert("empty or invalid details");
});
