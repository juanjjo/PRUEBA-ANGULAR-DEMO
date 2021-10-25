import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Contacto } from '../models/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
apiContactos = environment.apiURL + '/contactos';
public auth_token = 'Bearer ' + localStorage.getItem('tokenscloud');
constructor(private http: HttpClient) { }


saveContacto(contacto: any):Observable<any>{
  const httpOptions = {
    headers : new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization': this.auth_token
    })
  }
  return this.http.post(this.apiContactos,contacto,httpOptions);
}

deleteContacto(id:number):Observable<any>{
  const httpOptions = {
    headers : new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization': this.auth_token
    })
  }
  return this.http.delete(this.apiContactos+'/'+id,httpOptions);
}

updateContacto(id:number, contacto:Contacto):Observable<any>{
  const httpOptions = {
    headers : new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization': this.auth_token
    })
  }
  return this.http.put(this.apiContactos+'/'+id,contacto,httpOptions);
}

}


