import { Component, Input, NgModule, OnInit, Type } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ng-modal-confirm',

  template: `
    <div class="modal-header">
      <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
      <button
        type="button"
        class="btn close"
        aria-label="Close button"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">x</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Deletar? Você tem certeza ?</p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        CANCEL
      </button>
      <button
        type="button"
        ngbAutofocus
        class="btn btn-success"
        (click)="modal.close('ok click')"
      >
        OK
      </button>
    </div>
  `,
})
export class NgModalConfirm {
  constructor(
    public modal: NgbActiveModal,
    private httpProvider: HttpProviderService,
    private toastr: ToastrService
  ) {}
}

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  closeResult = '';
  clienteList: any = [];
  clienteListAll: any = [];
  page = 1;
  pageSize = 4;
  collectionSize = this.clienteList.length;
  //clientes: clienteList[];
  public ClienteId: number = 0;
  filter: any;
  constructor(
    private router: Router,
    private routerLink: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private httpProvider: HttpProviderService
  ) {}

  ngOnInit(): void {
    this.getAllCliente();
  }

  async getAllCliente() {
    this.httpProvider.getAllCliente().subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.clienteList = resultData;
            this.clienteListAll = this.clienteList;
          }
        }
      },
      (error: any) => {
        if (error) {
          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.clienteList = [];
              this.clienteListAll = this.clienteList;
            }
          }
        }
      }
    );
  }
  refreshClientes() {}

  AddCliente() {
    this.router.navigate(['AddCliente']);
  }

  ViewDetailsCliente(id: any) {
    this.router.navigate(['ViewCliente']);
  }

  DeleteClienteConfirmation(clienteId: any) {
    this.modalService
      .open(MODALS['deleteModal'], {
        ariaLabelledBy: 'modal-basic-title',
      })
      .result.then(
        (result) => {
          this.DeleteCliente(clienteId);
        },
        (reason) => {}
      );
  }

  DeleteCliente(clienteId: any) {
    this.httpProvider.deleteClienteById(clienteId).subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null && resultData.isSuccess) {
            this.toastr.success(resultData.message);
          }
        }
        this.getAllCliente();
      },
      (error: any) => {}
    );
  }

  applyFilter(filterValue: string) {
    this.clienteList = this.clienteListAll.filter(
      (item: { FirstName: string }) =>
        item.FirstName.toLowerCase().includes(filterValue.toLowerCase())
    );
  }
}

export class Cliente {
  id: string = '';
  FirstName: string = '';
  LastName: string = '';
  Cpf: string = '';
  DataNascimento: string = '';
  RendaMensal: number = 0;
  Email: string = '';
  DataCadastro: string = '';
}
