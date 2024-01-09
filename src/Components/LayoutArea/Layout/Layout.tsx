import { BrowserRouter } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Routing from "../Routing/Routing";
import "./Layout.css";
import { ToastContainer } from "react-toastify";

function Layout(): JSX.Element {
    return (
        <BrowserRouter>
        <div className="Layout">
            {/* Header which is combined with the navbar */}
			<header>
                <nav>
                <Navbar/>
                </nav>
            </header>
            {/* Main body */}
            <main>
                <Routing/>
            </main>
            {/* Footer */}
            <footer>
                <Footer/>
            </footer>

        </div>
        <ToastContainer />
        </BrowserRouter>
    );
}

export default Layout;
