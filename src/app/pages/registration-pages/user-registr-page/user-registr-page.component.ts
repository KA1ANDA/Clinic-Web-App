import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { User } from '../../../models/user.model';
import { ActivationCode } from '../../../models/activationCode.model';
import { RegistrationService } from '../../../services/registration.service';


@Component({
    selector: 'app-user-registr-page',
    templateUrl: './user-registr-page.component.html',
    styleUrls: ['./user-registr-page.component.css'],
    standalone: false
})
export class UserRegistrPageComponent implements OnInit {

  patient: User = new User();
  activationCodeData: ActivationCode = new ActivationCode();
  registrationError: string | null = null;

  // TIMER VARIABLES
  minutes: number = 2;
  seconds: number = 0;
  timer: any;
  isTimerEnded: boolean = false;

  formControl = this.fb.group({
    firstName: ["", [Validators.required, Validators.minLength(5)]],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]],
    personalNumber: ["", [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    activationCode: ["", Validators.required]
  });

  constructor(
    private regService: RegistrationService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {}

  // Start the timer for activation code
  startTimer(): void {
    this.isTimerEnded = false;
    this.timer = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          clearInterval(this.timer);
          this.isTimerEnded = true;
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  // Add a new patient and handle registration
  addPatient(): void {
    this.patient.firstName = this.formControl.value.firstName;
    this.patient.lastName = this.formControl.value.lastName;
    this.patient.email = this.formControl.value.email;
    this.patient.password = this.formControl.value.password;
    this.patient.personalNumber = this.formControl.value.personalNumber;
    this.patient.activationCode = this.formControl.value.activationCode;

    this.registrationError = null;

    this.regService.addPatient(this.patient).pipe(
      catchError((err) => {
        this.registrationError = err;
        this.formControl.reset();
        console.error(err);
        return of(null);
      })
    ).subscribe((response) => {
      if (response) {
        console.log('Registration successful:', response);
        this.formControl.reset();
      }
    });
  }

  // Handle activation code functionality and restart timer
  addActivationCode(): void {
    this.activationCodeData.email = this.formControl.value.email;
    this.activationCodeData.code = '';
    this.activationCodeData.createdAt = '';

    this.regService.addActivationCode(this.activationCodeData).subscribe(res => {
      console.log(res, 'activation code added');
    });

    // Reset timer and start again
    clearInterval(this.timer);
    this.minutes = 2;
    this.seconds = 0;
    this.isTimerEnded = false;
    this.startTimer();
  }
}
