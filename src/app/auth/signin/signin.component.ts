import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user.models";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup =  new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  errorMessage: string = "";
  user: User []= [];

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }
  onSubmit() {
    const email = this.signinForm.get('email')!.value;
    const password = this.signinForm.get('password')!.value;
    this.authService.login(email, password).then(
      () => {
        this.getAllUsers();
        this.router.navigate(['/products']);
      },
      () => {
        this.errorMessage = "The password is not correct !"

      }
    );
  }
  getAllUsers(){
    this.authService.getAllUsers().then(
      (users: User) => {
        console.log(users);
      }
    );
  }

}
