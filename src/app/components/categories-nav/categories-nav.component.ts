import { Component, OnInit } from '@angular/core';
import { DoctorSpecializationsService } from '../../services/doctor-specializations.service';
import { Specialization } from '../../models/specialization.model';
import { DoctorsService } from '../../services/doctors.service';

@Component({
    selector: 'app-categories-nav',
    templateUrl: './categories-nav.component.html',
    styleUrl: './categories-nav.component.css',
    standalone: false
})
export class CategoriesNavComponent implements OnInit {

  activeCategory? : number 
  categories : Specialization[] = []
  constructor(public docSpecService : DoctorSpecializationsService, public doctors:DoctorsService){}

  ngOnInit(): void {
    this.docSpecService.getSpecializations().subscribe((res) => {
      this.docSpecService.Specializations = res
      this.categories = this.docSpecService.Specializations
      console.log(res)
    })
    
  }


  getDoctorsByCategoryId(id? : number) : void{
    this.activeCategory = id
    const specialization : Specialization = new Specialization()
    specialization.id = id


    this.doctors.getDoctorsByCategoryId(specialization).subscribe(res => {
      this.doctors.VisibleDoctors = res
      console.log(this.doctors.Doctors , 'esaa mtavari')
    })
  }
  
}
