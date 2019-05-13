import { Component } from "@angular/core";
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.less']
})
export class FooterComponent {
  constructor(
    public products: ProductService
  ) { }
}
