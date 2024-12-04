export class Booking {
    constructor(public id? : number  | null, public patientId? : number , public doctorId? : number , public timeSlotId? : number , public appointmentDate? : Date , public description? : string){}
}