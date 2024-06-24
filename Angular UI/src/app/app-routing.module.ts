import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { StaffsComponent } from './staffs/staffs.component';
import { PpesComponent } from './ppes/ppes.component';
import { ItemsComponent } from './items/items.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { StaffComponent } from './staffs/staff.component';
import { PpeComponent } from './ppes/ppe.component';
import { ItemComponent } from './items/item.component';
import { SupplierComponent } from './suppliers/supplier.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'staffs', component: StaffsComponent, canActivate: [AuthGuard] },
  { path: 'ppes', component: PpesComponent, canActivate: [AuthGuard] },
  { path: 'items', component: ItemsComponent, canActivate: [AuthGuard] },
  { path: 'suppliers', component: SuppliersComponent, canActivate: [AuthGuard] },
  { path: 'staff', component: StaffComponent, canActivate: [AuthGuard] },
  { path: 'ppe', component: PpeComponent, canActivate: [AuthGuard] },
  { path: 'item', component: ItemComponent, canActivate: [AuthGuard] },
  { path: 'supplier', component: SupplierComponent, canActivate: [AuthGuard] },
  { path: 'staff', component: StaffComponent, canActivate: [AuthGuard] },
  { path: 'ppe', component: PpeComponent, canActivate: [AuthGuard] },
  { path: 'item', component: ItemComponent, canActivate: [AuthGuard] },
  { path: 'supplier', component: SupplierComponent, canActivate: [AuthGuard] },
  { path: 'staffs/edit/:id', component: StaffComponent, canActivate: [AuthGuard] },
  { path: 'ppes/edit/:id', component: PpeComponent, canActivate: [AuthGuard] },
  { path: 'items/edit/:id', component: ItemComponent, canActivate: [AuthGuard] },
  { path: 'suppliers/edit/:id', component: SupplierComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
