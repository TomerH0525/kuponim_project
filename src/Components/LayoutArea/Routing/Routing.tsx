import { Route, Routes, Navigate } from "react-router-dom";
import "./Routing.css";
import Login from "../../Pages/LoginPage/Login";
import MyDetails from "../../Pages/MyDetails/MyDetails";
import Home from "../../Pages/Home/Home";
import AddCoupon from "../../Pages/CompanyArea/AddCoupon/AddCoupon";
import CouponDetails from "../../Pages/Home/CouponDetails/CouponDetails";
import NotFoundPage from "../../Pages/NotFoundPage/NotFoundPage";
import CompanyPanel from "../../Pages/AdminArea/CompanyPanel/CompanyPanel";
import AddCompany from "../../Pages/AdminArea/CompanyPanel/AddCompany/AddCompany";
import EditCompany from "../../Pages/AdminArea/CompanyPanel/EditCompany/EditCompany";
import CustomerPanel from "../../Pages/AdminArea/CustomersPanel/CustomersPanel";
import AddCustomer from "../../Pages/AdminArea/CustomersPanel/AddCustomer/AddCustomer";
import EditCustomer from "../../Pages/AdminArea/CustomersPanel/EditCustomer/EditCustomer";
import UpdateCoupon from "../../Pages/CompanyArea/UpdateCoupon/UpdateCoupon";
import CompanyDetails from "../../Pages/CompanyArea/CompanyDetails/CompanyDetails";
import CustomerDetails from "../../Pages/CustomerArea/CustomerDetails/CustomerDetails";
import About from "../../Pages/Home/About/About";



function Routing(): JSX.Element {
  return (
    <div className="Routing">
        
      <Routes>
        <Route index path="/home" element={<Home />} />
        <Route path="" element={<Navigate to={"/home"} />} />
        <Route path="/home/about" element={<About/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/MyDetails" element={<MyDetails />} />
        <Route path="/addCoupon" element={<AddCoupon />} />
        <Route path="/coupon/:couponId" element={<CouponDetails />} />
        <Route path="/coupon/:couponId/edit" element={<UpdateCoupon />} />
        <Route path="/AdminPanel/Companies" element={<CompanyPanel/>} />
        <Route path="/AdminPanel/Customers" element={<CustomerPanel />} />
        <Route path="/AdminPanel/Companies/AddCompany" element={<AddCompany />}/>
        <Route
          path="/AdminPanel/Companies/:companyId"
          element={<CompanyDetails />}
        />
        <Route
          path="/AdminPanel/Customers/AddCustomer"
          element={<AddCustomer />}
        />
        <Route
          path="/AdminPanel/Customers/:customerId"
          element={<CustomerDetails />}
        />
        <Route
          path="/AdminPanel/Companie/Edit/:companyId"
          element={<EditCompany />}
        />
        <Route
          path="/AdminPanel/Customer/Edit/:customerID"
          element={<EditCustomer />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default Routing;
