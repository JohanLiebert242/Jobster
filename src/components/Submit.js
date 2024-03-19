function SubmitBtn({ text }) {
    return (
        <button className="btn btn-block" type="submit">
            {text || "submit"}
        </button>
    );
}

export default SubmitBtn;
