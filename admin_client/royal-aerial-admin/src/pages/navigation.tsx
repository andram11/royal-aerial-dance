import LogoIcon from "../assets/LogoIcon"
import UserIcon from "../assets/UserIcon"
import { Link, Outlet } from 'react-router-dom'

 const Navigation= ()=> {
    return(
        <>
        <div>
            <div>
                <Link to='/'>
                <LogoIcon/>
                </Link>
            </div>

            <div>
            <div>
                  <a href="https://documenter.getpostman.com/view/10964312/2sAXjF7Zp4">
                  Docs
                </a>
                
                </div>
            </div>

            <div >
                 
                <UserIcon />
              
                
                </div>
        </div>
        </>
    )
}

export default Navigation