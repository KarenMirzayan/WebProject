import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username: string = ''
  password: string = ''

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    const access = localStorage.getItem("access");
    if (access) {
      this.router.navigate(['/home'])
    }
  }

  login(): void {
    this.userService.login(this.username, this.password).subscribe((response) => {
      localStorage.setItem('access', response.access);
      localStorage.setItem('refresh', response.refresh);
    })

    this.userService.getUserByUsername(this.username).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
    })

    this.router.navigate(['/home'])
  }


}
