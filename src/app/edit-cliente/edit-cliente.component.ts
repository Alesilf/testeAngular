import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';
import { DatePipe } from '@angular/common';
import { dv, fake, mask, validate } from 'validation-br/dist/cpf';
import { isCPF } from 'validation-br';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.scss'],
})
export class EditClienteComponent implements OnInit {
  editClienteForm: ClienteForm = new ClienteForm();

  @ViewChild('ClienteForm')
  ClienteForm!: NgForm;

  isSubmitted: boolean = false;
  ClienteId: any;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private httpProvider: HttpProviderService
  ) {}

  ngOnInit(): void {
    this.ClienteId = this.route.snapshot.params['ClienteId'];

    this.getClienteDetailById();
  }
  getClienteDetailById() {
    this.httpProvider.getClienteDetailById(this.ClienteId).subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.editClienteForm.id = resultData.id;
            this.editClienteForm.FirstName = resultData.FirstName;
            this.editClienteForm.LastName = resultData.LastName;
            this.editClienteForm.Cpf = resultData.Cpf;
            this.editClienteForm.DataNascimento = resultData.DataNascimento;
            this.editClienteForm.RendaMensal = resultData.RendaMensal;
            this.editClienteForm.Email = resultData.Email;
            this.editClienteForm.DataCadastro = resultData.DataCadastro;
          }
        }
      },
      (error: any) => {}
    );
  }

  validarCampos(): boolean {
    if (!isCPF(this.editClienteForm.Cpf)) {
      this.toastr.success('CPF ivalido');
      return false;
    }
    const today = new Date();
    const birthDate = new Date(this.editClienteForm.DataNascimento);
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

  EditCliente(isValid: any) {
    this.isSubmitted = true;

    //if (isValid)
    if (this.validarCampos()) {
      this.httpProvider.saveCliente(this.editClienteForm).subscribe(
        async (data) => {
          this.toastr.success('Cliente Alterado com Sucesso!');
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
  id: string = '';
  FirstName: string = '';
  LastName: string = '';
  Cpf: string = '';
  DataNascimento: string = '';
  RendaMensal: number = 0;
  Email: string = '';
  DataCadastro: string = '';
}
