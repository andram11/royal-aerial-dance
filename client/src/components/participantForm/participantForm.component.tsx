import styles from './participantForm.module.css'
import { useEffect, useState } from 'react'
import { ParticipantDetails } from '../../types/types'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectParticipantDetails, setParticipant } from '../../state/participant/participantSlice'


const ParticipantForm: React.FC = ()=> {

const dispatch= useAppDispatch()
const existingParticipantDetails= useAppSelector(selectParticipantDetails)
const navigate= useNavigate()

const [participantDetails, setParticipantDetails] = useState<ParticipantDetails>({
    firstName: '',
    lastName: '',
    birthDate: '',
    phoneNumber: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParticipantDetails({
      ...participantDetails,
      [name]: value
    });
  };

const handleSubmit = (e: React.FormEvent)=> {
    e.preventDefault()
    dispatch(setParticipant(participantDetails))
    
    navigate('/payment')
}

useEffect(()=> {
  setParticipantDetails(existingParticipantDetails)
}, [existingParticipantDetails])

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={participantDetails.firstName}
            required
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={participantDetails.lastName}
            required
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="birthDate">Birth Date</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={participantDetails.birthDate}
            required
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={participantDetails.phoneNumber}
            required
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={participantDetails.email}
            required
            onChange={handleChange}
          />
        </div>
        <button type="submit" >Proceed to payment</button>
      </form>
    )
}

export default ParticipantForm