import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { IProduct } from '../models/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/*
 * @name StorageService
 * @summary injectable service to keep products and interact to backend
 */
@Injectable()
export class StorageService {
  private apiUrl: string = environment.apiUrl;
  public products: IProduct[] = [];
  constructor(
    private http: HttpClient
  ) { }  
}
