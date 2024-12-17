import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimeSlot } from '../models/timeSlot.model';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private isDeleteActiveSource = new BehaviorSubject<boolean>(false);
  private isEditActiveSource = new BehaviorSubject<boolean>(false);

  isDeleteActive$ = this.isDeleteActiveSource.asObservable();
  isEditActive$ = this.isEditActiveSource.asObservable();

  
  timeSlots : TimeSlot[]= []
  bookings : Booking[] = []

  baseUrl:string = "https://localhost:7091/api/"
  constructor(private http : HttpClient) { }


  toggleDelete(): void {
    this.isDeleteActiveSource.next(!this.isDeleteActiveSource.value);
    this.isEditActiveSource.next(false); 
  }

  toggleEdit(): void {
    this.isEditActiveSource.next(!this.isEditActiveSource.value);
    this.isDeleteActiveSource.next(false);  
  }


  addBooking(booking : Booking): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}Booking/add_booking` , booking)
  }

  updateBooking(bookng : Booking):Observable<any> {
    return this.http.put<any>(`${this.baseUrl}Booking/update_booking`, bookng)
  }

  getDoctorBookings(booking : Booking):Observable<any>{
    return this.http.post(`${this.baseUrl}Booking/get_doctor_bookings` , booking)
  }

  getPatientsBookings(booking : Booking):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}Booking/get_patient_bookings`,booking)
  }

  deleteBooking(booking:Booking):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}Booking/delete_booking`,booking)
  }

  updateBookingDescription(booking : Booking):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}Booking/update_booking_description` , booking)
  }

  getTimeSlots():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}Booking/get_time_slots`)
  }


  get TimeSlots () : TimeSlot[] {
    return this.timeSlots
  } 


  set TimeSlots (timeSlots : TimeSlot[] ) {
    this.timeSlots = timeSlots
  }


  get Bookings () : Booking[] {
    return this.bookings
  } 


  set Bookings (bookings : Booking[] ) {
    this.bookings = bookings
  }
}
