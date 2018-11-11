import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  cartelera: any;

  constructor( private _ps: PeliculasService ) {
    this._ps.getcartelera().subscribe(
      data => {
        this.cartelera = data.results;
        console.log( this.cartelera[0].backdrop_path);
      }
    );
  }

  ngOnInit() {
  }

}
