import { Component, OnInit } from '@angular/core';
import { Email } from '../Models/Email';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../app.constants';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  email: Email = new Email(); message: string = "";

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.email = new Email();
  }
  SendMessage(event: any): void{
    if (this.email.FirstName.trim() == "" || this.email.LastName.trim() == "" || 
        this.email.Title.trim() == "" || this.email.email.trim() == "" || 
        this.email.message.trim() == ""){

      alert("All values are required!");
    }else{

        //Send message Here  
        var Body: any = {
          "Names": this.email.FirstName + " " + this.email.LastName,
          "Body": this.email.message,
          "Email": this.email.email,
          "Title": this.email.Title
        }
        event.target.children[0].className = "fa fa-circle-notch fa-spin text-white";
        
      this.http.post<any[]>(`${BASE_URL}/Send_Support_Email`, Body)
      .subscribe((data) => {
        const [error, message] = data
        // Check if the data object contains a property named 'errorMessage'
        if (data && error) {
          // Notify about any errors
          this.message = message;
        } else {
          // Notify that the message was sent successfully or handle other cases
          this.message = "Message sent successfully";
        }
      });

    }
  }
}
