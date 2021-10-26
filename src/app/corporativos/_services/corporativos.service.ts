import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";
import { environment } from 'environments/environment';
import { CorporativosDetalle, TwContactosCorporativo } from '../models/corporativosDetalle';
import { Corporativo } from '../models/corporativo';



@Injectable({
    providedIn: 'root'
})
export class CorporativosService {

    apiCorporativos = environment.apiURL + '/corporativos';
    apiCorporativoDetalle = environment.apiURL + '/corporativos'
    options: any;
    public auth_token = 'Bearer ' + localStorage.getItem('tokenscloud');

    constructor(private http: HttpClient) {

    }


    getListCoporativos(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.auth_token
            })
        }
        return this.http.get(this.apiCorporativos, httpOptions)
    }


    getByIdCorporativo(id:any): Observable<CorporativosDetalle> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.auth_token
            })
        }
        return this.http.get<CorporativosDetalle>(this.apiCorporativoDetalle+'/'+id, httpOptions)
    }


    updateCorporativo(id:number, corporativo: Corporativo):Observable<any>{
      const httpOptions = {
        headers : new HttpHeaders({
          "Content-Type": "application/json",
          'Authorization': this.auth_token
        })
      }
      return this.http.put(this.apiCorporativos+'/'+id,corporativo,httpOptions);

    }


}
