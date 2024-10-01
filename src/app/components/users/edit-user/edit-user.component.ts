// src/app/components/users/edit-user/edit-user.component.ts
import { Component, Inject } from '@angular/core';
import { UsersService, User } from 'src/app/services/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  user: User;

  constructor(
    private usersService: UsersService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.user = { ...data };
  }

  updateUser(): void {
    if (this.user.username && this.user.email && this.user.role) { // Removed password from required
      this.usersService.updateUser(this.user.id, this.user).subscribe({
        next: () => {
          Swal.fire('Success', 'User updated successfully', 'success');
          this.dialogRef.close('success');
        },
        error: () => {
          Swal.fire('Error', 'Failed to update user', 'error');
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
