import { ExperienceEntry } from "./experienceEntry";
import { User } from "./user.model";

export class Doctor extends User{
    constructor(

    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    personalNumber?: string,
    photo?: File | null,
    bookingQuantity?: number,    
    role? : number | null,
    public specializationId ? : number  ,
    public rating? : number | null,
    public cv? : File | null ,
    public experience? : ExperienceEntry[] 

    
    ){
        super(id, firstName, lastName, email, password, personalNumber, photo, bookingQuantity,role);
    }
    
    
}