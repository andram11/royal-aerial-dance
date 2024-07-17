import { Link, Outlet } from 'react-router-dom'
import styles from './navigation.module.css'


const Navigation = ()=> {
    return(
        <>
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <Link to="/">
                LOGO
                </Link>
            </div>
            <div className={styles.navLinks}>
                <div className={styles.navLink}>
                <Link to="/cart">
                  CART
                </Link>
                </div>
                <div>
                <Link to="/login">
                  LOGIN
                </Link>
        
                </div>

            </div>
          
        </div>

        <Outlet/>
        </>
    )
}

export default Navigation;