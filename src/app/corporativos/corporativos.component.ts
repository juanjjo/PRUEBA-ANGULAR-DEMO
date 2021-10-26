import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent,SelectionType } from '@swimlane/ngx-datatable';
import { CorporativosService } from './_services/corporativos.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-corporativos',
  templateUrl: './corporativos.component.html',
  styleUrls: ['./corporativos.component.scss']
})
export class CorporativosComponent implements OnInit {
  token: string;
  currentUser: string;
  l
  @ViewChild(DatatableComponent) table: DatatableComponent;
  // row data
  public rows:any;
  public limitRef = 10;
  public URL:string="devschoolcloud.com/sa/#/";
  // private
  private tempData = [];
  public ColumnMode = ColumnMode;


  constructor(private corporativoService : CorporativosService,private spinner: NgxSpinnerService) {
    decodeURI
   }
   async getList(): Promise<any>{

     try {
      await this.corporativoService.getListCoporativos().subscribe(
        (result) => {
          this.rows = result['data'];
          console.log(this.rows);
        }
       )
     } catch (error) {
      this.spinner.show()
     }

   }

  ngOnInit() {
    this.token = localStorage.getItem('tokenscloud');
    this.getList();
    console.log(this.rows);
  }

  /**
 * filterUpdate
 *
 * @param event
 */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.Username.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  /**
 * updateLimit
 *
 * @param limit
 */
  updateLimit(limit) {
    this.limitRef = limit.target.value;
  }


  /**
   * click redireccionar
   */
   direccionDetalle(){
    let location = window.location;
    location.href = 'http://localhost:4200/#/corporativos/detalle';
  }

}
