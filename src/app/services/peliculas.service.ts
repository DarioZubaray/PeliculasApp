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

  getPopulares() {
    let url = `${ this.urlMovieDb }/discover/movie?sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get( url ).pipe(map( res => res.json() ));
  }

}
