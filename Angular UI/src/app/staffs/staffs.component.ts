// staff.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BASE_URL } from '../app.constants';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.css']
})
export class StaffsComponent implements OnInit {
  staffList: any[] = []; // Array to store staff data
  filteredStaffList: any[] = []; // Array to store filtered staff data
  searchQuery: string = ''; // Search query entered by the user

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchStaffData(); // Fetch staff data when component initializes
  }

  fetchStaffData(): void {
    // Make HTTP GET request to fetch staff data from backend API
    this.http.get<any[]>(`${BASE_URL}/staff`, {
      responseType: 'json',
    })
      .subscribe(data => {
        var result = data;
        this.staffList = result; // Assign fetched staff data to staffList array
        this.filteredStaffList = result; // Initialize filteredStaffList with all staff members
      });
  }

  filterStaffList(): void {
    // Filter staff list based on search query
    this.filteredStaffList = this.staffList.filter(staffMember => {
      return staffMember.Name.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }

  deleteStaff(staff: any): void {
    if (confirm('Are you sure you want to delete this staff?')) {
      this.http.delete<any[]>(`${BASE_URL}/staff/${staff._id}`, {
      responseType: 'json',
      headers: {'Content-Type': 'application/json'}
    }).subscribe((data: Object) => {
        console.log(data);
        if ('error' in data) 
          alert(data.error);
        else
          alert((data as any).message);
        
          this.fetchStaffData(); // Refresh the staff list after deletion
        });
    }
  }
}
