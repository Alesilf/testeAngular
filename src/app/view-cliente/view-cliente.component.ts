import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'app-view-cliente',
  templateUrl: './view-cliente.component.html',
  styleUrls: ['./view-cliente.component.scss'],
})
export class ViewClienteComponent implements OnInit {
  ClienteDetail: ClienteForm = new ClienteForm();

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
            this.ClienteDetail.id = resultData.id;
            this.ClienteDetail.FirstName = resultData.FirstName;
            this.ClienteDetail.LastName = resultData.LastName;
            this.ClienteDetail.Cpf = resultData.Cpf;
            this.ClienteDetail.DataNascimento = resultData.DataNascimento;
            this.ClienteDetail.RendaMensal = resultData.RendaMensal;
            this.ClienteDetail.Email = resultData.Email;
            this.ClienteDetail.DataCadastro = resultData.DataCadastro;
          }
        }
      },
      (error: any) => {}
    );
  }
}

export class ClienteForm {
  id: number = 0;
  FirstName: string = '';
  LastName: string = '';
  Cpf: string = '';
  DataNascimento: string = '';
  RendaMensal: number = 0;
  Email: string = '';
  DataCadastro: string = '';
}
