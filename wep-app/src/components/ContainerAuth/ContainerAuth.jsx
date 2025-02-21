import { PiWarningCircle } from "react-icons/pi";
import { Ri24HoursLine } from "react-icons/ri";
import { GiPadlockOpen } from "react-icons/gi";
// import { useState } from "react";
// import { WelcomeMessage } from "../WelcomeMessage/WelcomeMessage";
import { LoginForm } from "./LoginForm";
import './container.css'



export const ContainerAuth = () =>{


    return (
        <>
            <section className="container-auth">
                <article className="content_auth_left">
                    <h1>Expert advice from <br /> top Doctors</h1>
                    <div>
                        <PiWarningCircle className="auth_expert_icon" />
                        <span>Expert advice from top Doctors</span>
                    </div>
                    <div>
                        <Ri24HoursLine className="auth_available_icon" />
                        <span>Available 24/7 on any device</span>
                    </div>
                    <div>
                        <GiPadlockOpen className="auth_private_icon"/>
                        <span>Private questions answered within 24 hrs</span>
                    </div>
                </article>
                <article className="content_auth_right">
                    {/* <WelcomeMessage /> */}
                    <LoginForm />
                </article>
            </section>
        </>
    )
}