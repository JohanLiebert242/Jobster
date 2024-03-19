import { Form, Link, redirect } from "react-router-dom";
import { customFetch } from "../utils/util";
import Logo from "../components/Logo";
import TitleSection from "../components/TitleSection";
import FormInput from "../components/FormInput";
import SubmitBtn from "../components/Submit";
import Wrapper from "../assets/wrappers/Register";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    console.log(data);

    try {
        const res = await customFetch.post("/auth/register", data);

        toast.success("Successfully register");
        return redirect("/login");
    } catch (error) {
        console.log(error);
        const message = error?.response?.data?.msg;
        toast.error(message);
        return null;
    }
};

function Register() {
    return (
        <Wrapper className="full-page">
            <Form className="form" method="POST">
                <Logo />
                <TitleSection text="Register" />
                <FormInput text="Name" type="text" name="name" />
                <FormInput text="Email" type="email" name="email" />
                <FormInput text="Password" type="password" name="password" />
                <SubmitBtn text="Submit" />
                <button className="btn btn-block btn-hipster">Demo App</button>
                <div>
                    <p>
                        Already a member?
                        <Link className="member-btn" to="/login">
                            Login
                        </Link>
                    </p>
                </div>
            </Form>
        </Wrapper>
    );
}

export default Register;
