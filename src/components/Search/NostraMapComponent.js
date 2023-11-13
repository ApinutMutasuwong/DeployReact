// import React from "react";

// class NostraMapComponent extends React.Component {
//   render() {
//     return (
//       <div className="map-page">
//         <iframe
//           src="http://localhost:4000" // Replace with your server's URL
//           title="Nostra Map"
//           width="100%"
//           height="100%"
//           frameBorder="0"
//         />
//       </div>
//     );
//   }
// }

// export default NostraMapComponent;

// NostraMapComponent.js
/* global nostra */
import React, { useEffect, useState } from "react";
import axios from "axios";

const NostraMapComponent = ({ mapCenter, onToiletClick }) => { 
  const [mapInitialized, setMapInitialized] = useState(false);
  let map;
  let pointLayer;

  useEffect(() => {
    const scriptSrc =
      "//api.nostramap.com/nostraapi/v2.0?key=GDdAoW1Vs(48(1ni3MvBQyXGF(HgoA3Xy4LhYd1tJ1N)BwfaEO0k)lySSnEV9(gn2wfgYAToSXKYfCpy2DC9O60=====2";

    // Remove existing script with the same source
    // const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    // if (existingScript) {
    //   document.body.removeChild(existingScript);
    // }

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    script.onload = initializeMap;

    // Append the new script to the body
    document.body.appendChild(script);

    // Cleanup: remove the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, [map]);

  const initializeMap = () => {
    console.log("NostraMap is ready!");
    

    nostra.onready = function () {
      map = new nostra.maps.Map("map", {
        id: "mapTest",
        logo: false,
        scalebar: false,
        basemap: "streetmap",
        slider: true,
        level: 15,
        lat: 13.726643935743672,
        lon: 100.775094041667220,
        country: "TH",
      });

      pointLayer = new nostra.maps.layers.GraphicsLayer(map, {
        id: "pointLayer",
        mouseOver: false,
      });
      map.addLayer(pointLayer);

      fetchToilets();

      // Set mapInitialized to true when the map is initialized
      setMapInitialized(true);

    };
  };

  const fetchToilets = () => {
    const apiUrl = "https://3t9kkezy8a.execute-api.us-east-1.amazonaws.com/PrabApi"
    const postData = {}

    axios.post(apiUrl,postData)
      .then((response) => response.data)
      .then((data) => {
        console.log('Data:', data);
        // Process the API data and add markers to the map
        for (const item of data) {
          // let item = data[i];
          console.log(item);
          let content = "";
          if (item.toilet_name) {
              content = "<div font-size:20px\"><strong>";
              content += content + item.toilet_name + "</strong></div>";
          }

          if (item.toilet_address) {
              content += content + "<hr>"
              content = content + item.toilet_address;
          }
          if (item.toilet_district) {
              content = content + "<br>" + item.toilet_district;
          }
          if (item.toilet_province) {
              content = content + "<br>" + item.toilet_province;
          }
          if (item.toilet_zip) {
              content = content + "<br>" + item.toilet_zip;
          }
          if (item.toilet_avg_rate){
              const rating = Math.round(item.toilet_avg_rate);
              console.log(rating);
              let star_rating = "";
              for (let i = 0; i < rating; i++) {
                  star_rating = star_rating + "<img src=\"https://developer.nostramap.com/developer/asset/image/icon/ic-customCallout-rating.png\" style=\"max-width: 18px; height: auto;\"> ";
              }
              // console.log(star_rating);
              content = content + "<br>" + star_rating + "<br>";
              // content = content + "<br>" + item.avg_rating
          }
          // if (item.bidet_spray) {
          //     content = content + "<img src=\"https://drive.google.com/uc?export=view&id=1OcYGuTp0jJfVszAaWbweS5qjVdTDIbXc\" width=\"64\" height=\"64\"> ";
          // }
          if (item.toilet_pic) {
              // console.log(item.toilet_pic);
              // var image_id = item.toilet_pic.split('/d/').pop().split('/view')[0];
              //console.log(item.toilet_pic.split('/d/').pop().split('/view')[0]);
              // content = content + "<br><img src=\"" + "https://drive.google.com/uc?export=view&id=" + image_id + "\" style=\"max-width: 100%; height: auto;\"> ";
              // content = content + "<br><img src=\"https://poopprom.s3.amazonaws.com/" + item.toilet_name.replace(/ /g, '') + "Pic" +"\" style=\"max-width: 100%; height: auto;\"> ";
              content = content + "<br><img src=\"https://poopprom.s3.amazonaws.com/an.png\" style=\"max-width: 100%; height: auto;\"> ";

                
          }
          console.log(content)
          addPin(item.location_latitude, item.location_longitude, item.toilet_name, content)
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
    });
  };

  const addPin = (latitude, longitude, title, content) => {
    console.log("Add Pin Start");
    try {
      const nostraCallout = new nostra.maps.CustomCallout({
        content: content,
        width: 256,
        height: 128,
        color: "#FFFFFF",
        fontSize: 20,
        fontColor: "#000000",
        fontFamily: "Sarabun New",
        showShadow: true,
      });
      const nostraLabel = new nostra.maps.symbols.Label({
        text: title,
        size: "10",
        position: "top",
      });
      const pointMarker = new nostra.maps.symbols.Marker({
        url: '',
        width: 60,
        height: 60,
        customCallout: nostraCallout,
        label: nostraLabel,
      });

      setTimeout(() => {
        pointLayer.addMarker(latitude, longitude, pointMarker);
      }, 1000);

      console.log("Add Pin Stop");

    } catch (error) {
      console.error("Error adding marker:", error);
    }

    // // Create an image element
    // const img = new Image();

    // // Extract the image URL using a more robust method
    // const srcRegex = /<img\s+src=["'](https:\/\/poopprom\.s3\.amazonaws\.com\/.*?)["']/;
    // const match = content.match(srcRegex);
    // const imageUrl = match ? match[1] : null;

    // if (imageUrl) {
    //   // Set the source to trigger the load event
    //   img.src = imageUrl;
    //   console.log(imageUrl);

    //   // When the image is loaded, add the marker
    //   img.onload = () => {
    //     pointLayer.addMarker(latitude, longitude, pointMarker);
    //     console.log("Add Pin Stop");
    //   };
    // } else {
    //   console.error("Error: Image source not found in content");
    //   // Add the marker even if the image is not found
    //   pointLayer.addMarker(latitude, longitude, pointMarker);
    //   console.log("Add Pin Stop");
    // }

    // Set up a listener for changes in map center
    // map.onLoad("extent-change", function (event) {
    //   const newCenter = event.extent.getCenter();
    //   setMapCenter({ latitude: newCenter.y, longitude: newCenter.x });
    // });
  };

  useEffect(() => {
    // Update the map when mapCenter changes and map is initialized

    if (mapCenter && mapInitialized && map) {
      console.log(mapCenter.latitude, mapCenter.longitude);
      map.centerAndZoom(mapCenter.latitude, mapCenter.longitude, 18);
    }
  }, [map, mapCenter, mapInitialized]);


  // useEffect(() => {
  //   const handleMapClick = (event) => {
  //     // Example: perform actions when the map is clicked
  //     const latitude = event.mapPoint.getLatitude();
  //     const longitude = event.mapPoint.getLongitude();

  //     // Call the callback function with clicked coordinates
  //     if (onToiletClick) {
  //       onToiletClick(latitude, longitude);
  //     }
  //   };

  //   // Add a listener for map click
  //   map.on("click", handleMapClick);

  //   // Cleanup: remove the listener when the component is unmounted
  //   return () => {
  //     map.off("click", handleMapClick);
  //   };
  // }, [map, onToiletClick]);

  return (
    <div className="map-page">
      <div id="map" style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
};

export default NostraMapComponent;