import { Link, Outlet } from 'react-router-dom'
import styles from './navigation.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectIsCartOpen, setIsCartOpen} from '../../state/cart/cartSlice'
import CartDropdown from '../../components/cartDropdown/cartDropdown.component'
import { useEffect } from 'react'
import { selectIsAuthenticated, userLogout } from '../../state/user/userSlice'
import UserIcon from '../../assets/UserIcon/UserIcon'
import LogoIcon from '../../assets/LogoIcon/LogoIcon'
import { FaCartShopping } from "react-icons/fa6";

const Navigation = ()=> {
    const dispatch= useAppDispatch()
    const isCartOpen= useAppSelector(selectIsCartOpen)
    const isUserAuthenticated= useAppSelector(selectIsAuthenticated)
    const handleCartClick = ()=> {
        dispatch(setIsCartOpen(!isCartOpen))
    }

    const handleClickOutside= (event: MouseEvent)=> {
        if (isCartOpen && !(event.target as Element).closest(`.${styles.navLink}`)){
            dispatch(setIsCartOpen(false))
        }
        
    }

    const handleLogout = ()=> {
        dispatch(userLogout())
    }

    useEffect(()=> {
        document.addEventListener('click', handleClickOutside)

        return ()=> {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [isCartOpen])

    return(
        <>
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <Link to="/">
                <LogoIcon/>
                </Link>
            </div>

     
            <div className={styles.navLinks}>
            <div className={styles.navLink}>
                  <Link className={styles.navLink} to="/courses">
                  COURSES
                </Link>
                
                </div>
                <div className={styles.navLink}>
                <button className={styles.navLink} onClick={handleCartClick}>
                  <FaCartShopping style={{ fontSize: '30px' }}/>
                </button>
                {isCartOpen && <CartDropdown />}
                </div>

                <div className={styles.navLink}>
                    {isUserAuthenticated ? (<UserIcon onClick={handleLogout}/>): (<Link className={styles.navLink} to="/login">
                  LOGIN
                </Link>)}
                
                </div>

            </div>
          
        </div>

        <Outlet/>
        </>
    )
}

export default Navigation;