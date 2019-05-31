import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    if (token) {
        return true;
    }

    return false;
}

logoutUser() {
  localStorage.removeItem('token');
  this.router.navigate(['/goodbye']);
}
}
