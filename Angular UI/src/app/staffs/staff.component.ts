import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BASE_URL } from '../app.constants';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff.component.html',
  styleUrls: ['./staffs.component.css']
})
export class StaffComponent implements OnInit {
  @Input()
  isNewStaff: boolean = true;
  staffForm: FormGroup;
  staffId: string = ''; 

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.staffForm = this.fb.group({
      Name: ['', Validators.required],
      Number: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Check if a route parameter is passed (indicating editing mode)
    this.route.paramMap.subscribe(params => {
      this.staffId = params.get('id')!;
      if (this.staffId) {
        console.log('Editing staff with ID:', this.staffId);
        
        this.isNewStaff = false;
        // Load staff data using the ID
        this.loadStaffData();
      }
    });
  }
  
  loadStaffData(): void {
    // Use this.staffId to load staff data from the server
    this.http.get(`${BASE_URL}/staff/${this.staffId}`).subscribe(
      (data: any) => {
        // Handle the loaded staff data
        console.log('Staff data:', data);
        
        this.staffForm.patchValue({
          Name: data.Name,
          Number: data.Number,
        });
      },
      error => {
        console.error('Failed to load staff data', error);
      }
    );
  }
  

  onSubmit(): void {
    if (this.staffForm.valid) {
      const formData = this.staffForm.value;
      const options = {
        headers: new HttpHeaders({ 
          'content-type': 'application/json',
          'accepts': 'application/json'
        })
      };
      // console.log('Staff form data:', formData);
      
      if (this.isNewStaff) {
        this.http.post(`${BASE_URL}/staff`, JSON.stringify(formData), options).subscribe(
          () => {
            console.log('Staff added successfully');
            alert('Staff added successfully');
            // Reset form after submission
            this.staffForm.reset();
          },
          error => {
            console.error('Failed to add Staff', error);
          }
        );
      } else {
        // Handle update logic
        this.http.put(`${BASE_URL}/staff/${this.staffId}`, JSON.stringify(formData), options).subscribe(
          () => {
            console.log('Staff updated successfully');
            alert('Staff updated successfully');
            this.isNewStaff = true;
            // Reset form after submission
            this.staffForm.reset();
          },
          error => {
            console.error('Failed to add Staff', error);
          }
        );
      }
    }else{
      alert('Please fill all the fields');
    }
  }
}
