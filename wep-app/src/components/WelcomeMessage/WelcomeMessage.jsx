


export const WelcomeMessage = ({ userType }) =>{

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
          <h1>{content[userType].title}</h1>
          <p>{content[userType].description}</p>
        </div>
      );
}