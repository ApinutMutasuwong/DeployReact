import React from "react";
import Tick from "../image/tick.png";

export default function Step3() {
  return (
    <div className="submit-info-container">
      <img src={Tick} className="submit-icon" alt="Tick icon" />
      <h4>Submit your info</h4>
      <p className="submit-detail">
        Please review all the information you previously typed in the past
        steps, and if all is okay, submit your info to receive a confirmation
        within 24 years.
      </p>
    </div>
  );
}
