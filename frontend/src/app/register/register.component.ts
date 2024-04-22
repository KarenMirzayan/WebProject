import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = ""
  password: string = ""
  email: string = ""

  constructor(private userService: UserService, private router: Router) {}

  register(): void {
    this.userService.register(this.username, this.password, this.email).subscribe((response: any) => {
      if (response) {
        alert(JSON.stringify(response));
      }
      else {
        this.router.navigate(['/login']);
      }
    })
  }
}
