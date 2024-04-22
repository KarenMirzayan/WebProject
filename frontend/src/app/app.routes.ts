import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { MatSidenavModule } from '@angular/material/sidenav';

import { ApiService } from './api.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import { ElsePageComponent } from './else-page/else-page.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { BrandProductsComponent } from './brand-products/brand-products.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'categories', component: CategoryListComponent },
  // { path: 'categories/:category_id/products', component: CategoryProductsComponent },
  // { path: 'brands', component: BrandListComponent },
  // { path: 'brands/:brand_id/products', component: BrandProductsComponent },
  { path: 'elsepage', component: ElsePageComponent },
  { path: 'categories', component: CategoriesListComponent },
  {
    path: 'categories/:category_id/products',
    component: CategoryProductsComponent,
  },
  { path: 'brands', component: BrandListComponent },
  { path: 'brands/:brand_id/products', component: BrandProductsComponent },
  // { path: 'products', component: ProductListComponent },
  // { path: 'products/:product_id', component: ProductDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', component: ErrorComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule, CommonModule],
  exports: [RouterModule],
  providers: [ApiService],
})
export class AppRoutingModule {}
