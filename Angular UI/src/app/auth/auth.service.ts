import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry, tap } from 'rxjs/operators';
import { BASE_URL } from '../app.constants';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }


  login(username: string, password: string): any {
    const url = `${BASE_URL}/auth/login`;
    const body = { username, password };
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post(url, body, options).subscribe(
      (response: any) => {
        if (response && response.token) {
          const token = response.token;
          console.log('Login successful', response);
          localStorage.setItem('token', token); // Store token in localStorage on successful login
          window.location.href = "./dashboard";
        } else {
          console.error('Login failed: Token not found in response');
        }
      },
      error => {
        console.error('Login failed', error);
        // You may want to handle the error and display it to the user
        // For example:
        // this.errorMessage = 'Login failed: ' + error.message;
      }
    );
    
  }

  register(username: string, email: string, password: string): any {
    const url = `${BASE_URL}/auth/register`;
    const body = JSON.stringify({ username: username, email: email, password: password });
    // const body = { username, email, password };
    // console.log(body);
    
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http.post( url, body, options).subscribe(response => {
      // Handle successful registration
      alert('Registration successful: ' + response);
      window.location.href = "/login"
    }, error => {
      // Handle registration error
      console.error('Registration failed', error);
      return 'Registration failed' + error;
    });
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError(error); // Returning an observable
  }
  
  logout() {
    localStorage.removeItem('token'); // Remove token from localStorage on logout
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Get token from localStorage
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Check if token exists
  }
}
