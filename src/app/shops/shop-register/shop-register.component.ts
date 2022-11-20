import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {AddCategory} from "../../categories/category.action";
import {AddShop} from "../shop.action";

@Component({
  selector: 'app-shop-register',
  templateUrl: './shop-register.component.html',
  styleUrls: ['./shop-register.component.scss']
})
export class ShopRegisterComponent implements OnInit {
    registerForm!: FormGroup;

    constructor(private store: Store, private formBuilder: FormBuilder ) {}

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
        this.store.dispatch(new AddShop(this.registerForm.value));
        this.registerForm.reset();
    }
}