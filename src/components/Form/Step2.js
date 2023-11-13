import React from "react";

const Step2 = ({ formData, handleChange }) => {
  return (
    <div className="Toilet-info-container">
      <div>
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>District</label>
        <input
          type="text"
          name="district"
          value={formData.district}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Province</label>
        <input
          type="text"
          name="province"
          value={formData.province}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Zip Code</label>
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};

export default Step2;
