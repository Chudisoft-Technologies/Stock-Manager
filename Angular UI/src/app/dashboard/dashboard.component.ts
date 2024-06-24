import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../app.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  
  items: { name: string, total: number, routes: string, route: string }[] = [];
  low_stock: { _id: string,  id: string, Item: string, Supplier: string , ['Allocated _Staff']: string , Cost: string, Stock_Level: string  }[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    // Fetch PPES, Suppliers, Items, Staffs
    this.http.get<any[]>(`${BASE_URL}/dashboard`).subscribe(data => {
      const result: {
        ppes: any[];
        suppliers: any[];
        items: any[];
        staffs: any[];
        low_stocks: any[];
      } = (data as any).data;
      
      this.items.push({ name: 'PPE', total: result.ppes.length,  routes: 'ppes', route: 'ppe' });
      this.items.push({ name: 'Supplier', total: result.suppliers.length, routes: 'suppliers', route: 'supplier' });
      this.items.push({ name: 'Item', total: result.items.length,  routes: 'items', route: 'item' });
      this.items.push({ name: 'Staff', total: result.staffs.length,  routes: 'staffs', route: 'staff' });
      // this.low_stock = result.items.filter((item: any) => item.quantity < 10);
      console.log(result.low_stocks);
      
      this.low_stock = result.low_stocks;
    });
  }
}
