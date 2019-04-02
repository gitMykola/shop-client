import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment'
import { IProduct, fromServer } from '../models/product';
import { Observable } from 'rxjs';
import { map, count } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

/*
 * @name ProductService
 * @summary injectable service to keep products and interact to backend
 */
@Injectable()
export class ProductService {
  private apiUrl: string = environment.apiUrl;
  public products: IProduct[] = [];
  public sum: number = 0;
  public average: number = 0;
  public totalCount: number = 0;
  public count: number = 0;
  public limit: number = 3;
  public page: number = 1;
  public pageCount: number;
  public searchCriteria: any = {};
  public currentProduct: IProduct;
  public editProduct = new EventEmitter<boolean>();
  constructor(
    private http: HttpClient
  ) {
    this.getCountSum();
    this.getProducts();
  }
  getCountSum() {
    this.getCount(this.searchCriteria).subscribe((count : any) => {
      this.totalCount = count['count'];
      this.sum = count['sum'];
      this.average = Math.round(this.sum * 100 / this.totalCount) / 100;
    })
  }
  getProducts() {
    this.getItems(this.page, this.limit, this.searchCriteria).subscribe(docs => {
      this.products = docs;
    });
  }
  deleteProduct(id: string) {
    this.deleteItem(id).subscribe(result => {
      this.getCountSum();
      this.getProducts();
    })
  }
  createUpdateProduct(productData: any) {
    this.createUpdateItem(productData).subscribe(result => {
      this.getCountSum();
      this.getProducts();
    })
  }
  setCurrentProduct(id: string) {
    this.currentProduct = this.products.find(p => p.id == id);
  }
  private createUpdateItem = (itemData: any): Observable<any> => {
    const data = new FormData();
    data.append('title', itemData.title);
    data.append('category', itemData.category);
    data.append('description', itemData.description);
    data.append('price', itemData.price);
    data.append('image', itemData.image);
    let url = this.apiUrl + 'goods/create';
    if (itemData.id) {
      data.append('id', itemData.id);
      url = this.apiUrl + 'goods/update';
    }
    return this.http.post(url, data,
      {
        headers: new HttpHeaders({ "Accept": "application/json" })
      }
    ).pipe(
      map((result: any) => result)
    );
}
  private getItems = (
    page: number,
    limit: number,
    data: any
  ): Observable<IProduct[]> => {
    let paramsString = 'page=' + page + '&count=' + limit;
    Object.keys(data).forEach(field => {
      paramsString += '&' + field + '=' + data[field];
    });
    const params = new HttpParams({ fromString: paramsString });  
    return this.http.get(this.apiUrl + 'goods', {
      params: params
    }).pipe(
      map((records: IProduct[]) => records.map(fromServer))
    );
  }
  private deleteItem = (id: string): Observable<boolean> => {
    const params = new HttpParams().set('id', id);
    return this.http.get(this.apiUrl + 'goods/delete', {
      params: params
    }).pipe(
      map(resp => true)
    );
  }
  private getCount = (
    data: any
  ): Observable<any> => {
    let paramsString = '';
    Object.keys(data).forEach(field => {
      paramsString += '&' + field + '=' + data[field];
    });
    const params = new HttpParams({ fromString: paramsString });
    return this.http.get(this.apiUrl + 'goods/count', {
      params: params
    }).pipe();
  }
}
