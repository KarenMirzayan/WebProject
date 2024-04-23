import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from './api.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ElsePageComponent } from './else-page/else-page.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { BrandProductsComponent } from './brand-products/brand-products.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    WishlistComponent,
    ElsePageComponent,
    LoginComponent,
    RegisterComponent,
    CategoriesListComponent,
    BrandListComponent,
    CategoryProductsComponent,
    BrandProductsComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
