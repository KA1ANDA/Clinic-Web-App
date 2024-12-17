import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-booking-popup',
    templateUrl: './booking-popup.component.html',
    styleUrl: './booking-popup.component.css',
    standalone: false
})

export class BookingPopupComponent {
  
  @Input() timeId: number | null = null;
  @Input() day: { day: number; weekday: string; month: number; year: number } | null = null;
  @Input() description?: string;
  @Input() bookingId?: number | null = null; 
  @Input() role?: number | null = null; 

  
  @Output() bookingConfirmed = new EventEmitter<{ timeId: number; day: any; description?: string }>();
  @Output() descriptionUpdated = new EventEmitter<{ bookingId: number; description?: string }>();
  
  confirmBooking(): void {
    if (this.timeId && this.day) {
      this.bookingConfirmed.emit({
        timeId: this.timeId,
        day: this.day,
        description: this.description
      });
    }
  }

  updateDescription(): void {
    if (this.bookingId) {
      this.descriptionUpdated.emit({
        bookingId: this.bookingId,
        description: this.description
      });
    }}
}