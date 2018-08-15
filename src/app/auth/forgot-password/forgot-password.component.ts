import { Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import {from} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{
  constructor() { }

  ngOnInit() {
  }

  onResetPassword(f:NgForm){
    from(firebase.auth().sendPasswordResetEmail(f.value.email)).pipe(take(1)).subscribe(
      (data)=>{
        console.log(data);
      }
      ,(error)=>{
        console.log(error);
    });
  }
}
