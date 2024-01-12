import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import Login from "../../LoginArea/Login/Login";
import Layout from "../Layout/Layout";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={null}/>
            </Routes>
        </div>
    );
}

export default Routing;
