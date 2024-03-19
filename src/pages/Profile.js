import { FormInput, TitleSection } from "../components";
import { Form, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashBoardFormPage";
import { useSelector } from "react-redux";
import { customFetch } from "../utils/util";
import { toast } from "react-toastify";
import { logoutUser, updateUser } from "../features/user/userSlice";
import { handleInputChange } from "../features/jobs/AddJobSlice";

export const action =
    (store) =>
    async ({ request, params }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);

        const user = store.getState().userState.user;

        try {
            const res = await customFetch.patch("/auth/updateUser", data, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            toast.success("User Updated!");
            store.dispatch(updateUser(res.data));
            return res.data;
        } catch (error) {
            console.log(error);
            const message = error?.response?.data?.msg;
            toast.error(message);

            if (error?.response?.status === 401) {
                store.dispatch(logoutUser());
                toast.error(
                    "Unauthorized or token has expired! Logging out..."
                );
            }
            return null;
        }
    };

function Profile() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const user = useSelector((store) => store.userState.user);

    return (
        <Wrapper>
            <Form className="form" method="PATCH">
                <TitleSection text="Profile" />
                <div className="form-center">
                    <FormInput
                        defaultValue={user.name}
                        type="text"
                        name="name"
                    />
                    <FormInput
                        defaultValue={user.lastName}
                        type="text"
                        name="lastName"
                    />
                    <FormInput
                        defaultValue={user.email}
                        type="email"
                        name="email"
                    />
                    <FormInput
                        defaultValue={user.location}
                        type="text"
                        name="location"
                    />
                    {/* Check xem type là gì */}
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="btn btn-block"
                    >
                        {isSubmitting ? "Please wait..." : "Save changes"}
                    </button>
                </div>
            </Form>
        </Wrapper>
    );
}

export default Profile;
