"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

let map, mapEvent;

if (navigator.geolocation) {
  // Guard clause for old browsers
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords; // could write position.coords.latitude but this makes use of destructuring
      const { longitude } = position.coords;
      console.log(`https://www.google.com.my/maps/@${latitude},${longitude}`);
      const coords = [latitude, longitude];

      map = L.map("map").setView(coords, 15);

      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Handling clicks on map:
      map.on("click", function (mapE) {
        mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus(); // focus on the distance element for better UX
      });
    },
    function () {
      alert("Could not get your position");
    }
  );
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // Clear input fields
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      "";

  // Display Marker
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("Workout")
    .openPopup();
});

// Toggle between running & cycling:
inputType.addEventListener("change", function () {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});

{
  /* <div class="form__row">
<label class="form__label">Cadence</label>
<input
  class="form__input form__input--cadence"
  placeholder="step/min"
/>
</div>
<div class="form__row form__row--hidden">
<label class="form__label">Elev Gain</label>
<input
  class="form__input form__input--elevation"
  placeholder="meters"
/>
</div> */
}
////////////////////////////////////////////////////////////////

// Planning:

// 1. User Stories: description of apps functionality from the user's perspective

// As a [type of user] I want [an action] so that [a benefit] (who, what, why)
// User --> log running workouts with location,distance, time,pace and steps/minute --> keep a log of all running
// User --> log cycling workouts with locations, distance, time, speed and elevation gain --> keep a log of all running
// User --> see all my workouts at a glance --> easily track progress over time
// User --> see my workouts on a map --> check where I workout the most
// User --> see all my workouts when I leave the app and come back later --> keep using

// 2. Features

// Map where user clicks to add new workout (get location coords)
// Geolocation to display current location
// Form to input distance, time, pace, steps/minute (runner)
// Form to input distance, time, speed, elevation game (cycler)
// Display all workouts in a list
// Display all workouts on the map
// Store the workout data in browser: local storage API & read upon reload

// 3. Flowchart: What we will build
// 4. Architecture: How we build it (implement all the functionality)
// 5. Development
