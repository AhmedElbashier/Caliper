import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ProductsComponent } from './components/products/products.component';
import { SellComponent } from './components/sell/sell.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/login" },
  { path: "login", component: LoginComponent },
  { 
  path: 'dashboard', component: DashboardComponent, 
  children: 
  [
    {path:"dashboard/products",component: ProductsComponent},
    {path:"dashboard/invoices",component: InvoicesComponent},
    {path:"dashboard/sell",component: SellComponent},
    {path:"dashboard/users",component: UsersComponent},
    {path:"dashboard/main",component: MainComponent},
  ]
},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
