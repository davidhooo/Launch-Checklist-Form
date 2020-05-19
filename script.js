// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener("load", function () {
  this.console.log("window has loaded, DOM elements are locked and loaded");
  const form = this.document.getElementById("launchForm");
  const launchStatus = this.document.getElementById("launchStatus");
  const faultyItems = this.document.getElementById("faultyItems");
  const missionTarget = this.document.getElementById("missionTarget");
  form.addEventListener("submit", function (event) {
    let pilotNameInput = document.querySelector("input[name=pilotName]");
    let copilotNameInput = document.querySelector("input[name=copilotName]");
    let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
    let cargoMassInput = document.querySelector("input[name=cargoMass]");

    let allInputs = [pilotNameInput, copilotNameInput, fuelLevelInput, cargoMassInput];
    let numberInputs = [fuelLevelInput, cargoMassInput];

    let inputCheckMessage = "Missing fields: ";
    for (let input of allInputs) {
      if (input.value === "") {
        inputCheckMessage += `${input.name}, `;
      }
    }
    if (inputCheckMessage != "Missing fields: ") {
      alert(inputCheckMessage.substring(0, inputCheckMessage.length - 2));
      event.preventDefault();
    }
    for (let input of numberInputs) {
      if (isNaN(input.value) === true) {
        alert(`"${input.value}" is not a number.`);
        event.preventDefault();
      }
    }

    let statusNotReady = function () {
      launchStatus.innerText = "Shuttle NOT ready for launch";
      faultyItems.style.visibility = "visible";
      launchStatus.style.color = "red";
      event.preventDefault();
    };

    let statusReady = function () {
      launchStatus.innerText = "Shuttle ready for launch!";
      faultyItems.style.visibility = "visible";
      launchStatus.style.color = "green";
      document.getElementById("fuelStatus") = "Fuel level high enough for launch";
      document.getElementById("cargoStatus") = "Cargo mass low enough for launch";
      event.preventDefault();
    };

    if (pilotNameInput.value === "") {
      document.getElementById("pilotStatus").innerText = `Pilot is not Ready`;
      event.preventDefault();
    } else {
      document.getElementById("pilotStatus").innerText = `Pilot (${pilotNameInput.value}) Ready`;
    }

    if (copilotNameInput.value === "") {
      document.getElementById("copilotStatus").innerText = `Co-Pilot is not Ready`;
      event.preventDefault();
    } else {
      document.getElementById(
        "copilotStatus"
      ).innerText = `Co-Pilot (${copilotNameInput.value}) Ready`;
    }

    if (fuelLevelInput.value < 10000 || isNaN(fuelLevelInput.value) === true) {
      document.getElementById("fuelStatus").innerText = "Fuel level NOT high enough for launch.";
      statusNotReady();
    } else {
      document.getElementById("fuelStatus").innerText = "Fuel level high enough for launch";
    }

    if (cargoMassInput.value > 10000 || isNaN(cargoMassInput.value) === true) {
      document.getElementById("cargoStatus").innerText = "Cargo mass TOO HIGH for launch.";
      statusNotReady();
    } else {
      document.getElementById("cargoStatus").innerText = "Cargo mass low enough for launch";
    }
  });
  this.fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (
    response
  ) {
    response.json().then(function (json) {
      missionTarget.innerHTML = `
      <h2>Mission Destination</h2>
        <ol>
          <li>Name: ${json[0].name}</li>
          <li>Diameter: ${json[0].diameter}</li>
          <li>Star: ${json[0].star}</li>
          <li>Distance from Earth: ${json[0].distance}</li>
          <li>Number of Moons: ${json[0].moons}</li>
        </ol>
        <img src="${json[0].image}">
      `;
    });
  });
});
