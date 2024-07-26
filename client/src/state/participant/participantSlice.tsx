import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ParticipantDetails } from '../../types/types';
import { RootState } from '../store';

export interface ParticipantDetailsState {
    participant: ParticipantDetails
}

const initialState: ParticipantDetailsState = {
    participant: {
        firstName: '',
        lastName: '',
        birthDate: '',
        phoneNumber: '',
        email: ''
    }
        
   

}

const participantSlice= createSlice({
    name: 'participant',
    initialState,
    reducers: {
        setParticipant (state, action: PayloadAction<ParticipantDetails>){
            state.participant=action.payload
        }

    }
})

export const { setParticipant} = participantSlice.actions;
export const selectParticipantDetails= (state: RootState): ParticipantDetails=> state.participant.participant
export default participantSlice.reducer;