


export const InputContent = ({type , placeholder, onChange}) =>{



    return(
        <>
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
            />
        </>
    )
}