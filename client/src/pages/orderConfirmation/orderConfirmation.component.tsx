import { useEffect , useRef} from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { clearCart } from '../../state/cart/cartSlice'
import { selectCartItems } from '../../state/cart/cartSlice'
import { selectOrderStatus } from '../../state/order/orderSlice'
import styles from './orderConfirmation.module.css'
import { useNavigate, useLocation } from 'react-router-dom'

const OrderConfirmation: React.FC= () => {
    const dispatch= useAppDispatch()
    const courses= useAppSelector(selectCartItems)
    const orderStatus= useAppSelector(selectOrderStatus)
    
    //Handle clearing cart when user leaves the page


    return (
        <div>
            <h2> Order Status </h2>
            {
                orderStatus==='succeeded'? (
                    <div>
                       <p>We have succesfully received your registration for the following course:
                        </p> 
                        {courses.map(course=> <li key={course.id}>{course.title}</li>)}
                        <p>You will shortly receive a confirmation email for your order. 
                            For any additional questions or support reach out at info@royalaerial.com
                        </p> 
                       <span>See you soon!</span> 
                   
                    </div>
                ): (
                    <div>
                        <p>Unfortunately there was an error processing your order.</p>
                        <p>We apologize for any incovenience and recommend you attempt again later.</p>
                        <p>If the issue persists, please reach out at info@royalaerial.com</p>
                        <span>Hope to see you soon!</span> 
                        </div>

                )
            }
        </div>
    )
}

export default OrderConfirmation