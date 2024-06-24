import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BASE_URL } from '../app.constants';

@Component({
  selector: 'app-ppes',
  templateUrl: './ppes.component.html',
  styleUrls: ['./ppes.component.css']
})
export class PpesComponent implements OnInit {
  ppeList: any[] = []; // Array to store ppe data
  filteredPpeList: any[] = []; // Array to store filtered ppe data
  searchQuery: string = ''; // Search query entered by the user

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchPpeData(); // Fetch ppe data when component initializes
  }

  fetchPpeData(): void {
    // Make HTTP GET request to fetch ppe data from backend API
    this.http.get<any[]>(`${BASE_URL}/ppe`, {
      responseType: 'json',
    })
      .subscribe(data => {
        var result = data;
        this.ppeList = result; // Assign fetched ppe data to ppeList array
        this.filteredPpeList = result; // Initialize filteredPpeList with all ppe members
      });
  }

  filterPpeList(): void {
    // Filter ppe list based on search query
    this.filteredPpeList = this.ppeList.filter(ppeMember => {
      return ppeMember.PPE.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }

  deletePpe(ppe: any): void {
    if (confirm('Are you sure you want to delete this ppe?')) {
      this.http.delete<any[]>(`${BASE_URL}/ppe/${ppe._id}`, {
      responseType: 'json',
      headers: {'Content-Type': 'application/json'}
    
    }).subscribe((data: Object) => {
      console.log(data);
      if ('error' in data) 
        alert(data.error);
      else
        alert((data as any).message);
      
          this.fetchPpeData(); // Refresh the ppe list after deletion
        });
    }
  }
}
