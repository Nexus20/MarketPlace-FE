import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {AddShop} from "../state/shop.action";
import {Router} from "@angular/router";

@Component({
    selector: 'app-shop-register',
    templateUrl: './shop-register.component.html',
    styleUrls: ['./shop-register.component.scss']
})
export class ShopRegisterComponent implements OnInit {
    registerForm!: FormGroup;

    constructor(private store: Store, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            name: new FormControl("", Validators.required),
            email: new FormControl("", [Validators.required, Validators.email]),
            phone: new FormControl("", [Validators.required]),
            description: new FormControl(),
            address: new FormControl(),
            siteUrl: new FormControl(),
            password: new FormControl("", Validators.required),
        });
    }

    registerShop() {
        console.log(this.registerForm.value);
        this.store.dispatch(new AddShop(this.registerForm.value)).subscribe(() => {
            this.registerForm.reset();
            this.router.navigate(['/users/login'])
        });
    }
}
