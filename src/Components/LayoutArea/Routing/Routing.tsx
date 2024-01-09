import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import Login from "../../LoginArea/Login/Login";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
