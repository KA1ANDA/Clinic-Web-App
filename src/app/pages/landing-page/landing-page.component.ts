import { Component, OnInit } from '@angular/core';
import { Specialization } from '../../models/specialization.model';
import { DoctorsService } from '../../services/doctors.service';
import { Doctor } from '../../models/doctor.model';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.css',
    standalone: false
})
export class LandingPageComponent {



  
}
