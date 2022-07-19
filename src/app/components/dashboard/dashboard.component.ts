import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  items!: MenuItem[];
  constructor() { }

  ngOnInit() {
      this.items = [
          { 
            label: 'الرئيسية', icon: 'pi pi-fw pi-home',routerLink:'dashboard/main'
          },
           {   
            label: 'المنتجات', icon: 'pi pi-fw pi-tags',routerLink:'dashboard/products'
            },
            {label: 'الفواتير', icon: 'pi pi-fw pi-dollar',routerLink:'dashboard/invoices'},
            {label: 'المستخدمين', icon: 'pi pi-fw pi-users',routerLink:'dashboard/users',
            },
            {
              label: 'نافذة البيع', icon: 'pi pi-fw pi-shopping-bag', routerLink:'dashboard/sell'
            },
            {
            label: 'تسجيل الخروج', icon: 'pi pi-fw pi-sign-out', routerLink:'/login'
            }
      ];
  }
}