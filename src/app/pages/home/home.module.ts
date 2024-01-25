import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { HomeRoutingModule } from './home-routing.module';
import { CoreModule } from '../../core.module';

import { FormsModule } from '@angular/forms';
import { ManageProductComponent } from '../../components/manage-product/manage-product.component';
import { ProductService } from '../../services/product.service';

@NgModule({
  declarations: [
    ProductListComponent,
    ManageProductComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
  ],
  providers:[ProductService]
})
export class HomeModule { }
