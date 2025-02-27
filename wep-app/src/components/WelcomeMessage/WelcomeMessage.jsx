import '../ContainerAuth/loginForm.css'


export const WelcomeMessage = ({title, description}) =>{
    
      return (
        <div>
            <h2>{title}</h2> 
            <p>{description}</p> 
        </div>
      );
}