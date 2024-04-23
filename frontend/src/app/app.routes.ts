import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { MatSidenavModule } from '@angular/material/sidenav';

import { ApiService } from './api.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ElsePageComponent } from './else-page/else-page.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { BrandProductsComponent } from './brand-products/brand-products.component';
import { ErrorComponent } from './error/error.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'categories', component: CategoriesListComponent },
  {
    path: 'categories/:category_id/products',
    component: CategoryProductsComponent,
  },
  { path: 'brands', component: BrandListComponent },
  { path: 'brands/:brand_id/products', component: BrandProductsComponent },
  { path: 'elsepage', component: ElsePageComponent },
  { path: 'categories', component: CategoriesListComponent },
  {
    path: 'categories/:category_id/products',
    component: CategoryProductsComponent,
  },
  { path: 'brands', component: BrandListComponent },
  { path: 'brands/:brand_id/products', component: BrandProductsComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'search', component: SearchComponent },
  { path: 'products/:product_id', component: ProductDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    CommonModule,
    FormsModule,
  ],
  exports: [RouterModule],
  providers: [ApiService],
})
export class AppRoutingModule {}
