import React from "react";

export default function Step1({
  formData,
  handleChange,
  toggleToiletTypeStatus,
  handleImageUpload,
  handleRemoveImage,
}) {
  const onImageChange = (e) => {
    handleImageUpload([...e.target.files]);
  };

  const removeImage = (index) => {
    handleRemoveImage(index);
  };

  return (
    <div className="Toilet-info-container">
      <div>
        <label>Toilet Name</label>
        <input
          type="text"
          name="toiletName"
          value={formData.toiletName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="info-photo">
        <label>Photo (optional)</label>
        {Array.isArray(formData.photo) && formData.photo.length > 0 ? (
          <div className="img-box">
            {formData.photo.map((imageURL, index) => (
              <div key={index}>
                <img src={imageURL} alt={`Inserted imag ${index}`} />
                <button
                  className="close"
                  onClick={() => handleRemoveImage(index)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        ) : (
          <input
            className="photo-input"
            type="file"
            multiple
            accept="image/*"
            onChange={onImageChange}
          />
        )}
      </div>
      <div>
        <label>Feature</label>
        <div className="select-box">
          {formData.toiletTypes.map((type) => (
            <div
              key={type.id}
              className={`select ${type.status ? "get-choose" : ""}`}
            >
              <input
                type="checkbox"
                name={`toiletTypes-${type.id}`}
                checked={type.status}
                onChange={() => toggleToiletTypeStatus(type.id)}
              />
              <label className="choice-text">{type.name}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
