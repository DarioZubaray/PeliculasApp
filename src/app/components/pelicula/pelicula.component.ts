import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: []
})
export class PeliculaComponent implements OnInit {

  pelicula: any;

  constructor( private _ps: PeliculasService, private _ar: ActivatedRoute) {
    this._ar.params.subscribe( params => {
      console.log('params[id]:' + params['id']);
      console.log('params[pag]: ' + params['pag']);

      this._ps.getPelicula(params['id']).subscribe( data => this.pelicula = data);
    });
  }

  ngOnInit() {
  }

}
