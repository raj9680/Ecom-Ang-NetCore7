import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { Observable } from 'rxjs';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl:string = "https://localhost:5001/api/";

  constructor(private http: HttpClient) 
  {     }

  getProducts(shopParams: ShopParams): Observable<Pagination<Product[]>> {
    let param = new HttpParams();

    if(shopParams.brandId > 0) param = param.append('brandId', shopParams.brandId);
    if(shopParams.typeId) param = param.append('typeId', shopParams.typeId);
    param = param.append('sort', shopParams.sort);
    param = param.append('pageIndex', shopParams.pageNumber);
    param = param.append('pageSize', shopParams.pageSize);
    if(shopParams.search) param = param.append('search', shopParams.search);

    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', {params: param});
  }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.baseUrl + 'products/brands');
  }

  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.baseUrl + 'products/types');
  }

}
