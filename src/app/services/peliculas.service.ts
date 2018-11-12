import { Injectable } from '@angular/core';

import { Jsonp } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apikey: string = "208e86a842adb3d0297f99095bb0d427";
  private urlMovieDb: string = "https://api.themoviedb.org/3";
  peliculas: any[] = [];

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

  private getParseDate( fecha: Date) {
    return `${ fecha.getFullYear()}-${ fecha.getMonth()+1 }-${ fecha.getDate() }`;
  }

  getPopulares() {
    let directory = "/discover/movie";
    let sort_by = "?sort_by=popularity.desc";
    let params = sort_by;

    return this.jsonpGet( directory, params );
  }

  getPopularesNinos() {
    let directory = "/discover/movie";

    let certification_country = "?certification_country=US"
    let certification_lte = "&certification.lte=G"
    let sort_by = "&sort_by=popularity.desc";
    let params = certification_country + certification_lte + sort_by;

    return this.jsonpGet( directory, params );
  }

  buscarPelicula( texto: string) {
    let directory = "/search/movie";
    let query = "?query=" + texto;
    let sort_by = "&sort_by=popularity.desc"
    let  params = query + sort_by;

    return this.jsonpGet( directory, params );

  }

  private jsonpGet( directory: string, params: string ) {
    let urlGetPopulares = `${ this.urlMovieDb }${ directory }${ params }`;
    return this.jsonp.get( urlGetPopulares + this.concatDefaultParams() )
                     .pipe(map( res => {
                       this.peliculas = res.json().results;
                       return res.json().results;
                     }));
  }

  private concatDefaultParams() {
    let api_key = `&api_key=${ this.apikey }`;
    let language = "&language=es";
    let callback = "&callback=JSONP_CALLBACK";
    return api_key + language + callback;
  }

}
