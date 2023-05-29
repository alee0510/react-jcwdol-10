import { useNavigate, useLocation } from "react-router-dom"
import Button from "../../components/button"
import "./style.css"

function AboutPage () {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <div className="container-about">
            <h1>About Page</h1>
            <h2>state from home : {location.state}</h2>
            <Button 
                title="Back To Home" 
                variant="primary"
                onButtonClick={() => {
                    navigate("/")
                }}
            />
        </div>
    )
}

export default AboutPage