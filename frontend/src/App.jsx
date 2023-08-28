import { Box } from "@chakra-ui/react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import UserAuth from "./Pages/UserAuth";
import Landingpage from "./Pages/LandingPage/Landingpage";

function App() {
    return (
        <Routes>
            <Route
                path="/auth"
                element={
                    <div id="main">
                        <Box id="box1">
                            <UserAuth />
                        </Box>
                        <Box id="box2"></Box>
                    </div>
                }
            />
            <Route path="/talkvally" element={<Landingpage />} />
        </Routes>
    );
}

export default App;
