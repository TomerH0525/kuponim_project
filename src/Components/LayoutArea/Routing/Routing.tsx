import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import Login from "../../Pages/LoginPage/Login";
import Layout from "../Layout/Layout";
import MyDetails from "../../Pages/MyDetails/MyDetails";
import Home from "../../Pages/Home/Home";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                
                <Route path="/login" element={<Login/>}/>
                <Route path="/MyDetails" element={<MyDetails/>} />
                <Route path="" element={<Home />}/>
            </Routes>
        </div>
    );
}

export default Routing;
