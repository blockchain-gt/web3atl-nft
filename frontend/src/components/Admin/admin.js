import React from "react";
import "./admin.css";

String.prototype.hashCode = function () {
  var hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function admin() {
  return (
    <div>
      <div class="d-flex justify-content-center text-center">
        <h1 class="font header">Admin Login</h1>
      </div>
      <div className="d-flex justify-content-center">
        <input
          id="admin-email-box"
          type="text"
          class="admin-text-option-box"
          placeholder="Email address"
        />
      </div>
      <div className="d-flex justify-content-center">
        <input
          id="password-box"
          type="password"
          class="admin-text-option-box"
          placeholder="Password"
        />
      </div>
      <div class="d-flex justify-content-center">
        <h6 class="text-danger admin-error-message" id="passowrd-error-message">
          The password is incorrect
        </h6>
        <h6
          class="text-danger admin-error-message"
          id="admin-all-error-message"
        >
          Please fill out all fields
        </h6>
      </div>
      <div className="d-flex justify-content-center">
        <button
          class="btn btn-primary btn-size button-margin"
          onClick={() => {
            const password = document.getElementById("password-box");
            const email = document.getElementById("admin-email-box");
            const hash = password.value.hashCode();
            const all = document.getElementById("admin-all-error-message");
            const passwordError = document.getElementById(
              "passowrd-error-message"
            );
            if (hash === 1403730359) {
              all.style.display = "none";
              passwordError.style.display = "none";
              localStorage.setItem("loggedIn", "true");
              window.location.href = "/admin-page";
            } else {
              if (
                email.value === null ||
                email.value === "" ||
                password.value === null ||
                password.value === ""
              ) {
                all.style.display = "flex";
                passwordError.style.display = "none";
              } else {
                all.style.display = "none";
                passwordError.style.display = "flex";
              }
            }
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default admin;
