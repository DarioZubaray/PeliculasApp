import { Injectable } from '@angular/core';

import { Jsonp } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apikey: string = "208e86a842adb3d0297f99095bb0d427";
  private urlMovieDb: string = "https://api.themoviedb.org/3";

  constructor( private jsonp: Jsonp ) { }

  getcartelera() {
    let directory = "/discover/movie";
    let desde = this.getParseDate(new Date());
    let date = new Date();
    date.setDate( new Date().getDate() + 7);
    let hasta = this.getParseDate(date);

    let gte = "?primary_release_date.gte=" + desde;
    let lte = "&primary_release_date.lte=" + hasta;

    let params = gte + lte;

    return this.jsonpGet( directory, params );
  }

  getParseDate( fecha: Date) {
    return `${ fecha.getFullYear()}-${ fecha.getMonth()+1 }-${ fecha.getDate() }`;
  }

  getPopulares() {
    let directory = "/discover/movie";
    let sort_by = "?sort_by=popularity.desc";
    let params = sort_by;

    return this.jsonpGet( directory, params );
  }

  jsonpGet( directory: string, params: string ) {
    let urlGetPopulares = `${ this.urlMovieDb }${ directory }${ params }`;
    return this.jsonp.get( urlGetPopulares + this.concatDefaultParams() ).pipe(map( res => res.json() ));
  }

  concatDefaultParams() {
    let api_key = `&api_key=${ this.apikey }`;
    let language = "&language=es";
    let callback = "&callback=JSONP_CALLBACK";
    return api_key + language + callback;
  }

}
