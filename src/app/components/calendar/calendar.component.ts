import { Component, Input, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {

  @Input() mode: 'booking' | 'profile' = 'booking';
  
  constructor( public booking : BookingService , public auth : AuthenticationService , private route: ActivatedRoute){}

  

  activeBookingCell: { timeId: number | null; day: any | null } = { timeId: null, day: null };
  isDeleteActive:boolean = false
  isEditActive:boolean = false
  description:string = ''
  urlId! : number 
  currentFullDate = new Date()


  daysOfTheWeek :string[] = ['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' ]


  get currentMonth():string {
    return this.currentFullDate.toLocaleDateString('default' , {month:'long'})
  }

  get currentYear():number{
    return  this.currentFullDate.getFullYear()
  }

  ngOnInit(): void {
    this.booking.getTimeSlots().subscribe(res => {
      this.booking.TimeSlots = res
      console.log(res)
    })
    this.urlId = parseInt(this.route.snapshot.paramMap.get('id') || '');

    const doctorBooking: Booking = new Booking(undefined , undefined, this.urlId);
    const patientBooking: Booking = new Booking(undefined , this.urlId, undefined);

    const doctorBookings$ = this.booking.getDoctorBookings(doctorBooking);
    const patientBookings$ = this.booking.getPatientsBookings(patientBooking);
  
    // Combine both API calls
    forkJoin([doctorBookings$, patientBookings$]).subscribe(
      ([doctorBookings, patientBookings]) => {
        this.booking.Bookings = [...doctorBookings, ...patientBookings];
      }
    );
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

  
  getPrevWeek():void{
    this.currentFullDate.setDate(this.currentFullDate.getDate()-7)
  }
  
  getNextMonth(): void {
    this.currentFullDate.setMonth(this.currentFullDate.getMonth() + 1);
    this.currentFullDate.setDate(1); // Reset to the first day of the new month
  }

  getPrevMonth(): void {
    this.currentFullDate.setMonth(this.currentFullDate.getMonth() - 1);
    this.currentFullDate.setDate(1); // Reset to the first day of the previous month
  }
  

  setBooking(timeSlotId:number , day:{day:number ; weekday:string; month:number; year:number}):void{

    const appointmentDate = new Date(Date.UTC(day.year, day.month, day.day));

    
    const loggedUserId = localStorage.getItem("logedUserId");
    const id: number = loggedUserId ? parseInt(loggedUserId) : 0;
    
    const booking: Booking = new Booking(undefined , id, this.urlId, timeSlotId, appointmentDate , this.description);

    this.booking.addBooking(booking).subscribe()
    this.activeBookingCell = { timeId: null, day: null };
    this.description = ''

  }

  deleteBooking(id?:number | null):void{
    const booking: Booking = new Booking(id);
    this.booking.deleteBooking(booking).subscribe()   
  }

  editBookingDescription(id?:number | null , newDescription?: string):void{
    const booking: Booking = new Booking(id , undefined, undefined, undefined, undefined , newDescription);
    this.booking.updateBookingDescription(booking).subscribe()   
  }
 

  isBooked(
    timeSlotId: number,
    day: { day: number; weekday: string; month: number; year: number }
  ): { bookingId?: number | null , isBooked: boolean; patientId: boolean } {
    const appointmentDate = new Date(day.year, day.month, day.day).toLocaleDateString('en-US'); // Format the date
  
  
    const loggedUserId = localStorage.getItem("logedUserId");
    const userId = loggedUserId ? parseInt(loggedUserId) : null;
  
    const booking = this.booking.Bookings.find(booking => {
      const bookingDate = booking.appointmentDate
        ? new Date(booking.appointmentDate).toLocaleDateString('en-US')
        : '';
      return booking.timeSlotId === timeSlotId && bookingDate === appointmentDate;
    });
  
    return {
      bookingId: booking ? booking.id : null,
      isBooked: !!booking, // true if a booking exists, false otherwise
      patientId: booking ? booking.patientId === userId : false, // Check if logged user matches the booking's patientId
    };
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
        this.activeBookingCell = { timeId, day };
      
    }
  }


  toggleDelete():void{
    this.isDeleteActive = !this.isDeleteActive
    this.isEditActive = false
  }
  
  
  toggleEdit():void{
    this.isEditActive = !this.isEditActive
    this.isDeleteActive  = false
  }
}
