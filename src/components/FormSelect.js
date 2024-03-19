function FormSelect({
    onChange,
    value,
    labelText,
    name,
    lists,
}) {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {labelText || name}
            </label>
            <select
                onChange={onChange}
                value={value}
                name={name}
                id={name}
                className="form-select"
            >
                {lists.map((item) => (
                    <option value={item} key={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default FormSelect;
