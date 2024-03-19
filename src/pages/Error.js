import { Link } from "react-router-dom";
import notfound from "../assets/images/not-found.svg";

import Wrapper from "../assets/wrappers/ErrorPage";

function Error() {
    return (
        <Wrapper className="full-page">
            <div>
                <img src={notfound} alt="404" />
                <h3>Ohh! Page not found</h3>
                <p>
                    Looks like the page you are searching for is on vocation...
                </p>
                <Link to="/">Back home</Link>
            </div>
        </Wrapper>
    );
}

export default Error;
