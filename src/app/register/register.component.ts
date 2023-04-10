import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }

  registerForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]]
  })

  register() {
    var acno = this.registerForm.value.acno
    var psw = this.registerForm.value.psw
    var uname = this.registerForm.value.uname

    if (this.registerForm.valid) {
      this.ds.register(acno, uname, psw).subscribe((result:any)=>{
        alert(result.message)
        this.router.navigateByUrl("")

      },
      result=> {
        alert(result.error.message)
      })
    }
    else{
      alert("invalid form")
    }
  }
}
