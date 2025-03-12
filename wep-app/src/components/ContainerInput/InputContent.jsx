
export const InputContent = ({type , placeholder, onChange, value, name, readOnly,required,onClick}) =>{



    return(
        <>
            <div>
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className="input_content"
                value={value}
                name={name}
                readOnly={readOnly}
                onClick={onClick}
            />
            </div>
        </>
    )
}