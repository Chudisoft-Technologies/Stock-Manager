import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService) { }
  
  onSubmit(form: NgForm): void {
    if (form.valid) {
      const { username, email, password, confirmPassword } = form.value;
      if (password === confirmPassword) {
        this.authService.register(username, email, password);
      } else {
        // Handle password mismatch error
        alert('Passwords do not match');
        console.error('Passwords do not match');
      }
    }
  }
}
