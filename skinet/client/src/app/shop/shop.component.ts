import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  // brandIdSelected = 0;
  // typeIdSelected = 0;
  // sortSelected = 'name';
  shopParams = new ShopParams();
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }    
  ];
  totalCount = 0;

  constructor(private shopService: ShopService) 
  {   }
  
  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }


  getProducts() {
    // this.shopService.getProducts(this.brandIdSelected, this.typeIdSelected, this.sortSelected).subscribe({
    this.shopService.getProducts(this.shopParams).subscribe({
      next: result => {
        this.products = result.data;
        this.shopParams.pageNumber = result.pageIndex;
        this.shopParams.pageSize = result.pageSize;
        this.totalCount = result.count;
      },
      error: error => console.log(error),
      complete: () => {
        console.log("Request Completed");
      }
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: result => this.brands = [{id: 0, name: 'All'}, ...result],
      error: error => console.log(error),
      complete: () => {
        console.log("Completed");
      }
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: result => this.types = [{id: 0, name: 'All'}, ...result] ,
      error: error => console.log(error),
      complete: () => {
        console.log("Completed");
      }
    });
  }

  onBrandSelected(brandId: number) {
    // this.brandIdSelected = brandId;
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId:  number) {
    // this.typeIdSelected = typeId;
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(event: any) {
    // this.sortSelected = event.target.value;
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }

  // onPageChanged(event: any) {
  //   if(this.shopParams.pageNumber != event.page) {
  //     this.shopParams.pageNumber = event.page;
  //     this.getProducts();
  //   }
  // }

  onPageChanged(event: any) {
    if(this.shopParams.pageNumber != event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    if(this.searchTerm) {
      this.searchTerm.nativeElement.value = '';
      this.shopParams = new ShopParams();
      this.getProducts();
    }
  }

}
