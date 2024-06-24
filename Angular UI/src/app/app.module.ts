import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "./navbar/navbar.component";
import { AuthService } from './auth/auth.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { StaffsComponent } from './staffs/staffs.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { ItemsComponent } from './items/items.component';
import { PpesComponent } from './ppes/ppes.component';
import { StaffComponent } from './staffs/staff.component';
import { SupplierComponent } from './suppliers/supplier.component';
import { ItemComponent } from './items/item.component';
import { PpeComponent } from './ppes/ppe.component';
import { SupportComponent } from './support/support.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        DashboardComponent,
        SupportComponent,
        LoginComponent,
        RegisterComponent,
        StaffsComponent,
        SuppliersComponent,
        HomeComponent,
        ItemsComponent,
        PpesComponent,
        StaffComponent,
        SupplierComponent,
        ItemComponent,
        PpeComponent
    ],
    providers: [
      AuthService, HttpClient, AuthGuard, provideHttpClient(),
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class AppModule { }
