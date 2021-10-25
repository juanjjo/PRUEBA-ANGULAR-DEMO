import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporativosComponent } from './corporativos.component';
import { CorporativosRoutingModule } from './corporativos-routing.module';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { CorporativosDetalleComponent } from './corporativos-detalle/corporativos-detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from 'app/shared/pipes/pipe.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({

  declarations: [
    CorporativosComponent,
    CorporativosDetalleComponent,

  ],
  imports: [
    CommonModule,
    CorporativosRoutingModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    PipeModule,
    NgxDatatableModule,
  ]
})
export class CorporativosModule { }
