import Participants from "./participants.mongo";
import { ParsedQs } from 'qs';

export async function createParticipant(participant: ParsedQs){
    try {   
        return await Participants.create({
            courseId:participant.courseId,
            firstName: participant.firstName,
            lastName: participant.lastName,
            birthDate: participant.birthDate,
            phoneNumber:participant.phoneNumber,
            email: participant.email
        })
    } catch (err) {
        return err
    }
}