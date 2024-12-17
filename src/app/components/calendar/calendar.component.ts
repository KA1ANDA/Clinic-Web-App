import { Component, Input, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DoctorsService } from '../../services/doctors.service';
import { DayOff } from '../../models/dayOff.model';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.css',
    standalone: false
})
export class CalendarComponent implements OnInit {

  @Input() mode: 'booking' | 'profile' = 'booking';
  
  constructor( public booking : BookingService , public auth : AuthenticationService , private route: ActivatedRoute , public docdata : DoctorsService){}

  
  
  activeBookingCell: { timeId: number | null; day: any | null } = { timeId: null, day: null };
  isDeleteActive:boolean = false
  isEditActive:boolean = false
  emptyBookingSlots : boolean = false
  bookingToMoveId? : number | null
  description?:string = ''
  urlId! : number 
  currentFullDate = new Date()


  daysOfTheWeek :string[] = ['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' ]


  get currentMonth():string {
    return this.currentFullDate.toLocaleDateString('default' , {month:'long'})
  }

  get currentYear():number{
    return  this.currentFullDate.getFullYear()
  }

  private refreshBookings(): void {
    const doctorBooking: Booking = new Booking(undefined, undefined, this.urlId);
    const patientBooking: Booking = new Booking(undefined, this.urlId, undefined);
  
    const doctorBookings$ = this.booking.getDoctorBookings(doctorBooking);
    const patientBookings$ = this.booking.getPatientsBookings(patientBooking);
  
    forkJoin([doctorBookings$, patientBookings$]).subscribe(
      ([doctorBookings, patientBookings]) => {
        this.booking.Bookings = [...doctorBookings, ...patientBookings];
      }
    );
  }

  ngOnInit(): void {
    this.booking.getTimeSlots().subscribe(res => {
      this.booking.TimeSlots = res
      console.log(res)
    })
    this.urlId = parseInt(this.route.snapshot.paramMap.get('id') || '');

    this.refreshBookings();

    // const loggedUserId = localStorage.getItem("logedUserId");
    // const userId = this.urlId ? this.urlId : loggedUserId && parseInt(loggedUserId)

    this.docdata.getDoctorDaysOff(this.urlId).subscribe(res => {
      this.docdata.DoctorDaysOff = res
    })

    this.booking.isDeleteActive$.subscribe(value => this.isDeleteActive = value);
    this.booking.isEditActive$.subscribe(value => this.isEditActive = value);
    
  }

  extractTimeFromSlot(slot: any): string {
    const startTime = new Date(slot);
    const hours = startTime.getHours().toString().padStart(2, '0');  
    const minutes = startTime.getMinutes().toString().padStart(2, '0'); 
    return `${hours}:${minutes}`;
  }


  getCurrentWeek():{day:number ; weekday:string; month:number; year:number}[]{
    const week:{day:number ; weekday:string; month:number; year:number}[] = []
    const currentDayIndex = this.currentFullDate.getDay()

    const startOfWeek = new Date(this.currentFullDate)
    // startOfWeek.setDate(this.currentFullDate.getDate() - currentDayIndex)

    for(let i=0 ; i<7 ; i++){
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      week.push({
        day:day.getDate(),
        weekday:this.daysOfTheWeek[day.getDay()],
        month:day.getMonth() ,
        year:day.getFullYear(),
      })
    }

    return week
  }



  getNextWeek():void{
    this.currentFullDate.setDate(this.currentFullDate.getDate()+7)
  }

  
  getPrevWeek(): void {
    const today = new Date();
    const startOfCurrentWeek = new Date(today);
    startOfCurrentWeek.setDate(today.getDate() - today.getDay()); // Get the first day of the current week
  
    // Prevent navigation to past weeks
    const startOfSelectedWeek = new Date(this.currentFullDate);
    startOfSelectedWeek.setDate(this.currentFullDate.getDate() - this.currentFullDate.getDay());
  
    if (startOfSelectedWeek <= startOfCurrentWeek) {
      return; // Do nothing if the week is in the past
    }
  
    this.currentFullDate.setDate(this.currentFullDate.getDate() - 7);
  }
  
  
  getNextMonth(): void {
    this.currentFullDate.setMonth(this.currentFullDate.getMonth() + 1);
    this.currentFullDate.setDate(1); 
  }

  getPrevMonth(): void {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
 
    if (this.currentFullDate.getFullYear() === currentYear && this.currentFullDate.getMonth() <= currentMonth) {
      return; 
    }
  
    this.currentFullDate.setMonth(this.currentFullDate.getMonth() - 1);
    this.currentFullDate.setDate(1); 
  }
  

  setBooking(timeSlotId:number , day:{day:number ; weekday:string; month:number; year:number} , description?:string ):void{

    const appointmentDate = new Date(Date.UTC(day.year, day.month, day.day));

    
    const loggedUserId = localStorage.getItem("logedUserId");
    const id: number = loggedUserId ? parseInt(loggedUserId) : 0;
    
    const booking: Booking = new Booking(undefined , id, this.urlId, timeSlotId, appointmentDate , description);

    this.booking.addBooking(booking).subscribe(() =>{
      this.refreshBookings();
    })

    this.activeBookingCell = { timeId: null, day: null };
    this.description = ''

  }

