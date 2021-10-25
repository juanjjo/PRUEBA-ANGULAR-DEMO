export class Contacto {
  S_Nombre: string;
  S_Puesto: string;
  S_Comentarios: string;
  N_TelefonoFijo?: any;
  N_TelefonoMovil: number;
  S_Email: string;
  tw_corporativo_id: number;
  constructor(S_Nombre?:any, S_Puesto?:string,S_Comentarios?:string,N_TelefonoFijo?:any,
    N_TelefonoMovil?:number,S_Email?:string,tw_corporativo_id?:number){
      this.S_Nombre=S_Nombre;
      this.S_Puesto=S_Puesto;
      this.S_Comentarios=S_Comentarios;
      this.N_TelefonoFijo=N_TelefonoFijo;
      this.N_TelefonoMovil=N_TelefonoMovil;
      this.S_Email=S_Email;
      this.tw_corporativo_id=tw_corporativo_id;
  }
}
