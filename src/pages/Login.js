import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { customFetch } from "../utils/util";
import Wrapper from "../assets/wrappers/Register";
import Logo from "../components/Logo";
import TitleSection from "../components/TitleSection";
import FormInput from "../components/FormInput";
import SubmitBtn from "../components/Submit";
import { loginUser } from "../features/user/userSlice";
import { toast } from "react-toastify";

export const action =
    (store) =>
    async ({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);

        try {
            const res = await customFetch.post("/auth/login", data);
            store.dispatch(loginUser(res.data));
            return redirect("/home");
        } catch (error) {
            console.log(error);
            const message = error?.response?.data?.msg;
            toast.error(message);
            return null;
        }
    };

function Login() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <Wrapper className="full-page">
            <Form className="form" method="POST">
                <Logo />
                <TitleSection text="Login" />
                <FormInput text="Email" type="email" name="email" />
                <FormInput text="Password" type="password" name="password" />
                <SubmitBtn text={isSubmitting ? "Loading..." : "Submit"} />
                <button className="btn btn-block btn-hipster">Demo App</button>
                <div>
                    <p>
                        Not a member yet?
                        <Link className="member-btn" to="/register">
                            Register
                        </Link>
                    </p>
                </div>
            </Form>
        </Wrapper>
    );
}

export default Login;
