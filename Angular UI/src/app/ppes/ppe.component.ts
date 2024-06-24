import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BASE_URL } from '../app.constants';

@Component({
  selector: 'app-ppe-form',
  templateUrl: './ppe.component.html',
  styleUrls: ['./ppes.component.css']
})
export class PpeComponent implements OnInit {
  @Input()
  isNewPpe: boolean = true;
  ppeForm: FormGroup;
  ppeId: string = '';
  ppeData: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.ppeForm = this.fb.group({
      PPE: ['', Validators.required],
      Stock: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Check if a route parameter is passed (indicating editing mode)
    this.route.paramMap.subscribe(params => {
      this.ppeId = params.get('id')!;
      if (this.ppeId) {
        console.log('Editing ppe with ID:', this.ppeId);
        
        this.isNewPpe = false;
        // Load ppe data using the ID
        this.loadPpeData();
      }
    });
  }
  
  loadPpeData(): void {
    // Use this.ppeId to load ppe data from the server
    this.http.get(`${BASE_URL}/ppe/${this.ppeId}`).subscribe(
      (data: any) => {
        // Handle the loaded ppe data
        console.log('Ppe data:', data);
        
        this.ppeForm.patchValue({
          PPE: data.PPE,
          Stock: data.Stock,
        });
      },
      error => {
        console.error('Failed to load ppe data', error);
      }
    );
  }
  

  onSubmit(): void {
    if (this.ppeForm.valid) {
      const formData = this.ppeForm.value;
      const options = {
        headers: new HttpHeaders({ 
          'content-type': 'application/json',
          'accepts': 'application/json'
        })
      };
      // console.log('Ppe form data:', formData);
      
      if (this.isNewPpe) {
        this.http.post(`${BASE_URL}/ppe`, JSON.stringify(formData), options).subscribe(
          () => {
            console.log('Ppe added successfully');
            alert('Ppe added successfully');
            // Reset form after submission
            this.ppeForm.reset();
          },
          error => {
            console.error('Failed to add Ppe', error);
          }
        );
      } else {
        // Handle update logic
        this.http.put(`${BASE_URL}/ppe/${this.ppeId}`, JSON.stringify(formData), options).subscribe(
          () => {
            console.log('Ppe updated successfully');
            alert('Ppe updated successfully');
            this.isNewPpe = true;
            // Reset form after submission
            this.ppeForm.reset();
          },
          error => {
            console.error('Failed to add Ppe', error);
          }
        );
      }
    }else{
      alert('Please fill all the fields');
    }
  }
}
