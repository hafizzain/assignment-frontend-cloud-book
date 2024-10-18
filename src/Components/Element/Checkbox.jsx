function CheckBox({
    parentClass,
    disabled,
    label_text_transform,
    mainLabelClass,
    label_Class,
    name,
    onChange,
    value,
    checked,
    error,
    label,
    colorLabel1,
    colorLabel2,
    className,
    id,
    onClickLabel1,
    onClickLabel2,
    loading // Add loading prop
}) {
    var unique_id = Math.floor(Math.random() * 100) * Date.now();

    return (
        <div className={`flex items-center ${label ? "sm:gap-4 gap-2" :""} ${parentClass ? parentClass : ''}`}>
            <input
                disabled={disabled}
                id={`${id ? id : unique_id}`}
                type="checkbox"
                name={name}
                onChange={onChange}
                value={value}
                checked={checked}
                className={`custom-checkbox ${className ? className : ''} ${disabled && 'cursor-not-allowed'} ${error && "error"} ${loading ? 'animate-pulse bg-gray-200' : ''}`} // Add shimmer effect
            />
            {label ?
                <label htmlFor={`${id ? id : unique_id}`} className={`${mainLabelClass}`}>
                    <p
                        className={`text-sm font-medium cursor-pointer text-blueGrey ${label_Class && label_Class} ${label_text_transform ? label_text_transform : 'normal-case'
                            }`}
                    >
                        {label}
                        <span className="text-secondary font-semibold" onClick={onClickLabel1 && onClickLabel1}>
                            {colorLabel1}{' '}
                        </span>{' '}
                        {colorLabel2 && (
                            <span>
                                {' '}
                                <span>&</span>{' '}
                                <span className="text-blueGrey" onClick={onClickLabel2 && onClickLabel2}>
                                    {colorLabel2}
                                </span>
                            </span>
                        )}
                    </p>
                </label>
                : ""
            }
            {/* {error && <span className="text-error text-sm">{error}</span>} */}
        </div>
    );
}

export default CheckBox;
