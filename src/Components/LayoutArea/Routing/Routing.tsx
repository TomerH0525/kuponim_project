import { Route, Routes , Navigate} from "react-router-dom";
import "./Routing.css";
import Login from "../../Pages/LoginPage/Login";
import MyDetails from "../../Pages/MyDetails/MyDetails";
import Home from "../../Pages/Home/Home";
import AddCoupon from "../../Pages/CompanyArea/AddCoupon/AddCoupon";
import CouponDetails from "../../Pages/Home/CouponDetails/CouponDetails";
import NotFoundPage from "../../Pages/NotFoundPage/NotFoundPage";
import CompanyPanel from "../../Pages/AdminArea/CompanyPanel/CompanyPanel";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="" element={<Navigate to={"/home"}/>} />
                <Route path="/login" element={<Login />}/>
                <Route path="/MyDetails" element={<MyDetails />} />
                <Route path="/addCoupon" element={<AddCoupon />} />
                <Route path="/coupon/:couponId" element={<CouponDetails />} />
                <Route path="/AdminPanel/Companies" element={<CompanyPanel />} />
                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
        </div>
    );
}

export default Routing;
