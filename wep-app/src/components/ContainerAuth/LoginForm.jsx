import { InputContent } from "../ContainerInput/InputContent"



export const LoginForm = () => {



    return (

        <>
        <form >
            <div>
                <label> Email Adress</label>
                <InputContent type={'text'} placeholder={'Email'} value={'Email'}/>
            </div>
            <div>
                <label> Password</label>
                <InputContent type={'password'} placeholder={'Password'} value={'Password'}/>
            </div>
        </form>
            <h1>hola mundo</h1>
        </>
    )
}