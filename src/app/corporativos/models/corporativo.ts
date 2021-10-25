export class Corporativo {
  id: number;
  S_NombreCorto: string;
  S_NombreCompleto: string;
  S_LogoURL: string;
  S_Activo: number;
  FK_Asignado_id: number;
  D_FechaIncorporacion: string;
constructor(id?:number,S_NombreCorto?:string, S_NombreCompleto?:string,S_LogoURL?:string,
  S_Activo?:number,FK_Asignado_id?:number,D_FechaIncorporacion?){
    this.id=id;
    this.S_NombreCorto=S_NombreCorto;
    this.S_NombreCompleto=S_NombreCompleto;
    this.S_LogoURL=S_LogoURL;
    this.S_Activo=S_Activo;
    this.FK_Asignado_id=FK_Asignado_id;
    this.D_FechaIncorporacion=D_FechaIncorporacion;
}
}
