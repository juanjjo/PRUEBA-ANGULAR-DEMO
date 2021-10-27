import { Component, OnInit, ViewChild, ViewEncapsulation  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CorporativosDetalle, TwContactosCorporativo } from '../models/corporativosDetalle';
import { CorporativosService } from '../_services/corporativos.service';
import { ColumnMode, DatatableComponent,SelectionType } from '@swimlane/ngx-datatable';
import { Contacto } from '../models/contacto';
import { ContactoService } from '../_services/contacto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Corporativo } from '../models/corporativo';
@Component({
  selector: 'app-corporativos-detalle',
  templateUrl: './corporativos-detalle.component.html',
  styleUrls: ['./corporativos-detalle.component.scss']
})
export class CorporativosDetalleComponent implements OnInit {


  id :number;
  prueba:string="mundo"
  @ViewChild(DatatableComponent) table: DatatableComponent;
  public rows:[TwContactosCorporativo];
  public limitRef = 10;
  private tempData = [];
  public ColumnMode = ColumnMode;
  public corporativosDetalle:CorporativosDetalle;
  public formDetalle: FormGroup;
  public formConctato: FormGroup;
  public corporativo: Corporativo;
  public itemTabla:TwContactosCorporativo;
  public contacto:Contacto;
  public show:boolean=false;
  public showBtnCorporativo:boolean=false;
  public currentDate:Date  ;
  public formDeshabilitado:boolean=true;
  constructor(private corporativoService: CorporativosService,
    private route :ActivatedRoute,   private fb: FormBuilder, private serviceContacto: ContactoService
    ,private spinner: NgxSpinnerService) {
      this.corporativosDetalle =null;
      this.contacto = new Contacto();
      this.corporativo = new Corporativo();///
      this.currentDate = new Date("2015/03/25");
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('idDetalle');
    this.formDetalle = this.fb.group({
      nombreCorto:  ['', [Validators.required]],
      fecha:  [this.currentDate, [Validators.required]],
      nombreCompleto:   ['', [Validators.required]],
      urlSis:   ['', [Validators.required]],
      status:   ['', [Validators.required]],
    })
    this.formConctato = this.fb.group({
      nombre:  ['', [Validators.required]],
      puesto:  ['', [Validators.required]],
      comentario:  ['', [Validators.required]],
      telefojoFijo: ['', [Validators.required]],
      celular:  ['', [Validators.required]],
      email:  ['', [Validators.required]],
    })
    this.getOneCorporativo();

  }

  backCorporativos(){
    let urlback= "http://localhost:4200/#/corporativos";
    window.location.href=urlback;
  }
  editar(){
    this.showBtnCorporativo=true;
    this.formDeshabilitado=false;
  }

  getOneCorporativo(){
    this.spinner.show()
    try {
      this.corporativoService.getByIdCorporativo(this.id).subscribe(
        (result) => {
          this.corporativosDetalle = result['data']['corporativo'];
          this.rows = result['data']['corporativo']['tw_contactos_corporativo'];
          this.loadFormDetalle();
          this.spinner.hide()
          this.loadCorporativo();
          console.log(this.corporativosDetalle);
        }
       );
    } catch (error) {
      this.spinner.hide()
    }
  }
  loadCorporativo():any{
   this.corporativo.S_NombreCompleto=this.corporativosDetalle.S_NombreCompleto;
   this.corporativo.S_NombreCorto=this.corporativosDetalle.S_NombreCorto;
   this.corporativo.S_LogoURL=this.corporativosDetalle.S_LogoURL;
   this.corporativo.S_Activo=this.corporativosDetalle.S_Activo;
   this.corporativo.D_FechaIncorporacion=this.corporativosDetalle.D_FechaIncorporacion;
   this.corporativo.FK_Asignado_id=this.corporativosDetalle.FK_Asignado_id;
   this.corporativo.id=this.corporativosDetalle.id;
  }

  loadFormDetalle():any{
      this.currentDate=new Date(this.corporativosDetalle.D_FechaIncorporacion);
      this.formDetalle.patchValue({
      nombreCorto:this.corporativosDetalle.S_NombreCorto,
      fecha: this.formatFecha(this.currentDate),
      nombreCompleto:this.corporativosDetalle.S_NombreCompleto,
      urlSis:this.corporativosDetalle.S_LogoURL,
      status:this.corporativosDetalle.S_Activo
    });

  }

