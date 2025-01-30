import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    DetailsComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export default class PagesModule { }
