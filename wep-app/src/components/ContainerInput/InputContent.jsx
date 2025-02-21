
export const InputContent = ({type , placeholder, onChange, value}) =>{



    return(
        <>
            <div>
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className="input_content"
                value={value}
            />
            </div>
        </>
    )
}