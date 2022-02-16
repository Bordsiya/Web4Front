import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hit } from './hit';
import { DotsInfo } from './dots-info';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class DotsService {

  private getDotsUrl = 'http://localhost:8080/dots/getDots';
  private addDotsUrl = 'http://localhost:8080/dots/addDots';
  private deleteDotsUrl = 'http://localhost:8080/dots/deleteDots';

  getDots(): Observable<Hit[]>{
    return this.http.get<Hit[]>(this.getDotsUrl, httpOptions);
  }

  addDots(info: DotsInfo): Observable<Hit> {
    return this.http.post<Hit>(this.addDotsUrl, info, httpOptions);
  }

  deleteDots(): Observable<string> {
    return this.http.delete<string>(this.deleteDotsUrl, httpOptions);
  }

  constructor(private http: HttpClient) { }
}
