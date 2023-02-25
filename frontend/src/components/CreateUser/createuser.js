import React, { useState } from "react";
import "./createuser.css";

function Createuser() {
  const [isHacker, setIsHacker] = useState(false);
  const [isGeneral, setIsGeneral] = useState(false);
  const [isTeam, setIsTeam] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  return (
    <div>
      <div class="d-flex justify-content-center text-center">
        <h1 class="font header">Admin Portal</h1>
      </div>
      <div class="d-flex justify-content-center">
        <h1 id="text">Enter the email address:</h1>
      </div>
      <div class="d-flex justify-content-center">
        <input
          id="email-box"
          type="text"
          class="text-option-box"
          placeholder="test@example.com"
        />
      </div>
      <div class="d-flex justify-content-center">
        <div class="option-box" id="option-box">
          <div class="d-flex">
            <div
              class={isGeneral === true ? "user-filled-circle" : "user-circle"}
              onClick={() => {
                setIsHacker(false);
                setIsGeneral(!isGeneral);
                setIsSpeaker(false);
                setIsTeam(false);
              }}
            />
            <h5>General</h5>
          </div>
          <div class="d-flex">
            <div
              class={isSpeaker === true ? "user-filled-circle" : "user-circle"}
              onClick={() => {
                setIsHacker(false);
                setIsGeneral(false);
                setIsSpeaker(!isSpeaker);
                setIsTeam(false);
              }}
            />
            <h5>Speaker</h5>
          </div>
          <div class="d-flex">
            <div
              class={isTeam === true ? "user-filled-circle" : "user-circle"}
              onClick={() => {
                setIsHacker(false);
                setIsGeneral(false);
                setIsSpeaker(false);
                setIsTeam(!isTeam);
              }}
            />
            <h5>Team</h5>
          </div>
          <div class="d-flex">
            <div
              class={isHacker === true ? "user-filled-circle" : "user-circle"}
              onClick={() => {
                setIsHacker(!isHacker);
                setIsGeneral(false);
                setIsSpeaker(false);
                setIsTeam(false);
              }}
            />
            <h5>Hacker</h5>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <button
          class="btn btn-primary btn-size"
          onClick={() => {
            const successText = document.getElementById("success-text");
            const emailError = document.getElementById("email-error");
            const validEmail = document.getElementById("validemail-error");
            const fieldError = document.getElementById("field-error");
            const radioSelectError = document.getElementById("radio-error");
            const emailBox = document.getElementById("email-box");
            const emailRegex = /[\w]+@+[\w]+\.+[\w]{1,}/g;
            if (
              (emailBox.value === null || emailBox.value === "") &&
              !isSpeaker &&
              !isGeneral &&
              !isHacker &&
              !isTeam
            ) {
              emailError.style.display = "none";
              fieldError.style.display = "flex";
              successText.style.display = "none";
              validEmail.style.display = "none";
            } else {
              fieldError.style.display = "none";
              successText.style.display = "none";
              validEmail.style.display = "none";
              if (emailBox.value === null || emailBox.value === "") {
                emailError.style.display = "flex";
              } else {
                if (!emailRegex.test(emailBox.value)) {
                }
                emailError.style.display = "none";
              }
              if (!isSpeaker && !isGeneral && !isHacker && !isTeam) {
                radioSelectError.style.display = "flex";
              } else {
                radioSelectError.style.display = "none";
              }
            }
            if (
              emailBox.value !== null &&
              emailBox.value !== "" &&
              (isSpeaker || isGeneral || isHacker || isTeam)
            ) {
              console.log(emailRegex.test(emailBox.value));
              if (!emailRegex.test(emailBox.value)) {
                validEmail.style.display = "flex";
              } else {
                fieldError.style.display = "none";
                radioSelectError.style.display = "none";
                emailError.style.display = "none";
                validEmail.style.display = "none";
                var text = "";
                if (isTeam) {
                  text += "team";
                } else if (isSpeaker) {
                  text += "speaker";
                } else if (isHacker) {
                  text += "hacker";
                } else {
                  text += "general";
                }
                fetch(
                  "https://damp-sierra-23787.herokuapp.com/https://us-central1-web3-atl-nfts.cloudfunctions.net/addEmail?param=" +
                    emailBox.value +
                    "&param=" +
                    text
                );

                successText.style.display = "flex";
              }
            }
          }}
        >
          Upload
        </button>
      </div>
      <div class="d-flex justify-content-center">
        <h1 id="success-text" className="alert alert-success success-text">
          It was successfully added
        </h1>
      </div>
      <div class="d-flex justify-content-center">
        <h1 id="email-error" className="alert alert-danger success-text">
          Please enter an email
        </h1>
      </div>
      <div class="d-flex justify-content-center">
        <h1 id="field-error" className="alert alert-danger success-text">
          Please enter all fields
        </h1>
      </div>
      <div class="d-flex justify-content-center">
        <h1 id="validemail-error" className="alert alert-danger success-text">
          Please enter a valid email address
        </h1>
      </div>
      <div class="d-flex justify-content-center">
        <h1 id="radio-error" className="alert alert-danger success-text">
          Please select a radio button
        </h1>
      </div>
    </div>
  );
}

export default Createuser;