  public  formatFecha(fecha:Date) {
   let dia = fecha.getDate();
   let  mes:number = fecha.getMonth()+1;
   let anio = fecha.getFullYear();
   if(mes>0 && mes<10){
     let mesString = ("0"+mes.toString());
    return anio.toString()+"-"+mesString.toString()+"-"+dia.toString();
    }else{
      let mesString = (mes.toString());
      return anio.toString()+"-"+mesString.toString()+"-"+dia.toString();
    }

  }


  updateCorporativo(){
    let ll:string=new Date(this.formDetalle.value.fecha).toISOString().slice(0, -1);
    let ft:string=ll.slice(0,4)+"-"+ll.slice(5,7)+"-"+ll.slice(8,10);
    this.corporativo.S_NombreCorto=this.formDetalle.value.nombreCorto;
    this.corporativo.S_NombreCompleto=this.formDetalle.value.nombreCompleto;
    this.corporativo.D_FechaIncorporacion=ft;
    this.corporativo.S_LogoURL=this.formDetalle.value.urlSis;
    this.corporativo.S_Activo=this.formDetalle.value.status;
    this.corporativo.id=this.corporativosDetalle.id;
    this.corporativo.FK_Asignado_id=this.corporativosDetalle.FK_Asignado_id;

     this.corporativoService.updateCorporativo(this.id,this.corporativo).subscribe(
      (result)=>{

      },
      (error)=>{
        alert("a ocurrido un error");
      }
    )
    this.formDeshabilitado=true;
    this.showBtnCorporativo=false;
  }

  //contactos---------------------------------------------
  /**
   * carga el formulario y el estado de la vista una ves seleccionado la edicion
   * @param item
   */
  loadFormulario(item:any){
    this.itemTabla = item;
    this.formConctato.patchValue({
      nombre:item.S_Nombre,
      puesto:item.S_Puesto,
      comentario:item.S_Comentarios,
      telefojoFijo:item.N_TelefonoFijo,
      celular:item.N_TelefonoMovil,
      email:item.S_Email
    });
    this.show=true;
  }

/**
 * crea un nuevo contacto
 */

 getContactosCorporativo(){
  this.spinner.show()
  try {
    this.corporativoService.getByIdCorporativo(this.id).subscribe(
      (result) => {
        this.rows = result['data']['corporativo']['tw_contactos_corporativo'];
        this.spinner.hide()
      }
     );
  } catch (error) {
    this.spinner.hide()
  }
}
  createContacto(){
    this.loadContacto();
    this.serviceContacto.saveContacto(this.contacto).subscribe(
      (result)=>{
        this.getContactosCorporativo();
      },
      (error)=>{
        alert("a ocurrido un error");
      }
    )
    this.contacto = new Contacto();
  }
/**
 * elimina un contacto
 * @param item parametro recibe desde la tabla
 */
  deleteOneContacto(item:any){
    this.itemTabla=item;
    let id:number = this.itemTabla.id;
    this.serviceContacto.deleteContacto(id).subscribe(
      (result)=>{
        this.getContactosCorporativo();
      },
      (error)=>{
        alert("a ocurrido un error");
      }
    )

  }


  //buttons formulario
  /**
   * cancela la actualizacion y vuelve al estado de cargar un contacto
   */
  cancel(){
    this.formConctato.patchValue({
      nombre:"",
      puesto:"",
      comentario:"",
      telefojoFijo:"",
      celular:"",
      email:""
    });
    this.show=false;
  }
/**
 * actualiza un contacto
 */
  updateContacto(){
    this.loadContacto();
    this.serviceContacto.updateContacto(this.itemTabla.id,this.contacto).subscribe(
      (result)=>{
        this.getContactosCorporativo();
      },
      (error)=>{
        alert("a ocurrido un error");
      }
    )

    this.contacto = new Contacto();
  }

/**
 * carga los datos del formulario a  contacto
 */
  loadContacto(){
    this.contacto.S_Nombre = this.formConctato.value.nombre;
    this.contacto.N_TelefonoFijo=this.formConctato.value.telefojoFijo;
    this.contacto.N_TelefonoMovil=this.formConctato.value.celular;
    this.contacto.S_Comentarios=this.formConctato.value.comentario;
    this.contacto.S_Email = this.formConctato.value.email;
    this.contacto.S_Puesto = this.formConctato.value.puesto;
    this.contacto.tw_corporativo_id = this.corporativosDetalle.id;
  }
  /**
   * tabla
   */
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
    // this.rows = temp;
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
}
