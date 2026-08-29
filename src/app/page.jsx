"use client";
import "./page.module.css";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [view, setView] = useState("login");
  const router = useRouter();

  // Estados de registro
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Validaciones
  const validateEmail = (email) => {
    if (!email) return "El correo es obligatorio";
    if (!email.endsWith("@gmail.com")) {
      return "El correo debe terminar en @gmail.com";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "La contraseña es obligatoria";
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    if (password.length < 8 || !hasLetters || !hasNumbers) {
      return "La contraseña debe tener al menos 8 caracteres, incluir letras y números";
    }
    return "";
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) return "Debes confirmar la contraseña";
    if (password !== confirmPassword) {
      return "Las contraseñas no coinciden";
    }
    return "";
  };

  // Handlers de cambio
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setRegisterEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setRegisterPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setRegisterConfirmPassword(value);
    setErrors((prev) => ({
      ...prev,
      confirmPassword: validateConfirmPassword(registerPassword, value),
    }));
  };

  // Login
  const handleLogin = useCallback(() => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((u) => u.email === email && u.password === password);

    if (foundUser) {
      router.push("/home");
    } else {
      setErrors((prev) => ({ ...prev, login: "Correo o contraseña incorrectos" }));
    }
  }, [router]);

  // Register
  const handleRegister = useCallback(() => {
    const emailError = validateEmail(registerEmail);
    const passwordError = validatePassword(registerPassword);
    const confirmError = validateConfirmPassword(registerPassword, registerConfirmPassword);

    setErrors({ email: emailError, password: passwordError, confirmPassword: confirmError });
    setSuccessMessage("");

    if (!emailError && !passwordError && !confirmError) {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Verificar duplicado
      if (users.some((u) => u.email === registerEmail)) {
        setErrors((prev) => ({ ...prev, email: "Este usuario ya ha sido registrado" }));
        return;
      }

      // Guardar nuevo usuario
      users.push({ email: registerEmail, password: registerPassword });
      localStorage.setItem("users", JSON.stringify(users));

      setSuccessMessage("Usuario registrado correctamente");
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterConfirmPassword("");

      // Volver al login después de unos segundos
      setTimeout(() => {
        setView("login");
        setSuccessMessage("");
      }, 2000);
    }
  }, [registerEmail, registerPassword, registerConfirmPassword]);

  // Capturar Enter
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        if (view === "login") {
          handleLogin();
        } else if (view === "register") {
          handleRegister();
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [view, handleLogin, handleRegister]);

  return (
    <div className="main">
      <div className="background"></div>
      <div className="loader"></div>

      <div className="login-card">
        <div className={`form-container ${view}`}>
          {/* Vista Login */}
          <div className="form">
            <h2>Inicia sesión</h2>
            <div className="form-group">
              <input id="loginEmail" type="email" placeholder="Correo" />
            </div>
            <div className="form-group">
              <input id="loginPassword" type="password" placeholder="Contraseña" />
            </div>
            <button onClick={handleLogin}>Entrar</button>
            {errors.login && <span className="error">{errors.login}</span>}
            <p onClick={() => setView("register")}>¿Aún no tienes una cuenta?</p>
          </div>

          {/* Vista Register */}
          <div className="form">
            <h2>Regístrate</h2>

            <div className="form-group">
              <input
                id="registerEmail"
                type="email"
                placeholder="Correo"
                value={registerEmail}
                onChange={handleEmailChange}
                onFocus={() => setFocus((prev) => ({ ...prev, email: true }))}
                onBlur={() => setFocus((prev) => ({ ...prev, email: false }))}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <input
                id="registerPassword"
                type="password"
                placeholder="Contraseña"
                value={registerPassword}
                onChange={handlePasswordChange}
                onFocus={() => setFocus((prev) => ({ ...prev, password: true }))}
                onBlur={() => setFocus((prev) => ({ ...prev, password: false }))}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <input
                id="registerConfirmPassword"
                type="password"
                placeholder="Confirmar contraseña"
                value={registerConfirmPassword}
                onChange={handleConfirmPasswordChange}
                onFocus={() =>
                  setFocus((prev) => ({ ...prev, confirmPassword: true }))
                }
                onBlur={() =>
                  setFocus((prev) => ({ ...prev, confirmPassword: false }))
                }
                className={errors.confirmPassword ? "input-error" : ""}
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>

            <button onClick={handleRegister}>Crear cuenta</button>
            <p onClick={() => setView("login")}>¿Ya tienes una cuenta?</p>
          </div>
        </div>
      </div>

      <div className="title">
        <h1><strong>Bienvenido</strong></h1>
      </div>
    
          {successMessage && (
        <div className="overlay">
          <div className="success-card">
            <h2>{successMessage}</h2>
          </div>
        </div>
      )}


    </div>
  );
}
