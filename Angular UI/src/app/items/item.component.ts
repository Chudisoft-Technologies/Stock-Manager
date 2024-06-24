import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BASE_URL } from '../app.constants';

@Component({
  selector: 'app-item-form',
  templateUrl: './item.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemComponent implements OnInit {
  @Input()
  isNewItem: boolean = true;
  itemForm: FormGroup;
  itemId: string = ''; // Add itemId property to store the ID of the item being edited

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.itemForm = this.fb.group({
      Supplier: ['', Validators.required],
      Item: ['', Validators.required],
      "Allocated _Staff": ['', Validators.required],
      Cost: ['', Validators.required],
      Stock_Level: ['', Validators.required]
    });
  }

  
  ngOnInit(): void {
    // Check if a route parameter is passed (indicating editing mode)
    this.route.paramMap.subscribe(params => {
      this.itemId = params.get('id')!;
      if (this.itemId) {
        console.log('Editing item with ID:', this.itemId);
        
        this.isNewItem = false;
        // Load item data using the ID
        this.loadItemData();
      }
    });
  }
  
  loadItemData(): void {
    // Use this.itemId to load item data from the server
    this.http.get(`${BASE_URL}/item/${this.itemId}`).subscribe(
      (data: any) => {
        // Handle the loaded item data
        console.log('Item data:', data);
        
        this.itemForm.patchValue({
          Item: data.Item,
          Supplier: data.Supplier,
          "Allocated _Staff": data["Allocated _Staff"],
          Cost: data.Cost,
          Stock_Level: data.Stock_Level
        });
      },
      error => {
        console.error('Failed to load item data', error);
      }
    );
  }
  

  onSubmit(): void {
    if (this.itemForm.valid) {
      const formData = this.itemForm.value;
      const options = {
        headers: new HttpHeaders({ 
          'content-type': 'application/json',
          'accepts': 'application/json'
        })
      };
      // console.log('Item form data:', formData);
      
      if (this.isNewItem) {
        this.http.post(`${BASE_URL}/item`, JSON.stringify(formData), options).subscribe(
          () => {
            console.log('Item added successfully');
            alert('Item added successfully');
            // Reset form after submission
            this.itemForm.reset();
          },
          error => {
            console.error('Failed to add Item', error);
          }
        );
      } else {
        // Handle update logic
        this.http.put(`${BASE_URL}/item/${this.itemId}`, JSON.stringify(formData), options).subscribe(
          () => {
            console.log('Item updated successfully');
            alert('Item updated successfully');
            this.isNewItem = true;
            // Reset form after submission
            this.itemForm.reset();
          },
          error => {
            console.error('Failed to add Item', error);
          }
        );
      }
    }else{
      alert('Please fill all the fields');
    }
  }
}
