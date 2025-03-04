
export const InputContent = ({type , placeholder, onChange, value, name}) =>{



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
                // required
            />
            </div>
        </>
    )
}