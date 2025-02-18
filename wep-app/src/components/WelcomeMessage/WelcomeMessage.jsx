


export const WelcomeMessage = () =>{

    const content = {
        patient: {
          title: "Welcome back",
          description: "Log in to your account and we'll get you in to see our doctors."
        },
        doctor: {
          title: "Welcome, Doctor",
          description: "Log in to your professional portal to access patient records."
        }
      };
    
      return (
        <div>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
        </div>
      );
}