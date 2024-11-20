document
  .getElementById("register-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      login: document.getElementById("register-login").value,
      email: document.getElementById("register-email").value,
      password: document.getElementById("register-password").value,
      description: document.getElementById("register-description").value,
    };

    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    alert(await res.text());
  });

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    login: document.getElementById("login-login").value,
    password: document.getElementById("login-password").value,
  };

  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const response = await res.json();
  if (response.success) {
    document.getElementById("auth-forms").style.display = "none";
    document.getElementById("logout-button").style.display = "block";
    alert("Успішний вхід!");
  } else {
    alert(response.message);
  }
});

document.getElementById("logout-button").addEventListener("click", () => {
  document.getElementById("auth-forms").style.display = "block";
  document.getElementById("logout-button").style.display = "none";
});
