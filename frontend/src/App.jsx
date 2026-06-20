import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import MeetingDetails from "./pages/MeetingDetails";
import Analytics from "./pages/Analytics";

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

                <Route
                    path="/analytics"
                    element={<Analytics />}
                />

            </Routes>

        </BrowserRouter>

    );
}

export default App;