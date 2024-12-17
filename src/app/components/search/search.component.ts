import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../../services/doctors.service';
import { DoctorSpecializationsService } from '../../services/doctor-specializations.service';
import { Specialization } from '../../models/specialization.model';




@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
    standalone: false
})
export class SearchComponent implements OnInit {

  defaultPhoto: string = 'assets/images/default.png';
  isInputActive : boolean = false
  isCategorySelectActive : boolean = false
  categoryId? : number 
  searchValue : string = ''
  byteConvert : string = 'data:image/jpeg;base64,'

  constructor(public docdata : DoctorsService , public docSpecService : DoctorSpecializationsService){}


  ngOnInit(): void {
    this.docSpecService.getSpecializations().subscribe((res) => {
      this.docSpecService.Specializations = res
    })
    
  }
  
  searchDoctors(){
    this.docdata.getSearchedDoctors(this.searchValue).subscribe(res =>{
      this.docdata.SearchedDoctors = res
      console.log(res , 'SEARCHEEEEDDD')
    })
  }

  getDoctorsByCategoryId(categoryId? : number ) : void{
    const specialization : Specialization = new Specialization()
    specialization.id = categoryId



    this.docdata.getDoctorsByCategoryId(specialization).subscribe(res => {
      this.docdata.VisibleDoctors = res

    })
  }

  toggleCategorySelect():void{
    this.isCategorySelectActive = !this.isCategorySelectActive
  }
}
