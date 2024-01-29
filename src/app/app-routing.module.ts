import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ViewClienteComponent } from './view-cliente/view-cliente.component';
import { AddClienteComponent } from './add-cliente/add-cliente.component';
import { EditClienteComponent } from './edit-cliente/edit-cliente.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full'},
  { path: 'Home', component: HomeComponent },
  { path: 'ViewCliente/:ClienteId', component: ViewClienteComponent},
  { path: 'AddCliente', component: AddClienteComponent },
  { path: 'EditCliente/:ClienteId', component: EditClienteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
