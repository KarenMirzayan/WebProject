import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {}

  goToHome() {
    return this.router.navigateByUrl('/home');
  }

  goToWishlist() {
    return this.router.navigateByUrl('/wishlist');
  }

  goToAccount() {
    return this.router.navigateByUrl('/account');
  }

  goToCart() {
    return this.router.navigateByUrl('/cart');
  }
  goToElsePage() {
    return this.router.navigateByUrl('/elsepage');
  }
}
