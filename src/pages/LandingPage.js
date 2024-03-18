import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";

function LandingPage() {
    return (
        <>
            <nav>
                <img src={logo} alt="Jobster" />
            </nav>
            <section>
                <div>
                    <div>
                        <h1>
                            Job <span>Tracking</span> App
                        </h1>
                        <p>
                            Crucifix narwhal street art asymmetrical, humblebrag
                            tote bag pop-up fixie raclette taxidermy craft beer.
                            Brunch bitters synth, VHS crucifix heirloom meggings
                            bicycle rights.
                        </p>
                    </div>
                    <div>
                        <img src={main} alt="a couple holding hands" />
                    </div>
                </div>
            </section>
        </>
    );
}

export default LandingPage;
