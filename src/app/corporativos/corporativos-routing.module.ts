import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporativosDetalleComponent } from './corporativos-detalle/corporativos-detalle.component';
import { CorporativosComponent } from './corporativos.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CorporativosComponent,
        data: {
          title: 'Corporativos'
        }
      },
      {
        path: 'detalle/:idDetalle',
        component: CorporativosDetalleComponent,
        data: {
          title: 'Corporativos'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CorporativosRoutingModule { }
