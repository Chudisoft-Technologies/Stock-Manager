import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BASE_URL } from '../app.constants';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SupplierComponent implements OnInit {
  @Input()
  isNewSupplier: boolean = true;
  supplierForm: FormGroup;
  supplierId: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.supplierForm = this.fb.group({
      Supplier: ['', Validators.required],
      ['Phone Number']: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Address: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    // Check if a route parameter is passed (indicating editing mode)
    this.route.paramMap.subscribe(params => {
      this.supplierId = params.get('id')!;
      if (this.supplierId) {
        console.log('Editing supplier with ID:', this.supplierId);
        
        this.isNewSupplier = false;
        // Load supplier data using the ID
        this.loadSupplierData();
      }
    });
  }
  
  loadSupplierData(): void {
    // Use this.supplierId to load supplier data from the server
    this.http.get(`${BASE_URL}/supplier/${this.supplierId}`).subscribe(
      (data: any) => {
        // Handle the loaded supplier data
        console.log('Supplier data:', data);
        
        this.supplierForm.patchValue({
          Supplier: data.Supplier,
          "Phone Number": data['Phone Number'],
          Email: data.Email,
          Address: data.Address,
        });
      },
      error => {
        console.error('Failed to load supplier data', error);
      }
    );
  }
  

  onSubmit(): void {
    if (this.supplierForm.valid) {
      const formData = this.supplierForm.value;
      const options = {
        headers: new HttpHeaders({ 
          'content-type': 'application/json',
          'accepts': 'application/json'
        })
      };
      // console.log('Supplier form data:', formData);
      
      if (this.isNewSupplier) {
        this.http.post(`${BASE_URL}/supplier`, JSON.stringify(formData), options).subscribe(
          () => {
            console.log('Supplier added successfully');
            alert('Supplier added successfully');
            // Reset form after submission
            this.supplierForm.reset();
          },
          error => {
            console.error('Failed to add Supplier', error);
          }
        );
      } else {
        // Handle update logic
        this.http.put(`${BASE_URL}/supplier/${this.supplierId}`, JSON.stringify(formData), options).subscribe(
          () => {
            console.log('Supplier updated successfully');
            alert('Supplier updated successfully');
            this.isNewSupplier = true;
            // Reset form after submission
            this.supplierForm.reset();
          },
          error => {
            console.error('Failed to add Supplier', error);
          }
        );
      }
    }else{
      alert('Please fill all the fields');
    }
  }
}
