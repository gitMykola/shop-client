import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing/app-roiting.module';
import { AppComponent } from './app.component';
import { MatModule } from './shared/mat.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductService, UserService } from './services';
import {  
  HeaderComponent,
  CatalogComponent,
  ProductComponent,
  FooterComponent,
  EditComponent
} from './components';
import { PreloadImgDirective } from './directives/imgPreload.directive';
import {SafeUrlsPipe} from './lib/saveUrlPipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CatalogComponent,
    ProductComponent,
    FooterComponent,
    PreloadImgDirective,
    EditComponent,
      SafeUrlsPipe
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    MatModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
  ],
  providers: [
    ProductService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
