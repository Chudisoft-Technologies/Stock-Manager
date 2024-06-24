import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService) { }
  
  onSubmit(form: NgForm): void {
    if (form.valid) {
      const { username, password } = form.value;
      this.authService.login(username, password);
    }
  }
}
