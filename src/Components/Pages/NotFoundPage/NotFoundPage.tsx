import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";
import { Button } from "@mui/material";



function NotFoundPage(): JSX.Element {
    const navigate = useNavigate();
    return (
        <div className="NotFoundPage">
			the page you have requested was not found :(
                <Button onClick={()=>navigate("/home")}>Go home</Button>
        </div>
    );
}

export default NotFoundPage;
