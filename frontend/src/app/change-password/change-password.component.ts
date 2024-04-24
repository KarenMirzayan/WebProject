import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {Password, User} from "../models";
import {Location} from "@angular/common";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  oldPassword: string = "";
  newPassword: string = "";
  confirmPassword: string = "";
  password: Password;

  constructor(private userService: UserService, private router: Router, private location: Location) {
    this.password = {
      "old_password": this.oldPassword,
      "new_password": this.newPassword,
      "confirm_password": this.confirmPassword
    };
  }

  onSave(): void {
    this.password = {
      "old_password": this.oldPassword,
      "new_password": this.newPassword,
      "confirm_password": this.confirmPassword
    };
    this.userService.updatePassword(this.password).subscribe((response: any) => {
      if (response) {
        alert(JSON.stringify(response));
      }
    })
    this.router.navigate(['/login']);
  }

  onCancel(): void {
    this.location.back()
  }

}
