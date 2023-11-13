import React, { Component } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import "./form-style.css";
import "./queries.css";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      formData: {
        toiletName: "",
        photo: "",
        address: "",
        district: "",
        province: "",
        zipCode: "",
        longitude: "",
        latitude: "",
        toiletTypes: [
          { id: 1, name: "Bidet spray", status: false },
          { id: 2, name: "Squat toilet", status: false },
          { id: 3, name: "Auto toilet", status: false },
          { id: 4, name: "Handicap toilet", status: false },
        ],
      },

      errors: {},
      images: [],
    };
  }
  handleRemoveImage = (index) => {
    this.setState((prevState) => {
      const updatedImages = [...prevState.formData.photo];
      updatedImages.splice(index, 1); // Remove the image at the specified index

      return {
        formData: {
          ...prevState.formData,
          photo: updatedImages.length > 0 ? updatedImages : "", // Set photo to "" if no images remain
        },
      };
    });
  };

  handleImageUpload = (images) => {
    if (images.length < 1) return;

    const convertImageToBase64 = (image) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(image);
      });
    };

    const base64Promises = images.map((image) => convertImageToBase64(image));

    const newImageURLs = [];
    images.forEach((image) => newImageURLs.push(URL.createObjectURL(image)));

    Promise.all(base64Promises)
    .then((base64Array) => {
      const newImageURLs = images.map((image) => URL.createObjectURL(image));

      // Update the component's state using setState
      this.setState((prevState) => ({
        formData: {
          ...prevState.formData,
          photo: base64Array,
        },
      }));
    })
    .catch((error) => {
      console.error("Error converting images to base64:", error);
    });

    
  };

  // Function to toggle the status of a toilet type
  toggleToiletTypeStatus = (id) => {
    this.setState((prevState) => {
      const updatedToiletTypes = prevState.formData.toiletTypes.map((type) => {
        if (type.id === id) {
          return { ...type, status: !type.status };
        }
        return type;
      });

      return {
        formData: {
          ...prevState.formData,
          toiletTypes: updatedToiletTypes,
        },
      };
    });
  };

  // Function to handle form submission for each step
  handleSubmit = (event) => {
    event.preventDefault();
    const { step, formData, images } = this.state;

    // If the current step is the last step, you can submit the form data
    if (step === 4) {
      // Handle form submission or API request here
      //console.log("Form submitted:", formData);
      //console.log(images);
      //alert(JSON.stringify(formData));

      // axios.post("http://127.0.0.1:5000/submit", formData); //"http://172.31.33.5:5000/submit"

      /////////////////////////////////////////////
      //console.log('formData')

      const apiUrl = "https://3919xnxkq7.execute-api.us-east-1.amazonaws.com/addressDB"; /// API gateway URL
      const requestData = {
        data: formData,
      };
      
      axios.post(apiUrl, requestData)
        .then((response) => console.log(response))
        .then((data) => {
          //this.setState({ responseMessage: data.message });
        })
        .catch((error) => {
          console.error(error);
        });

      const picupUrl = "https://no12tec5k5.execute-api.us-east-1.amazonaws.com/ToS3"
      
      axios.post(picupUrl,requestData)
        .then((response) => console.log(response))
        .catch((error) => {
          console.error(error);
        });
     
      
      /////////////////////////////////////////////////
    } else {
      // Proceed to the next step
      this.setState({ step: step + 1 });
      console.log(formData);
    }
  };

  // Function to update form data when input fields change
  handleInputChange = (event) => {
    const { name, value } = event.target;
    const { formData } = this.state;
    this.setState({ formData: { ...formData, [name]: value } });
    // console.log(formData.latitude);
    // console.log(formData.longitude);
  };

  // Function to go to the previous step
  goToPreviousStep = () => {
    const { step } = this.state;
    if (step > 1) {
      this.setState({ step: step - 1 });
    }
  };

  render() {
    const { step, formData } = this.state;
    const FormTitles = ["Toilet details", "Toilet location", " "];
    return (
      <div className="form">
        <div className="form-container">
          <div className="numbers">
            <div className={step >= 1 ? "num active" : "num"}>1</div>
            <div id="number-line" className={step >= 2 ? "active" : ""}></div>
            <div className={step >= 2 ? "num active" : "num"}>2</div>
            <div id="number-line" className={step >= 3 ? "active" : ""}></div>
            <div className={step >= 3 ? "num active" : "num"}>3</div>
            <div id="number-line" className={step >= 4 ? "active" : ""}></div>
            <div className={step >= 4 ? "num active" : "num"}>4</div>
          </div>
          <div className="header">
            <h1>{FormTitles[step - 1]}</h1>
          </div>
          <form onSubmit={this.handleSubmit}>
            {step === 1 && (
              <Step1
                formData={formData}
                handleChange={this.handleInputChange}
                toggleToiletTypeStatus={this.toggleToiletTypeStatus}
                handleImageUpload={this.handleImageUpload}
                handleRemoveImage={this.handleRemoveImage}
              />
            )}
            {step === 2 && (
              <Step2
                formData={formData}
                handleChange={this.handleInputChange}
              />
            )}
            {step === 3 && (
              <Step4
                formData={formData}
                handleChange={this.handleInputChange}
              />
            )}
            {step === 4 && <Step3 />}
            <div className="footer">
              <button
                className={step === 1 ? "hidden" : ""}
                type="button"
                onClick={this.goToPreviousStep}
              >
                Previous
              </button>

              {step < 4 && (
                <button className="btn" type="submit">
                  Next
                </button>
              )}
              {step === 4 && (
                <button
                  onClick={(event) => (window.location.href = "/ ")}
                  className="btn"
                  type="submit"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
