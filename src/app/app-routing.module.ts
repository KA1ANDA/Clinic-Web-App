import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserRegistrPageComponent } from './pages/registration-pages/user-registr-page/user-registr-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CategoriesNavComponent } from './components/categories-nav/categories-nav.component';
import { MainComponent } from './components/main/main.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BookingComponent } from './components/booking/booking.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { DoctorRegistrPageComponent } from './pages/registration-pages/doctor-registr-page/doctor-registr-page.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';


const routes: Routes = [
  // {path:"login" , component:LoginPageComponent},
  {path:"registration" , component:UserRegistrPageComponent},
  {path:"doctorRegistration" , component:DoctorRegistrPageComponent},
  {path:"categories" , component:CategoriesPageComponent},
  {path:"adminPage" , component:AdminPageComponent , children:[
    {path:"doctors" , component:DoctorsComponent},
    {path:"doctors/:id" , component:UserEditComponent},

  ]},


  {
    path:"",component:LandingPageComponent , children:[{
      path:"",component:MainComponent , children:[
        {path:"home" , component:DoctorsComponent},
        {path:"profile/:id" , component:ProfileComponent},
        {path:"booking/:id" , component:BookingComponent},


      ] 
    }]
    
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
