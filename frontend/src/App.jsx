import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import MeetingDetails from "./pages/MeetingDetails";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/meeting/:id"
          element={<MeetingDetails />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;