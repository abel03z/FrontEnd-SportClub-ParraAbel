// =============================================
//  SportClub – Sistema de Login
// =============================================

document.getElementById("formulariologin").addEventListener("submit",  async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
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

  try {
    // Petición de Login a la API
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    });

    const data = await response.json();

    console.log("Respuesta de la API:", data);

    if (!response.ok || !data.ok) {
      errorMsg.textContent = data.message || "Credenciales incorrectas";
      errorMsg.style.display = "block";
      return;
    }

    // Guardar usuario y token de sesión en el almacenamiento del navegador
    localStorage.setItem("user", JSON.stringify(data.data.user));
    localStorage.setItem("token", JSON.stringify(data.data.token));

    // Diccionario de rutas limpias
    const rutas = {
      user: "dashboard-usuario.html",
      coach: "dashboard-coach.html",
      admin: "dashboard-admin.html"
    };

    // CORRECCIÓN AQUÍ: Usamos .role (en inglés) que es lo que viene de la Base de Datos
    const userRole = data.data.user.role || data.data.user.rol; 
    
    if (rutas[userRole]) {
      window.location.href = rutas[userRole];
    } else {
      errorMsg.textContent = "Error: Rol de usuario no reconocido por el sistema.";
      errorMsg.style.display = "block";
    }

  } catch (error) {
    console.error("Error de conexión:", error);
    errorMsg.textContent = "No se pudo conectar con el servidor.";
    errorMsg.style.display = "block";
  }
});