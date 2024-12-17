import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrl: './admin-page.component.css',
    standalone: false
})
export class AdminPageComponent implements OnInit {

    doctorsList : boolean = true

    showCategoriesNav: boolean = true;

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.router.events.subscribe(() => {
        const currentRoute = this.router.url;
        this.showCategoriesNav = currentRoute === '/adminPage/doctors';
        });
    }
}
