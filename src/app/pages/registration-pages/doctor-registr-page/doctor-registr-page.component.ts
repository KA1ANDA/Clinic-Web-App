import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { Doctor } from '../../../models/doctor.model';
import { RegistrationService } from '../../../services/registration.service';
import { DoctorSpecializationsService } from '../../../services/doctor-specializations.service';


@Component({
  selector: 'app-doctor-registr-page',
  templateUrl: './doctor-registr-page.component.html',
  styleUrls: ['./doctor-registr-page.component.css']
})
export class DoctorRegistrPageComponent implements OnInit {
  
  doctor: Doctor = new Doctor();
  selecteFile: File | null = null;
  selectePhoto: File | null = null;
  registrationError: string | null = null;

  formControl = this.fb.group({
    firstName: ["", [Validators.required, Validators.minLength(5)]],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]],
    personalNumber: ["", [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    specializationId: [""],
    cv: [null]
  });

  constructor(
    public regService: RegistrationService,
    public docSpecService: DoctorSpecializationsService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.docSpecService.getSpecializations().subscribe(res => {
      this.docSpecService.Specializations = res;
    });
  }

  addDoctor(): void {
    this.doctor.firstName = this.formControl.value.firstName;
    this.doctor.lastName = this.formControl.value.lastName;
    this.doctor.email = this.formControl.value.email;
    this.doctor.password = this.formControl.value.password;
    this.doctor.personalNumber = this.formControl.value.personalNumber;
    this.doctor.specializationId = this.formControl.value.specializationId;
    
    if (this.selecteFile) {
      this.doctor.cv = this.selecteFile;
    }

    if (this.selectePhoto) {
      this.doctor.photo = this.selectePhoto;
    }

    this.registrationError = null;

    this.regService.addDoctor(this.doctor).pipe(
      catchError((err) => {
        this.registrationError = err;
        console.error(err);
        return of(null);
      })
    ).subscribe();

    this.formControl.reset();
    console.log(this.doctor);
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selecteFile = file;
    }
  }

  onPhotoChange(event: any): void {
    const photo = event.target.files[0];
    if (photo) {
      this.selectePhoto = photo;
    }
  }
}
