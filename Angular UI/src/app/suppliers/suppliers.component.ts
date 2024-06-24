// supplier.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BASE_URL } from '../app.constants';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  supplierList: any[] = []; // Array to store supplier data
  filteredSupplierList: any[] = []; // Array to store filtered supplier data
  searchQuery: string = ''; // Search query entered by the user

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchSupplierData(); // Fetch supplier data when component initializes
  }

  fetchSupplierData(): void {
    // Make HTTP GET request to fetch supplier data from backend API
    this.http.get<any[]>(`${BASE_URL}/supplier`, {
      responseType: 'json',
    })
      .subscribe(data => {
        var result = data;
        this.supplierList = result; // Assign fetched supplier data to supplierList array
        this.filteredSupplierList = result; // Initialize filteredSupplierList with all supplier members
      });
  }

  filterSupplierList(): void {
    // Filter supplier list based on search query
    this.filteredSupplierList = this.supplierList.filter(supplierMember => {
      return supplierMember.Supplier.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }

  deleteSupplier(supplier: any): void {
    if (confirm('Are you sure you want to delete this supplier?')) {
      this.http.delete<any[]>(`${BASE_URL}/supplier/${supplier._id}`, {
      responseType: 'json',
      headers: {'Content-Type': 'application/json'}
    }).subscribe((data: Object) => {
          console.log(data);
          if ('error' in data) 
            alert(data.error);
          else
            alert((data as any).message);
          
          this.fetchSupplierData(); // Refresh the supplier list after deletion
        });
    }
  }
}
