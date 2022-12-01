import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Select, Store} from "@ngxs/store";
import {Router} from "@angular/router";
import {AuthState} from "../../users/state/auth.state";
import {AddShopProduct} from "../../products/state/product.action";
import {CategoriesState} from "../../categories/categories.state";
import {Observable} from "rxjs";
import {ICategoryResult} from "../../categories/models/ICategoryResult";
import {GetCategories} from "../../categories/category.action";

@Component({
  selector: 'app-shop-create-product',
  templateUrl: './shop-create-product.component.html',
  styleUrls: ['./shop-create-product.component.scss']
})

export class ShopCreateProductComponent implements OnInit{

    addProductForm!: FormGroup;
    categories!: ICategoryResult[];
    @Select(CategoriesState.selectStateData) categoriesInfo!: Observable<ICategoryResult[]>;

    constructor(private store: Store, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit(): void {
        this.createForm();
    }

    private createForm() : void {

        this.store.dispatch(new GetCategories());
        this.categoriesInfo.subscribe((returnData) => {
            this.categories = returnData;
        })

        this.addProductForm = this.formBuilder.group({
            name: new FormControl("", Validators.required),
            description: new FormControl(),
            price: new FormControl(0, [Validators.required, Validators.min(0)]),
            discount: new FormControl(0, [Validators.max(100)]),
            count: new FormControl(0, [Validators.min(0)]),
            categoriesIds: new FormControl([]),
        });
    }

    submitForm() {
        console.log(this.addProductForm.value);
        this.store.dispatch(new AddShopProduct(this.addProductForm.value)).subscribe(() => {
            console.log("Product added");
            this.router.navigate(['/shops/products']);
        });
    }
}
