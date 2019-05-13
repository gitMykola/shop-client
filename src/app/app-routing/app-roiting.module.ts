import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  CatalogComponent,
  ProductComponent
} from '../components';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/catalog',
    pathMatch: 'full'
  },
  {
    path: 'catalog',
    component: CatalogComponent
  },
  {
    path: 'product',
    component: ProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
