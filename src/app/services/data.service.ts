import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// create global header for header overlaping
const option = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) {
    // this.getDetails()
  }

  currentUser: any
  currentAcno: any
  userDetails: any

  // userDetails: any = {
  //   1000: { username: "anu" , acno: "1000", password: "qwe"    , balance: 0, transaction: [] },
  //   1001: { username: "amal", acno: "1001", password: "qwerty1", balance: 0, transaction: [] },
  //   1002: { username: "arun", acno: "1002", password: "qwerty1", balance: 0, transaction: [] },
  //   1003: { username: "mega", acno: "1003", password: "qwerty1", balance: 0, transaction: [] },
  // }

  // saveDetails() {
  //   if (this.userDetails) {
  //     localStorage.setItem("userDetails", JSON.stringify(this.userDetails))
  //   }
  //   if (this.currentUser) {
  //     localStorage.setItem("currentUser", JSON.stringify(this.currentUser))
  //   }
  //   if (this.currentAcno) {
  //     localStorage.setItem("currentAcno", JSON.stringify(this.currentAcno))
  //   }
  // }

  // getDetails() {
  //   if (localStorage.getItem('userDetails')) {
  //     this.userDetails = JSON.parse(localStorage.getItem("userDetails") || "")
  //   }
  //   if (localStorage.getItem("currentUser")) {
  //     this.currentUser = localStorage.getItem('currentUser')
  //   }
  //   if (localStorage.getItem("currentAcno")) {
  //     this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || "")
  //   }

  // }


  getToken() {
    // access token
    const token = JSON.parse(localStorage.getItem("token") || "")

    // generate header
    let headers = new HttpHeaders()

    // checek token accesed or not
    if (token) {

      // add token to headers
      option.headers = headers.append('access_token', token)
    }
    return option
  }


  register(acno: any, uname: any, psw: any) {

    const data = { acno, uname, psw }
    return this.http.post('http://localhost:3000/register', data)

  }

  login(acno: any, psw: any) {
    const data = { acno, psw }
    return this.http.post('http://localhost:3000/login', data)
  }

  deposit(acno: any, psw: any, amnt: any) {
    const data = { acno, psw, amnt }
    return this.http.post('http://localhost:3000/deposit', data, this.getToken())
  }
    // this.getDetails()

    // var userDetails = this.userDetails

    // if (acno in userDetails) {
    //   if (psw == userDetails[acno]["password"]) {
    //     userDetails[acno]["balance"] += amount
    //     console.log(userDetails);

    //     // add transaction
    //     userDetails[acno]["transaction"].push(
    //       {
    //         type: "credit",
    //         amount: amount
    //       }
    //     )
    //     this.saveDetails()
    //     // console.log(userDetails);
    //     return userDetails[acno]["balance"]
    //   }
    //   else {
    //     return false
    //   }
    // }
    // else {
    //   return false
    // }

  // }

  withdraw(acno: any, psw: any, amnt: any) {

    const data = { acno, psw, amnt }
    return this.http.post('http://localhost:3000/withdraw', data, this.getToken())

    // to convert string amnt to int
    // var amount = parseInt(amnt)
    // var userDetails = this.userDetails

    // if (acno in userDetails) {
    //   if (psw == userDetails[acno]["password"]) {
    //     if (amount <= userDetails[acno]["balance"]) {
    //       userDetails[acno]["balance"] -= amount
    //       console.log(userDetails);

    //       withdraw
    //       userDetails[acno]["transaction"].push({type: "Debit",amount: amount})
    //         this.saveDetails()
    //        console.log(userDetails);
    //       return userDetails[acno]["balance"]
    //     }

    //     else {
    //       alert('insufficient balance')
    //     }
    //   }
    //   else {
    //     return false
    //   }
    // }
    // else {
    //   return false
    // }

  }

  getTranscation(acno: any) {
    
    const data = { acno }
    return this.http.post('http://localhost:3000/transcation', data, this.getToken())

  }
  deleteAcc(acno:any){
    return this.http.delete('http://localhost:3000/delete/'+acno,this.getToken())
  }
}
