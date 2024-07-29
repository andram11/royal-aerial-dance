import styles from './paymentForm.module.css'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { createPaymentRequest } from '../../api/api-service'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { clearCart, selectCartItems, selectTotalPrice } from '../../state/cart/cartSlice'
import { selectParticipantDetails } from '../../state/participant/participantSlice'
import { Payment } from '../../types/types'
import { setOrderStatus } from '../../state/order/orderSlice'
import { useNavigate } from 'react-router-dom'

const PaymentForm = ()=> {
    const dispatch= useAppDispatch()
    const stripe= useStripe()
    const elements= useElements()
    const amount= useAppSelector(selectTotalPrice)
    const cartItems= useAppSelector(selectCartItems)
    const courses= useAppSelector(selectCartItems).map(course=> ({courseId: course.id, quantity: course.quantity}))
    //console.log(courses)
    const participantDetails= useAppSelector(selectParticipantDetails)
    const [isProcessingPayment, setIsProcessingPayment]= useState(false)

    const navigate= useNavigate()

    const paymentDetails: Payment= {
        courseDetails: courses,
        paymentDetails: {
            paymentMethod: 'Stripe',
            status: 'initiated',
            amount: amount ,
            currency: "eur"
        },
        participantDetails: participantDetails

    }

    const paymentHandler= async(e:React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        if (!stripe || !elements){
            return ;
        }    
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
          return;
        }
        const response= await createPaymentRequest(paymentDetails)
        const client_secret= response.payment
        setIsProcessingPayment(true)
        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: 'TEST-Guest',
    
                }
            }
         })
         setIsProcessingPayment(false)
         if(paymentResult.error){
            dispatch(setOrderStatus('error'))
            navigate('/confirmationStatus')
         } else {
            if(paymentResult.paymentIntent.status=== 'succeeded')
            dispatch(setOrderStatus('succeeded'))
            navigate('/confirmationStatus', {state: {cartItems}})
         }
       
}

return(
    <div className={styles.paymentFormContainer}>
    <form className={styles.formContainer} onSubmit={paymentHandler}>
        <h2>Credit Card Payment </h2>
        <CardElement/>
       <button className={styles.button} type= 'submit' disabled={isProcessingPayment}>
       {isProcessingPayment ? 'Processing...' : 'PAY'}</button> 
    </form>

    </div>
    
)
}

export default PaymentForm