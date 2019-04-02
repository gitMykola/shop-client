import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../services';

@Component({
  selector: 'product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.less']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private products: ProductService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.productForm = this.formBuilder.group({
      'title': [null, [Validators.required, Validators.minLength(3),
        Validators.maxLength(256)]],
      'category': [null, [Validators.required, Validators.minLength(3),
        Validators.maxLength(256)]],
      'description': [null, [Validators.required, Validators.minLength(3),
        Validators.maxLength(256)]],
      'price': [null, [Validators.required, Validators.min(0),
        Validators.max(1e9)]],
      'image': [null, Validators.required]
    });
  }

  onSubmit() {
    this.products.createUpdateProduct(this.productForm.value);
  }
  onFileSelected(event: Event) {
    this.productForm.patchValue({
      image: event.target['files'][0]
    });
  }
}
