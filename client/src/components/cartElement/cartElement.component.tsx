import styles from "./cartElement.module.css"
import { CartItem } from "../../types/types"


interface CartElementProps {
    cartItem: CartItem
}

const CartElement: React.FC<CartElementProps>= ({cartItem})=> {
    return (
        <div className={styles.cartItemContainer}>
            <img src="https://images.unsplash.com/photo-1534366352488-8b7b5f205086?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="woman doing acrobatics near a fence"></img>
            <div className={styles.itemDetails}>
                <span className={styles.name}>{cartItem.title}</span>
                <span className={styles.name}>{cartItem.quantity} x EUR{cartItem.price}</span>

            </div>
        </div>
    )
}

export default CartElement