import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AdminModelRoutingModule } from './admin-model-routing.module';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {FormsModule} from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminModelRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    BrowserModule
  ]
})
export class AdminModelModule { }
