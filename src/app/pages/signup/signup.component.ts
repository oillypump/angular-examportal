import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService, private _snack: MatSnackBar) { }

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.user)
    if(this.user.username == '' || this.user.username == null){
      // alert('User is reqired')
      this._snack.open("Username is required !","", {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      })
      return;
    }
    this.userService.addUser(this.user).subscribe(
      (data: any)=>{
        //success
        console.log(data)
        // alert('success')
        Swal.fire('Success Done !','user id is ' + data.id,'success')
      },
      (error)=>{
        console.log(error)
        // alert('something went wrong')
        // this.snack.open('something went wrong !','',{
          // duration: 3000,
        this._snack.open(error.error.text,'',{
          duration: 3000,
        })

      }
    )
  }
}
