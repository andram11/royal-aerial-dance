import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks'
import { selectCartItems, selectIsCartOpen } from '../../state/cart/cartSlice'
import styles from './cartDropdown.module.css'
import CartElement from '../cartElement/cartElement.component'


const CartDropdown: React.FC = ()=> {
    const cartItems= useAppSelector(selectCartItems)
    const isCartOpen= useAppSelector(selectIsCartOpen)
    const navigate= useNavigate()

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }

    if (!isCartOpen){
        return null
    }

    return (
        <div className={styles.cartDropdownContainer}>
            <div className={styles.cartItems}>
                {
                    cartItems.length ? (cartItems.map((item)=>(
                        <CartElement key={item.id} cartItem={item}/>
                    ))):(<div className={styles.emptyMessage}>Your cart is empty.</div>)
                }
            </div>
            <button onClick={goToCheckoutHandler} className={styles.baseButton}>Go to checkout</button>
        </div>
    )
}

export default CartDropdown