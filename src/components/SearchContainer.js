import Wrapper from "../assets/wrappers/SearchContainer";
import { Form } from "react-router-dom";
import TitleSection from "./TitleSection";
import FormInput from "./FormInput";

function SearchContainer() {
    return (
        <Wrapper>
            <Form className="form" method="GET">
                <TitleSection text="Search Form" />
                <div className="form-center">
                    <FormInput name="search" text="Search" type="text" />
                </div>
            </Form>
        </Wrapper>
    );
}

export default SearchContainer;
