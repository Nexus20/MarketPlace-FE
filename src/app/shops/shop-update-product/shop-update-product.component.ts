import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IProductResult} from "../../products/models/IProductResult";
import {AddProductPhotos, GetShopProducts, UpdateProduct} from "../../products/state/product.action";
import {ProductsState} from "../../products/state/products.state";
import {map, Observable} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {ICategoryResult} from "../../categories/models/ICategoryResult";
import {CategoriesState} from "../../categories/categories.state";
import {GetCategories} from "../../categories/category.action";

@Component({
    selector: 'app-shop-update-product',
    templateUrl: './shop-update-product.component.html',
    styleUrls: ['./shop-update-product.component.scss']
})
export class ShopUpdateProductComponent implements OnInit {

    private productId!: string;
    productInfo!: IProductResult;
    editProductForm!: FormGroup;
    selectedFiles?: FileList;

    categories!: ICategoryResult[];
    @Select(CategoriesState.selectStateData) categoriesSelector!: Observable<ICategoryResult[]>;

    constructor(private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private store: Store,
                private router: Router) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.productId = params['id'];

            this.store.dispatch(new GetShopProducts()).subscribe(() => {
                this.store.select(ProductsState.selectProductById)
                    .pipe(map(filter => filter(this.productId)))
                    .subscribe(data => {

                        // TODO: Ask why does it called twice
                        // For the first time it is called it has undefined value
                        console.log(data)
                        this.productInfo = data;
                        this.createForm();
                    });
            });
        });
    }

    private createForm(): void {

        this.store.dispatch(new GetCategories());
        this.categoriesSelector.subscribe((returnData) => {
            this.categories = returnData;
        })

        this.editProductForm = this.formBuilder.group({
            name: new FormControl(this.productInfo.name, Validators.required),
            description: new FormControl(this.productInfo.description),
            price: new FormControl(this.productInfo.price, [Validators.required, Validators.min(0)]),
            discount: new FormControl(this.productInfo.discount, [Validators.max(100)]),
            count: new FormControl(this.productInfo.count, [Validators.min(0)]),
            categoriesIds: new FormControl(this.productInfo.categories?.map(x => x.id)),
            // name: new FormControl("", Validators.required),
            // description: new FormControl(),
            // price: new FormControl(0, [Validators.required, Validators.min(0)]),
            // discount: new FormControl(0, [Validators.max(100)]),
            // count: new FormControl(0, [Validators.min(0)]),
            // categoriesIds: new FormControl([]),
        });
    }

    submitForm() {
        console.log(this.editProductForm.value);
        this.store.dispatch(new UpdateProduct(this.productId, this.editProductForm.value)).subscribe(() => {
            console.log("Product added");
            this.router.navigate(['/shops/products']);
        });
    }

    selectFiles(event: any): void {
        this.selectedFiles = event.target.files;
        console.log(this.selectedFiles);
    }

    uploadFiles(): void {
        const formData = new FormData();
        for (let i = 0; i < this.selectedFiles!.length; i++)
            formData.append(`files[${i}]`, this.selectedFiles![i], this.selectedFiles![i].name);
        console.log(formData);

        this.store.dispatch(new AddProductPhotos(this.productId, formData))
            .subscribe(() => {
                console.log("Files added");
            });
    }
}
