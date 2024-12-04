import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

import { UserRegistrPageComponent } from './pages/registration-pages/user-registr-page/user-registr-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

import { DoctorsComponent } from './components/doctors/doctors.component';
import { CategoriesNavComponent } from './components/categories-nav/categories-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { MainInterceptor } from './interceptors/main-interceptor';
import { MainComponent } from './components/main/main.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { BookingComponent } from './components/booking/booking.component';
import { BookingPopupComponent } from './components/booking-popup/booking-popup.component';
import { SearchComponent } from './components/search/search.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { DoctorRegistrPageComponent } from './pages/registration-pages/doctor-registr-page/doctor-registr-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';




@NgModule({ declarations: [
        AppComponent,
        LoginPageComponent,
        UserRegistrPageComponent,
        LandingPageComponent,
        DoctorsComponent,
        CategoriesNavComponent,
        HeaderComponent,
        MainComponent,
        ProfileComponent,
        CalendarComponent,
        BookingComponent,
        BookingPopupComponent,
        SearchComponent,
        CategoriesPageComponent,
        AdminPageComponent,
        DoctorRegistrPageComponent,
        FooterComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule], providers: [
        provideClientHydration(),
        provideHttpClient(withFetch()),
        [{ provide: HTTP_INTERCEPTORS, useClass: MainInterceptor, multi: true }],
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
