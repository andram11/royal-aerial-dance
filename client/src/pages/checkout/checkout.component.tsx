import { Link } from 'react-router-dom'
import CheckoutItem from '../../components/checkoutItem/checkoutItem.component'
import { useAppSelector } from '../../hooks'
import { selectCartItems, selectTotalPrice } from '../../state/cart/cartSlice'
import styles from './checkout.module.css'
import { selectIsAuthenticated, selectUser } from '../../state/user/userSlice'

const Checkout: React.FC = ()=> {
    const cartItems= useAppSelector(selectCartItems)
    const cartTotal= useAppSelector(selectTotalPrice)
    const isAuthenticated= useAppSelector(selectIsAuthenticated)
    const user= useAppSelector(selectUser)


    return(
       <>
        <div className={styles.checkoutContainer}>
            <div className={styles.checkoutHeader}>

                <div className={styles.headerBlock}><span>Course</span></div>
                <div className={styles.headerBlock}><span>Details</span></div>
                <div className={styles.headerBlock}><span>Quantity</span></div>
                <div className={styles.headerBlock}><span>Price</span></div>
                <div className={styles.headerBlock}><span> </span></div>
                
            </div>
            {
                cartItems.map( (cartItem)=> {
                    return(
                        <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                    )
                })
            }
                <div className={styles.total}>Total: EUR {cartTotal}</div>
        </div>
        <Link to={
            isAuthenticated&& user ? '/registration': '/login'
        } > <button>Register and pay</button> </Link>
            
       </> 
    )
}

export default Checkout;