import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';
import { DatePipe } from '@angular/common';
import { dv, fake, mask, validate } from 'validation-br/dist/cpf';
import { isCPF } from 'validation-br';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.scss'],
})
export class AddClienteComponent implements OnInit {
  addClienteForm: ClienteForm = new ClienteForm();
  datePipe: DatePipe = new DatePipe('en-US');
  @ViewChild('clienteForm')
  clienteForm!: NgForm;
  isSubmitted: boolean = false;
  constructor(
    private router: Router,
    private httpProvider: HttpProviderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  getformattedDate(): any {
    var date = new Date();
    var transformDate = this.datePipe.transform(date, 'dd-MM-yyyy');
    return transformDate;
  }

  validarCampos(): boolean {
    if (!isCPF(this.addClienteForm.Cpf.replace('.', '').replace('-', ''))) {
      this.toastr.success('CPF ivalido');
      return false;
    }
    const today = new Date();
    const birthDate = new Date(this.addClienteForm.DataNascimento);
    let age: number = today.getFullYear() - birthDate.getFullYear();

    const m = today.getMonth() - birthDate.getMonth();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 18 || age > 60) {
      this.toastr.error('Cliente deve possuir mais de 18 anos e menos de 60');
      return false;
    }

    return true;

  }

  AddCliente(isValid: any) {
    this.isSubmitted = true;
    //if (isValid)
    if (this.validarCampos()) {
      this.addClienteForm.DataCadastro = this.getformattedDate();
      this.httpProvider.saveCliente(this.addClienteForm).subscribe(
        async (data) => {
          this.toastr.success('Cliente cadastrado com sucesso');
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        },
        async (error) => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        }
      );
    }
  }
}

export class ClienteForm {
  FirstName: string = '';
  LastName: string = '';
  Cpf: string = '';
  DataNascimento: string = '';
  RendaMensal: number = 0;
  Email: string = '';
  DataCadastro: string = '';
}