  deleteBooking(id?:number | null , patientId?:number , doctorId?:number):void{
    const booking: Booking = new Booking(id , patientId , doctorId);
    this.booking.deleteBooking(booking).subscribe(() =>{
      this.refreshBookings();
    })   
  }

  editBookingDescription(id?:number | null , newDescription?: string):void{
    
    this.isEditActive = false
    const booking: Booking = new Booking(id , undefined, undefined, undefined, undefined , newDescription);
    this.booking.updateBookingDescription(booking).subscribe(() => {
      this.refreshBookings()
    })   
  }

  updateBookingDate( TimeSlotId: number, day: { day: number; weekday: string; month: number; year: number }):void{

    const newBooking: Booking = new Booking(
      this.bookingToMoveId,  
      undefined,          
      undefined,          
      TimeSlotId,   
      new Date(Date.UTC(day.year, day.month, day.day)),
      undefined  
  );

    this.booking.updateBooking(newBooking).subscribe(() => {
      this.refreshBookings()
    })

    this.emptyBookingSlots = false
  }
 

  isBooked(
    timeSlotId: number,
    day: { day: number; weekday: string; month: number; year: number }
  ): { bookingId?: number | null ,
     isBooked: boolean, 
     patientId: boolean ,
     patient?:number,
     doctor?:number,
    description? : string } {
    const appointmentDate = new Date(day.year, day.month, day.day).toLocaleDateString('en-US'); // Format the date
  
  
    const loggedUserId = localStorage.getItem("logedUserId");
    const userId = loggedUserId ? parseInt(loggedUserId) : null;
  
    const booking = this.booking.Bookings.find(booking => {
      const bookingDate = booking.appointmentDate
        ? new Date(booking.appointmentDate).toLocaleDateString('en-US')
        : '';
      return booking.timeSlotId === timeSlotId && bookingDate === appointmentDate;
    });

    // console.log(booking , 'what')
    this.description = booking?.description
    return {
      bookingId: booking ? booking.id : null,
      isBooked: !!booking, // true if a booking exists, false otherwise
      patientId: booking ? booking.patientId === userId : false, // Check if logged user matches the booking's patientId
      patient:booking && booking.patientId,
      doctor:booking && booking.doctorId,
      description : booking ? booking.description : ''
    };
  }


  isDayOff(
    day: { day: number; weekday: string; month: number; year: number }
  ): boolean {
   
    const appointmentDate = new Date(day.year, day.month, day.day).toLocaleDateString('en-US');
  
    
    const isDayOff = this.docdata.DoctorDaysOff.some(dayOff => {
      const dayOffDate = dayOff.dayOffDate
        ? new Date(dayOff.dayOffDate).toLocaleDateString('en-US')
        : '';
      return dayOffDate === appointmentDate;
    });
  
    return isDayOff; 
  }

  setDayOff(
    dayOffDate: { day: number; weekday: string; month: number; year: number }
  ): void {
    const loggedUserId = localStorage.getItem("logedUserId");
    const doctorId =
      this.auth.LogedUserData.role === 0
        ? this.urlId
        : loggedUserId !== null
        ? parseInt(loggedUserId, 10)
        : undefined;
  
    if (doctorId === null) {
      console.error("Doctor ID cannot be null");
      return;
    }
  
    const date = new Date(Date.UTC(dayOffDate.year, dayOffDate.month, dayOffDate.day));
    const formattedDate = date.toLocaleDateString("en-US");
  
    this.booking.Bookings.forEach((booking) => {
      const bookingDate = booking.appointmentDate
        ? new Date(booking.appointmentDate).toLocaleDateString("en-US")
        : "";
      if (bookingDate === formattedDate) {
        const bookingToDelete = new Booking(booking.id, undefined, doctorId);
        this.booking.deleteBooking(bookingToDelete).subscribe(() => {
          this.refreshBookings();
          console.log(`Booking with ID ${booking.id} deleted.`);
        });
      }
    });
  
    const day: DayOff = new DayOff(undefined, doctorId, date);
  
    // Add the day-off using the service
    this.docdata.addDayOff(day).subscribe(() => {
      this.docdata.getDoctorDaysOff(this.urlId).subscribe((res) => {
        this.docdata.DoctorDaysOff = res;
      });
    });
  }
  
  isSameDay(day1: any, day2: any): boolean {
    return JSON.stringify(day1) === JSON.stringify(day2);
  }

  toggleActiveBookingCell(timeId: number, day: any): void {
 
    if (this.activeBookingCell.timeId === timeId && this.isSameDay(this.activeBookingCell.day, day)) {
        // Close the booking window if clicked again
        this.activeBookingCell = { timeId: null, day: null };
    } else {
        // Open the booking window for the clicked cell
        this.description = this.isBooked(timeId,day).description
        this.activeBookingCell = { timeId, day };
      
    }
  }


  // toggleDelete():void{
  //   this.isDeleteActive = !this.isDeleteActive
  //   this.isEditActive = false
  // }
  
  
  // toggleEdit():void{
  //   this.isEditActive = !this.isEditActive
  //   this.isDeleteActive  = false
  //   this.emptyBookingSlots = false
  // }


  toggleDelete(): void {
    this.booking.toggleDelete();
  }

  toggleEdit(): void {
    this.booking.toggleEdit();
  }


  toggleEmptyBookingSlots(id? : number | null):void{
    this.bookingToMoveId = id
    this.emptyBookingSlots = !this.emptyBookingSlots
  }
  

}
