/*eslint-disable no-undef*/

import NostraMapComponent from "./NostraMapComponent";
import "./search.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import WebSocket from 'ws';

function Search() {
  const [show, setShow] = useState(false);
  const [toilets, setToilets] = useState([]);
  const [filteredToilets, setFilteredToilets] = useState([]);
  const [selectedToiletTypes, setSelectedToiletTypes] = useState([]);
  const [selectedReviewStar, setSelectedReviewStar] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [ws, setWs] = useState(null); // Add this line to define the state
  const [mapCenter, setMapCenter] = useState(null);
  
  useEffect(() => {
    // Replace with your API endpoint
    const apiUrl = "https://3t9kkezy8a.execute-api.us-east-1.amazonaws.com/PrabApi"
    const postData = {}

    axios.post(apiUrl,postData)
      .then((response) => response.data)
      .then((data) => {
        setToilets(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    //   // Setup WebSocket connection
    // const nativeWebSocket = new WebSocket("ws://127.0.0.1:4000");
    // setWs(nativeWebSocket);

    // nativeWebSocket.onopen = () => {
    //   console.log("WebSocket connection established on search file");
    // };

    // nativeWebSocket.onmessage = (event) => {
    //   const data = event.data;
    //   console.log(`Received WebSocket data: ${data}`);
    //   // Handle data received from the server (e.g., map updates)
    // };

    // nativeWebSocket.onclose = () => {
    //   console.log("WebSocket connection closed on search file");
    // };

    // // Clean up the WebSocket connection when the component unmounts
    // return () => {
    //   nativeWebSocket.close();
    // };
  }, []);

  useEffect(() => {
    // Filter the toilets based on selected criteria
    const filteredToilets = toilets.filter((toilet) => {
      return (
        // Check if all selected types have a status of true
        selectedToiletTypes.every(
          (selectedType) => toilet[selectedType] === 1
        ) &&
        // Check the review stars criteria
        (selectedReviewStar === "" ||
          toilet.toilet_avg_rate >= parseInt(selectedReviewStar)) &&
        // Check the search query criteria
        (searchQuery === "" ||
          toilet.toilet_name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });

    setFilteredToilets(filteredToilets);
  }, [toilets, selectedToiletTypes, selectedReviewStar, searchQuery]);

  const toiletTypes = [
    "auto_toilet",
    "bidet_spray",
    "handicap_toilet",
    "squat_toilet",
  ];

  const toggleToiletType = (type) => {
    setSelectedToiletTypes((prevSelectedTypes) =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter((t) => t !== type)
        : [...prevSelectedTypes, type]
    );
    // setShow((show) => !show);
  };

  const handleShow = (event) => {
    setShow((show) => !show);
  };

  const handleReviewStarChange = (event) => {
    setSelectedReviewStar(event.target.value);
    // setShow((show) => !show);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle toilet click event
  const handleToiletClick = (latitude, longitude) => {
    // console.log("Latitude:", latitude);
    // console.log("Longitude:", longitude);
    console.log(latitude, longitude);
    setMapCenter({ latitude, longitude });

    // ws.send(JSON.stringify({ latitude, longitude }));

    // Dispatch a custom event to notify the HTML file
    // const event = new CustomEvent("update-map", {
    //   detail: {
    //     latitude,
    //     longitude,
    //   },
    // });
    // document.dispatchEvent(event);
  };

  // const filteredToilets = toiletData.filter(
  //   (toilet) =>
  //     selectedToiletTypes.every((selectedType) =>
  //       toilet.toiletTypes.some(
  //         (type) => type.name === selectedType && type.status
  //       )
  //     ) &&
  //     (selectedReviewStar === "" ||
  //       toilet.reviewStar === parseInt(selectedReviewStar) ||
  //       toilet.reviewStar >= parseInt(selectedReviewStar)) &&
  //     (searchQuery === "" ||
  //       toilet.toiletName.toLowerCase().includes(searchQuery.toLowerCase()))
  // );

  return (
    <div className="main">
      <div className="search-bar">
        <div className="search-box">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            placeholder="Search"
          />
          <div>
            <button className="btn-search" onClick={handleShow}>
              <span>&#9776;</span>
            </button>
            <div className={show ? "extent-box" : "extent-box show"}>
              <ReviewStarSelect
                value={selectedReviewStar}
                onChange={handleReviewStarChange}
              />

              <ToiletTypeButtons
                selectedToiletTypes={selectedToiletTypes}
                toggleToiletType={toggleToiletType}
                toiletTypes={toiletTypes}
              />
            </div>
          </div>
        </div>
        <div className="main-box scrollable">
          {filteredToilets.map((toilet) => (
            <div
              key={toilet.toilet_id}
              className="toilet-detail"
              onClick={() =>
                handleToiletClick(
                  toilet.location_latitude,
                  toilet.location_longitude
                )
              }
            >
              <Detail
                key={toilet.toilet_id}
                name={toilet.toilet_name}
                value={toilet.toilet_avg_rate}
                address={toilet.toilet_address}
                district={toilet.toilet_district}
                province={toilet.toilet_province}
                zipCode={toilet.toilet_zip}
                at={toilet.auto_toilet}
                bs={toilet.bidet_spray}
                ht={toilet.handicap_toilet}
                st={toilet.squat_toilet}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="box overlay"></div>
      <div className="map-side">
      <NostraMapComponent mapCenter={mapCenter} onToiletClick={handleToiletClick} />
      </div>
    </div>
  );
}

export default Search;

function Detail({
  name,
  value,
  address,
  district,
  province,
  zipCode,
  at,
  bs,
  ht,
  st,
}) {
  // const trueTypes = type.filter((toiletType) => toiletType.status);
  const fullAddress = `${address}, ${district}, ${province}, ${zipCode}`;
  return (
    <div className="name-box">
      <h3>{name}</h3>
      <div className="review-box">
        <span>{value !== null ? value : 0}</span>
        <StarRating value={value} />
      </div>
      <p>{fullAddress}</p>
      <div className="feature-list">
        {at === 1 && <span className="feature">Auto Toilet</span>}
        {bs === 1 && <span className="feature">Bidet Spray</span>}
        {ht === 1 && <span className="feature">Handicap Toilet</span>}
        {st === 1 && <span className="feature">Squat Toilet</span>}
      </div>
    </div>
  );
}

function StarRating({ value }) {
  const stars = [];
  const filledStars = Math.round(value);
  for (let i = 0; i < 5; i++) {
    if (i < filledStars) {
      stars.push(
        <span key={i} className="star">
          &#9733;
        </span>
      );
    } else {
      stars.push(<span key={i}>&#9734;</span>);
    }
  }
  return <div className="star-rating">{stars}</div>;
}

function ReviewStarSelect({ value, onChange }) {
  return (
    <div>
      <select value={value} onChange={onChange}>
        <option value=""></option>
        <option value="1">1 Star</option>
        <option value="2">2 Stars</option>
        <option value="3">3 Stars</option>
        <option value="4">4 Stars</option>
        <option value="5">5 Stars</option>
      </select>
    </div>
  );
}

function ToiletTypeButtons({
  selectedToiletTypes,
  toggleToiletType,
  toiletTypes,
}) {
  return (
    <div className="feature-btn-box">
      {toiletTypes.map((type) => {
        const words = type.split(" ");
        const firstWord = words[0];

        return (
          <button
            key={firstWord}
            onClick={() => toggleToiletType(type)}
            className={
              selectedToiletTypes.includes(type)
                ? "selected feature-btn"
                : "feature-btn"
            }
          >
            {firstWord}
          </button>
        );
      })}
    </div>
  );
}
