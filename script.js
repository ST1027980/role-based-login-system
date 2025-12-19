// Simulated users database
const users = [
  { email: "admin@gov.za", password: "Admin@123", role: "admin" },
  { email: "user@gov.za", password: "User@123", role: "user" }
];

const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("loginError");

const loginCard = document.getElementById("loginCard");
const adminPanel = document.getElementById("adminPanel");
const userPanel = document.getElementById("userPanel");

// Persist session
document.addEventListener("DOMContentLoaded", checkSession);

// Login logic
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    errorMsg.textContent = "Invalid login credentials.";
    return;
  }

  localStorage.setItem("loggedUser", JSON.stringify(user));
  showDashboard(user.role);
});

// Show dashboard
function showDashboard(role) {
  loginCard.classList.add("hidden");

  if (role === "admin") {
    adminPanel.classList.remove("hidden");
  } else {
    userPanel.classList.remove("hidden");
  }
}

// Check existing session
function checkSession() {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  if (user) showDashboard(user.role);
}

// Logout
function logout() {
  localStorage.removeItem("loggedUser");
  location.reload();
}
