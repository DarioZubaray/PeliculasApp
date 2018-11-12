import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: []
})
export class BuscarComponent implements OnInit {

  buscar: string = "";

  constructor( private _ps: PeliculasService, private _ar: ActivatedRoute ) {
    this._ar.params.subscribe( params => {
      console.log('params[texto]' + params['texto']);
      if( params['texto'] ) {
        this.buscar = params['texto'];
        this.buscarPelicula();
      }
    });
  }

  ngOnInit() {
  }

  buscarPelicula() {
    if( this.buscar.length === 0) {
      return;
    }

    this._ps.buscarPelicula( this.buscar ).subscribe( data => {});
  }

}
