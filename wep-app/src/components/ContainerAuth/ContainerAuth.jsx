import { PiWarningCircle } from "react-icons/pi";
import { Ri24HoursLine } from "react-icons/ri";
import { GiPadlockOpen } from "react-icons/gi";
import { useState } from "react";
import { WelcomeMessage } from "../WelcomeMessage/WelcomeMessage";
import { LoginForm } from "./LoginForm";




export const ContainerAuth = () =>{

    const [ userType , setUserType ] = useState('patient')


    return (
        <>
            <section className="container-auth">
                <article className="content_auth_left">
                    <h1>Expert advice from <br /> top Doctors</h1>
                    <div>
                        <PiWarningCircle />
                        <span>Expert advice from top Doctors</span>
                    </div>
                    <div>
                        <Ri24HoursLine />
                        <span>Available 24/7 on any device</span>
                    </div>
                    <div>
                        <GiPadlockOpen />
                        <span>Private questions answered within 24 hrs</span>
                    </div>
                </article>
                <article className="content_auth_right">
                    <div>
                        <button
                        onClick={()=>setUserType('patient')}
                        >
                            Patient
                        </button>
                    </div>
                    <div>
                        <button
                        onClick={() =>{setUserType('doctor')}}
                        >
                            Doctors
                        </button>
                    </div>
                </article>
                <WelcomeMessage userType={userType}/>
                <LoginForm/>
            </section>
        </>
    )
}