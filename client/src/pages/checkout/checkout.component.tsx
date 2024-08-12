import { Link } from 'react-router-dom'
import CheckoutItem from '../../components/checkoutItem/checkoutItem.component'
import { useAppSelector } from '../../hooks'
import { selectCartItems, selectTotalPrice } from '../../state/cart/cartSlice'
import styles from './checkout.module.css'
import { selectIsAuthenticated, selectUser } from '../../state/user/userSlice'
import Button from '../../components/button/button.component'

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
                
            </div>
            {cartItems.length === 0 ? (
          <p className={styles.emptyMessage}>There are no items in your cart</p>
        ) : (
          cartItems.map((cartItem) => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
          ))
        )}

        {cartItems.length > 0 && (
          <div className={styles.total}>Total: EUR {cartTotal}</div>
        )}
        </div>
        <div className={styles.buttonContainer}>
        <Link to={
            isAuthenticated&& user ? '/registration': '/login'
        } > {cartItems.length > 0 && <Button text="Register and pay" onClick={() => {}}/>} </Link>
            </div>
       </> 
    )
}

export default Checkout;