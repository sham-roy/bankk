import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  data = "your perfect banking parter"
  sata = "Enter Account No."

  acno: any
  psw: any

  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }

  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
  })

  login() {
    var acnum = this.loginForm.value.acno
    var psw = this.loginForm.value.psw
    if (this.loginForm.valid) {
      this.ds.login(acnum, psw).subscribe((result: any) => {

        localStorage.setItem("currentUser", result.currentUser)
        localStorage.setItem("currentAcno", JSON.stringify(result.currentAcno))
        localStorage.setItem("token", JSON.stringify(result.token))

        alert(result.message)
        this.router.navigateByUrl("dashboard")

      },
        result => {
          alert(result.error.message)
        })
    }
    else {
      alert("invalid form")
    }
  }
}
      // const result=this.ds.login(acnum,psw)
      // if(result){
      //   alert ("login sucess")
      //   this.router.navigateByUrl("dashboard")
      // }
      // else{
      //   alert("incorrect acno or password")
      // }
      // }

  // var userDetails=this.ds.userDetails
  // // alert('login success')
  // if(acnum in userDetails){
  //   if(psw==userDetails[acnum]["password"]){
  //     alert('login sucess')
  //     // redirection
  //     this.router.navigateByUrl("home")

  //   }
  //   else{
  //     alert('incorrect password')
  //   }
  // }
  // else{
  //   alert('incorrect ac num')
  // }
  // }

  // acChange(event:any){
  //   this.acno=event.target.value
  //   console.log(this.acno);

  // }
  // pswchange(event:any){
  //   this.psw=event.target.value
  //   console.log(this.psw);

  // }



