import  './Footer.css'
import { SocialIcon } from "react-social-icons";


const Footer = () => {
  return (
    <footer className="mt-5 d-flex justify-content-center">
      <SocialIcon
        bgColor="white"
        className="m-2"
        target="_blank"
        network="github"
        url="https://github.com/davidmart16"
      />
      <SocialIcon
        bgColor="white"
        className="m-2"
        target="_blank"
        network="linkedin"
        url="https://www.linkedin.com/in/david-martinez-perez-636456221"
      />
    </footer>
  )
}

export default Footer;