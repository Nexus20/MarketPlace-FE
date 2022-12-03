import {Component, Input} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {IProductPhotoResult} from "../../products/models/IProductPhotoResult";

@Component({
    selector: 'app-carousel-holder',
    templateUrl: './carousel-holder.component.html',
    styleUrls: ['./carousel-holder.component.scss']
})
export class CarouselHolderComponent {

    @Input() set carouselParameters(value: IProductPhotoResult[]) {
        this.dynamicSlides = [];

        for (let i = 0; i < value.length; i++) {
            this.dynamicSlides.push({
                id: i,
                src: value[i].path,
                alt: 'alt',
                title: 'title'
            })
        }
    }

    public dynamicSlides = [
        {
            id: 1,
            src: 'https://via.placeholder.com/600/92c952',
            alt: 'Side 1',
            title: 'Side 1'
        },
    ]

    customOptions: OwlOptions = {
        autoHeight: true,
        autoWidth: true,
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: true,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            740: {
                items: 3
            },
            940: {
                items: 4
            }
        },
        nav: true
    }
}
