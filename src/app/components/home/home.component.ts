import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  cartelera: any;
  populares: any;
  popularesNinos: any;

  constructor( private _ps: PeliculasService ) {
    this._ps.getcartelera().subscribe( data => {
        this.cartelera = data;
        console.log( this.cartelera[0].backdrop_path);
      }
    );

    this._ps.getPopulares().subscribe( data => this.populares = data );
    this._ps.getPopularesNinos().subscribe( data => this.popularesNinos = data );

  }

  ngOnInit() {
  }

}
