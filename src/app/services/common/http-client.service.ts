import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { debug, log } from 'node:console';
import { cwd } from 'node:process';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient : HttpClient, @Inject('baseUrl') private baseUrl : string) {

  }

  private url(requestParameter : Partial<RequestParameters>): string{
      return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}`:""}`;
  }


  get<T>(requestParameter : Partial<RequestParameters>, id? : string){

    let url : string = "";
    if(requestParameter.fullendPoint){
      url = requestParameter.fullendPoint;
    }else{
      url = `${this.url(requestParameter)}${id ? `/${id}` : ""}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
    }

    return this.httpClient.get<T>(url, {
      headers : requestParameter.headers
    })
  }
  

  post<T>(requestParameter : Partial<RequestParameters>, body: Partial<T>){
   
    let url : string = "";
    if(requestParameter.fullendPoint){
      url = requestParameter.fullendPoint;
    }else{
      url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
    }
    
    return this.httpClient.post<T>(url, body, {
      headers : requestParameter.headers
    });
  }



  put<T>(requestParameter : Partial<RequestParameters>, body: Partial<T> ){
    let url : string = "";
    if(requestParameter.fullendPoint){
      url = requestParameter.fullendPoint;
    }else{
      url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
    }

    return this.httpClient.put<T>(url, body, {
      headers : requestParameter.headers
    });

  }


  delete<T>(requestParameter : Partial<RequestParameters>,  id : string){
    let url : string = "";
    if(requestParameter.fullendPoint){
      url = requestParameter.fullendPoint;
    }else{
      url = `${this.url(requestParameter)}/${id}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
    }

    return this.httpClient.delete<T>(url, {
      headers : requestParameter.headers
    })

  }





}


export class RequestParameters{
  controller? : string;
  action? : string;
  headers? : HttpHeaders;
  baseUrl? : string;
  fullendPoint? : string;
  queryString? : string;
}