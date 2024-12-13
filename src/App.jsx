import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage"; // Import HomePage
import EventDetails from "@/pages/EventDetails"; // Import EventDetails

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define the route for the Home page */}
        <Route path="/" element={<HomePage />} />
        {/* Define the route for the Event Details page */}
        <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
