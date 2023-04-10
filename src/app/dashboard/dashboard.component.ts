import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
onDelete() {
throw new Error('Method not implemented.');
}

  user: any
  acno: any
  sDetails: any

  constructor(private ds: DataService, private fb: FormBuilder, private router: Router) {
    // access data from dataservices and store in a variable
    this.user = localStorage.getItem("currentUser")
    this.sDetails = new Date()
  }

  ngOnInit(): void {
    // if(!localStorage.getItem("currentAcno")){
    //   alert('please login')
    //   this.router.navigateByUrl("")
  // }
    }
  

  depositForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    amnt: ['', [Validators.required, Validators.pattern('[0-9]+')]] 
  })

  deposit() {
    var acno = this.depositForm.value.acno
    var psw = this.depositForm.value.psw
    var amnt = this.depositForm.value.amnt


    if (this.depositForm.valid) {
      this.ds.deposit(acno, psw, amnt).subscribe((result: any) => {
        alert(result.message)
      },
        result => {
          alert(result.error.message)
        })
    }
    else {
      alert("invalid form")
    }
  }

    //   if (result) {
    //     alert(`your ac has been creadited with amount ${amnt} and the available balance is ${result}`)
    //   }
    //   else {
    //     alert('incorrect acno or password')
    //   }
    // }
  //   else {
  //     alert("invalid form")
  //   }
  // }


  withDrawForm = this.fb.group({
    acno1: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    amnt1: ['', [Validators.required, Validators.pattern('[0-9]+')]]
  })

  withdraw() {
    var acno = this.withDrawForm.value.acno1
    var psw = this.withDrawForm.value.psw1
    var amnt = this.withDrawForm.value.amnt1

    if(this.withDrawForm.valid){
      this.ds.withdraw(acno, psw, amnt).subscribe((result: any) => {
        alert(result.message)
      },
        result => {
          alert(result.error.message)
        })
    }
    //   if (result) {
    //     alert(`your ac has been debited with amount ${amnt} and the avaliable balance is ${result}`)
    //   }
    //   else {
    //     alert('incorrect acno or password')
    //   }
    // }
    else{
      alert("invalid")
    }

  }

  logout() {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentAcno")
    this.router.navigateByUrl("")
  }

  deleteAcc() {
    this.acno = JSON.parse(localStorage.getItem("currentAcno") || "")

  }
  cancelChild() {
    this.acno = ""
  }
  ondeleteACC(event:any){
    this.ds.deleteAcc(event).subscribe((result:any)=>{
      alert(result.message)
      this.router.navigateByUrl("")

    })
  }
}
