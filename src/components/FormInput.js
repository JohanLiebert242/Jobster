function FormInput({
    onChange,
    value,
    text,
    type,
    name,
    defaultValue,
    handleInputChange,
}) {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {text || name}
            </label>
            <input
                onChange={onChange}
                type={type}
                value={value}
                name={name}
                defaultValue={defaultValue}
                className="form-input"
            />
        </div>
    );
}

export default FormInput;
