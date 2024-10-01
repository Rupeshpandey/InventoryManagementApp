// src/app/components/users/add-user/add-user.component.ts
import { Component } from '@angular/core';
import { UsersService, User } from 'src/app/services/users.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  user: User = {
    id: 0,
    username: '',
    email: '',
    passwordHash: '',
    role: '',
    createdAt: new Date()
  };

  constructor(
    private usersService: UsersService,
    public dialogRef: MatDialogRef<AddUserComponent>
  ) { }

  addUser(): void {
    if (this.user.username && this.user.email && this.user.passwordHash && this.user.role) {
      this.usersService.addUser(this.user).subscribe({
        next: () => {
          Swal.fire('Success', 'User added successfully', 'success');
          this.dialogRef.close('success');
        },
        error: () => {
          Swal.fire('Error', 'Failed to add user', 'error');
        }
      });
    } else {
      Swal.fire('Warning', 'Please fill all the fields', 'warning');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
