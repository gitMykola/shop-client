import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  EventEmitter
} from '@angular/core';
import { ProductService, UserService } from '../../services';
import { Observable, fromEvent } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'catalog',
  templateUrl: 'catalog.component.html',
  styleUrls: ['catalog.component.less']
})
export class CatalogComponent implements AfterViewInit {
  public editComponent = new EventEmitter<boolean>();
  @ViewChild('titleSearch') titleSearch: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private titleChange: Observable<string>;
  constructor(
    public products: ProductService,
    public user: UserService
  ) { }
  ngAfterViewInit() {
    this.titleChange = fromEvent(this.titleSearch.nativeElement, 'change')
      .pipe(
      map((e: Event) => e.target['value'])
    );
    this.titleChange.subscribe(str => {
      this.products.searchCriteria = (str.length > 0) ? {
          title: str
        } : {};
      setTimeout(() => {
        this.products.getCountSum();
        this.products.getProducts();
      }, 300);
    });
    this.paginator.page.pipe(
      map(() => {
        this.setData();
      })
    ).subscribe()
  }
  delete(id: string) {
    this.products.deleteProduct(id);
  }
  edit(id: string) {
    this.products.setCurrentProduct(id);
    this.products.editProduct.emit(true);
  }
  setData() {
    this.products.page = this.paginator.pageIndex + 1;
    this.products.limit = this.paginator.pageSize;
    this.products.getProducts();
  }
}
