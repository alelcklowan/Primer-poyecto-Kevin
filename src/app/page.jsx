"use client";
import "./page.module.css";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [view, setView] = useState("login");
  const router = useRouter();

  // usestates del registro
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState({});
  //mostrar ocultar contrasenas
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  // validar email
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

  // handler cambios
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

  // login
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

  // register
  const handleRegister = useCallback(() => {
    const emailError = validateEmail(registerEmail);
    const passwordError = validatePassword(registerPassword);
    const confirmError = validateConfirmPassword(registerPassword, registerConfirmPassword);

    setErrors({ email: emailError, password: passwordError, confirmPassword: confirmError });
    setSuccessMessage("");

    if (!emailError && !passwordError && !confirmError) {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // verificar usuario existente
      if (users.some((u) => u.email === registerEmail)) {
        setErrors((prev) => ({ ...prev, email: "Este usuario ya ha sido registrado" }));
        return;
      }

      // push del register valido
      users.push({ email: registerEmail, password: registerPassword });
      localStorage.setItem("users", JSON.stringify(users));

      setSuccessMessage("Usuario registrado correctamente");
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterConfirmPassword("");

      // volver a login solo
      setTimeout(() => {
        setView("login");
        setSuccessMessage("");
      }, 2000);
    }
  }, [registerEmail, registerPassword, registerConfirmPassword]);

  // enter keydown
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
          {/* login */}
          <div className="form">
            <h2>Inicia sesión</h2>
           <div className="form-group">
              <input id="loginEmail" type="email" placeholder="Correo" />
            </div>
            <div className="form-group password-group">
              <input
                id="loginPassword"
                type={showLoginPassword ? "text" : "password"}
                placeholder="Contraseña"
              />
              <span
                className="toggle-password"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              >
                {showLoginPassword ? (
                  // ojo show
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                  </svg>
                ) : (
                  // ojo hide
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                    </svg>
                )}
              </span>
            </div>
            <button onClick={handleLogin}>Entrar</button>
            {errors.login && <span className="error">{errors.login}</span>}
            <p onClick={() => setView("register")}>¿Aún no tienes una cuenta?</p>
          </div>

          {/* register */}
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
              <span
                className="toggle-password"
                onClick={() => setShowRegisterPassword(!showRegisterPassword)}
              >
                {showRegisterPassword ? (
                // ojo show
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                  </svg>
                ) : (
                // ojo hide
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                    </svg>
                )}
              </span>
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
               <span
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                // ojo show
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                  </svg>
                ) : (
                // ojo hide
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                    </svg>
                )}
              </span>
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
