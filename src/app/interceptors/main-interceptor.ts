import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { catchError, EMPTY, throwError } from "rxjs";

@Injectable()
export class MainInterceptor implements HttpInterceptor {
    constructor(private router:Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): any {

        const token = localStorage.getItem("Token");
        let request;

        if (req.body instanceof FormData) {
            // Don't modify Content-Type for FormData requests
            request = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)  // Only set Authorization header
            });
        } else {
            // Otherwise, set 'Content-Type' to 'application/json'
            if (token != null) {
                request = req.clone({
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    })
                });
            } else {
                request = req.clone({
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                });
            }
        }
    
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.router.navigate(['login']);
                    
                    return EMPTY;
                } else {
                    const errorMessage = error.error?.message || "An unknown error occurred!";
                    console.log(errorMessage)
                    return throwError(() => new Error(errorMessage));
                }
            })
        )
    }
}