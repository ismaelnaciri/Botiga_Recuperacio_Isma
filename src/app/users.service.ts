import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnInit {
  public autenticat: boolean | undefined;
  public posAutenticat = -1;
  public emailAutenticat: any;
  public arrClients: any;
  public usuari: any;
  public walletName: any;


  constructor(private http:HttpClient) {
    this.http.get<any>('http://localhost:3080/api/firebase').subscribe((document) =>{
      this.arrClients = document;
    });
  }

  ngOnInit(): void {

  }
}

