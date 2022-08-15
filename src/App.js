// Create a web page includes:

// a. A button to support user location acquisition from browser.

// b. A module which allows user to input the name of a location. (Searching feature is triggered by both button click, and press enter key on the keyboard)

// c. Display the location on the map and add a marker to each searched location every time when the location is changed.

// d. A table with pagination to show all searched places:

//   1. It displays a maximum of 10 records on each page.

//   2. A checkbox at the beginning of each row to allow user to select multiple records at the same time.

//   3. A delete button on the top of it to delete all selected records as well as the marker on the map.

// e. Display the time zone and local time of the latest searched location.

import "./App.css";
import GoogleMap from "./components/GoogleMap";

function App() {
  return (
    <>
      <div className="App">
        <h1>Google Map</h1>
        <GoogleMap />
      </div>
    </>
  );
}

export default App;
