import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
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
    );
}

export default Layout;
