import {
  Component,
  NgModule,
  Type,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddClienteComponent } from './add-cliente/add-cliente.component';
import { EditClienteComponent } from './edit-cliente/edit-cliente.component';
import { ViewClienteComponent } from './view-cliente/view-cliente.component';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddClienteComponent,
    EditClienteComponent,
    ViewClienteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgbPaginationModule,
    NgbModule,
    BrowserAnimationsModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask({})],
  bootstrap: [AppComponent],
})
export class AppModule {}
