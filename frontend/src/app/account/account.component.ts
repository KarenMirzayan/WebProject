import {Component} from '@angular/core';
import {User} from "../models";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  user: User;
  editMode: boolean = false;
  username: string;
  firstName: string;
  lastName: string;
  email: string;

  constructor(private userService: UserService, private router: Router) {
    let user = localStorage.getItem('user')
    if (user) {
      this.user = JSON.parse(user)
    } else {
      this.user = {
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        is_superuser: false
      }
      router.navigate(['/login'])
    }
    this.username = this.user.username;
    this.firstName = this.user.first_name;
    this.lastName = this.user.last_name;
    this.email = this.user.email;
  }

  updateUser() {
    this.user.username = this.username;
    this.user.email = this.email;
    this.user.first_name = this.firstName;
    this.user.last_name = this.lastName;
    this.userService.updateUser(this.user).subscribe((response) => {
        this.user = response;
        localStorage.setItem('user', JSON.stringify(this.user));
        console.log(this.user);
        console.log(response);
        this.editMode = false;
      }
    )
  }

  edit() {
    this.editMode = !this.editMode;
  }

  cancelEdit() {
    this.editMode = false;
    this.username = this.user.username;
    this.firstName = this.user.first_name;
    this.lastName = this.user.last_name;
    this.email = this.user.email;
  }

  changePassword() {
    this.router.navigate(['/password']);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
