import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../models/user.models";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup =  new FormGroup({
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
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }
  onSubmit() {
    const email = this.signupForm.get('email')!.value;
    const password = this.signupForm.get('password')!.value;
    this.authService.createUser(email, password).then(
      () => {
        this.getAllUsers();
        this.router.navigate(['/products']);
      },
      () => {
        this.errorMessage = "this user is already in use by another account"

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
