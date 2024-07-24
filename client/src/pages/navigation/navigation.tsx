import { Link, Outlet } from 'react-router-dom'
import styles from './navigation.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectIsCartOpen, setIsCartOpen} from '../../state/cart/cartSlice'
import CartDropdown from '../../components/cartDropdown/cartDropdown.component'
import { useEffect } from 'react'

const Navigation = ()=> {
    const dispatch= useAppDispatch()
    const isCartOpen= useAppSelector(selectIsCartOpen)

    const handleCartClick = ()=> {
        dispatch(setIsCartOpen(!isCartOpen))
    }

    const handleClickOutside= (event: MouseEvent)=> {
        if (isCartOpen && !(event.target as Element).closest(`.${styles.navLink}`)){
            dispatch(setIsCartOpen(false))
        }
        
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
                LOGO
                </Link>
            </div>
            <div className={styles.navLinks}>
                <div className={styles.navLink}>
                <button className={styles.navLink} onClick={handleCartClick}>
                  CART
                </button>
                {isCartOpen && <CartDropdown />}
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