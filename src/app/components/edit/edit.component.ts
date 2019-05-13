import { Input, Component, OnInit, EventEmitter, Output, AfterViewInit, ElementRef, AfterViewChecked, ViewChild } from '@angular/core';
import { ProductService } from '../../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, fromEvent } from 'rxjs';
import { IProduct } from '../../models/product';

@Component({
  selector: 'edit-product',
  templateUrl: 'edit.component.html',
  styleUrls: ['edit.component.less']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  stateEditor: boolean;
  idHeader: string;
  constructor(
    public products: ProductService,
    private formBuilder: FormBuilder,
    private selfElement: ElementRef
  ) { }
  ngOnInit() {
    this.buildForm();    
    this.products.editProduct.subscribe(data => {
      this.editForm.setValue({
        id: this.products.currentProduct.id,
        title: this.products.currentProduct.title,
        category: this.products.currentProduct.category,
        description: this.products.currentProduct.description,
        price: this.products.currentProduct.price,
        image: null
      });
      this.idHeader = this.products.currentProduct.id;
      this.stateEditor = true;
    });
  }
  onSubmit() {
    console.dir(this.products.currentProduct);
    this.products.createUpdateProduct(this.editForm.value);
    this.closeEdit();
  }
  onFileSelected(event: Event) {
    this.editForm.patchValue({
      image: event.target['files'][0]
    });
  }
  closeEdit() {
    this.editForm.reset();
    this.stateEditor = false;
  }
  private buildForm() {
    this.editForm = this.formBuilder.group({
      'id': [null, [Validators.required, Validators.minLength(3),
      Validators.maxLength(256)]],
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
}
