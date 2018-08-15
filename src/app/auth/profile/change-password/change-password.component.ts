import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import {from} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onChangePassword(f:NgForm){
    if(f.value.newPassword===f.value.confirmPassword){
      from(firebase.auth().currentUser.updatePassword(f.value.newPassword)).pipe(take(1)).subscribe(
        (data)=>{
          console.log(data);
        }
        ,(error)=>{
          console.log(error);
      });
    }else{
      console.log("the 2 passwords don't match each others");
    }
    f.setValue({
      newPassword:'',
      confirmPassword:''
    });
  }
}
