import { useAppDispatch } from "../../hooks";
import {
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../../state/cart/cartSlice";
import { CartItem } from "../../types/types";
import { capitalizeFirstLetter } from "../../utils";
import styles from "./checkoutItem.module.css";

interface CheckOutItemProps {
  cartItem: CartItem;
}

const CheckoutItem: React.FC<CheckOutItemProps> = ({ cartItem }) => {
  //Destructure
  const { id, title, price, quantity, location, timeslot, dayOfTheWeek } =
    cartItem;

  //State
  const dispatch = useAppDispatch();
  const removeItemHandler = () => dispatch(removeItemFromCart(id));
  const increaseItemQuantityHandler = () => dispatch(increaseItemQuantity(id));
  const decreaseItemQuantityHandler = () => dispatch(decreaseItemQuantity(id));

  return (
    <div className={styles.parentContainer}>
    <div className={styles.checkoutItemContainer}>
 
       
          <img className={styles.imageContainer}
            src="https://images.unsplash.com/photo-1534366352488-8b7b5f205086?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="woman doing acrobatics near a fence small"
          ></img>
     
        
        <span className={styles.spanTitle}>{capitalizeFirstLetter(title)}</span>
        <span className={styles.spanDetails}>
          {capitalizeFirstLetter(location)}
          <br></br>
          <span>{capitalizeFirstLetter(dayOfTheWeek)}</span>
          <br></br>
          <span>{timeslot}</span>
        </span>

        <div className={styles.quantity}>
          <div className={styles.arrow} onClick={decreaseItemQuantityHandler}>
            &#10094;
          </div>
          <div className={styles.quantity}>{quantity}</div>
          <div className={styles.arrow} onClick={increaseItemQuantityHandler}>
            &#10095;
          </div>
        </div>
        <span className={styles.baseSpan}>EUR {price}</span>



    </div>
    <div className={styles.removeButton} onClick={removeItemHandler}>
    &#10005;
  </div>
  </div>
  );
};

export default CheckoutItem;
