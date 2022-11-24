import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {UserService} from "../user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

    registerForm!: FormGroup;

    constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit(): void {
        this.createForm();
    }

    private createForm() : void {
        this.registerForm = this.formBuilder.group({
            firstname: new FormControl("", Validators.required),
            lastname: new FormControl("", Validators.required),
            phone: new FormControl("", Validators.required),
            email: new FormControl("", [Validators.required, Validators.email]),
            password: new FormControl("", [Validators.required]),
            confirmPassword: new FormControl("", [Validators.required]),
        });
    }

    submitForm() {
        if(!this.registerForm.valid)
            return;

        console.log(this.registerForm.value);

        this.userService.register(this.registerForm.value).subscribe({
            next: data => {
                this.router.navigate(['/users/login']);
            },
            error: (err: HttpErrorResponse) => {
                console.log(err);
            }
        });
    }
}
