// =============================================
//  SportClub – Sistema de Login
//  6 usuarios: 2 por cada rol
// =============================================

const users = [
  // --- Usuarios regulares ---
  { user: "user1@sportclub.cl",  fullname: "Carlos Pérez Muñoz",  password: "1234", role: "user"  },
  { user: "user2@sportclub.cl",  fullname: "Ana Torres Soto",     password: "1234", role: "user"  },
  // --- Coaches ---
  { user: "coach1@sportclub.cl", fullname: "Felipe Mora Ríos",    password: "1234", role: "coach" },
  { user: "coach2@sportclub.cl", fullname: "Elena Rojas Vega",    password: "1234", role: "coach" },
  // --- Administradores ---
  { user: "admin1@sportclub.cl", fullname: "Mario González López", password: "1234", role: "admin" },
  { user: "admin2@sportclub.cl", fullname: "Laura Fuentes Araya",  password: "1234", role: "admin" }
];

// =============================================
//  Listener del formulario de login
// =============================================
document.getElementById("formulariologin").addEventListener("submit", function (e) {
  e.preventDefault();

  const email    = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("error-msg");

  // Limpiar mensaje anterior
  errorMsg.textContent = "";
  errorMsg.style.display = "none";

  // Validar campos vacíos
  if (!email || !password) {
    errorMsg.textContent = "Por favor completa todos los campos.";
    errorMsg.style.display = "block";
    return;
  }

  // Buscar usuario en el arreglo
  const found = users.find(u => u.user === email && u.password === password);

  if (!found) {
    errorMsg.textContent = "Credenciales incorrectas";
    errorMsg.style.display = "block";
    return;
  }

  // Guardar usuario en localStorage
  localStorage.setItem("user", JSON.stringify(found));

  // Redirigir según rol
  const rutas = {
    user:  "dashboard-usuario.html",
    coach: "dashboard-coach.html",
    admin: "dashboard-admin.html"
  };

  window.location.href = rutas[found.role];
});
