import { Component, OnInit, createPlatform } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private bcService: BreadcrumbService) 
  { 
    bcService.set('@productDetails', ' ');
  }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id)  this.shopService.getProduct(+id).subscribe({
      next: result => { 
        this.product = result;
        this.bcService.set('@productDetails', result.name)
      },
      error: error => console.log(error)
    });
  }
}
