import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  Register() {
    this.router.navigate(['../../../register']);
  }

  Login(){
    this.router.navigate(['../../../login']);
  }
}
