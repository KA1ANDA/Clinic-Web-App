export class User {
    constructor(
        public  id? : number | null,
        public  firstName? : string | null,
        public  lastName? : string | null,
        public  email? : string | null,
        public  password? : string | null,
        public  personalNumber? : string | null,
        public  photo?: File | null,
        public  bookingQuantity? : number | null,
        public  role? : number | null,
        public  activationCode? : string | null
        


    ){}
} 