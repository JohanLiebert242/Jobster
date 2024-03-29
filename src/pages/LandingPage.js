import { Link } from "react-router-dom";

import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import Logo from "../components/Logo";

function LandingPage() {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        Job <span>Tracking</span> App
                    </h1>
                    <p>
                        Crucifix narwhal street art asymmetrical, humblebrag
                        tote bag pop-up fixie raclette taxidermy craft beer.
                        Brunch bitters synth, VHS crucifix heirloom meggings
                        bicycle rights.
                    </p>
                    <Link to="/login" className="btn btn-hero">
                        Login / Register
                    </Link>
                </div>
                <img
                    className="img main-img"
                    src={main}
                    alt="a couple holding hands"
                />
            </div>
        </Wrapper>
    );
}

export default LandingPage;
