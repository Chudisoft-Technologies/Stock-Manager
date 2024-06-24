// item.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BASE_URL } from '../app.constants';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  itemList: any[] = []; // Array to store item data
  filteredItemList: any[] = []; // Array to store filtered item data
  searchQuery: string = ''; // Search query entered by the user

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchItemData(); // Fetch item data when component initializes
  }

  fetchItemData(): void {
    // Make HTTP GET request to fetch item data from backend API
    this.http.get<any[]>(`${BASE_URL}/item`, {
      responseType: 'json',
    })
      .subscribe(data => {
        var result = data;
        this.itemList = result; // Assign fetched item data to itemList array
        this.filteredItemList = result; // Initialize filteredItemList with all item members
      });
  }

  filterItemList(): void {
    // Filter item list based on search query
    this.filteredItemList = this.itemList.filter(itemMember => {
      return itemMember.Item.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }

  deleteItem(item: any): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.http.delete<any[]>(`${BASE_URL}/item/${item._id}`, {
      responseType: 'json',
      headers: {'Content-Type': 'application/json'}
    }).subscribe((data: Object) => {
          console.log(data);
          if ('error' in data) 
            alert(data.error);
          else
            alert((data as any).message);
          
          this.fetchItemData(); // Refresh the item list after deletion
        });
    }
  }
}
