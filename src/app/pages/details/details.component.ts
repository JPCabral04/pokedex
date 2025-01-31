import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from '../../service/poke-api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: false,

  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = "https://pokeapi.co/api/v2/pokemon";
  private urlName: string = "https://pokeapi.co/api/v2/pokemon-species";
  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService,
  ) { }

  ngOnInit(): void {
    this.pokemon;
  }

  get pokemon() {
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.pokeApiService.apiGetPokemons(`${this.urlPokemon}/${id}`);
    const name = this.pokeApiService.apiGetPokemons(`${this.urlName}/${id}`);

    return forkJoin([pokemon, name]).subscribe(
      res => {
        console.log(res);
      }
    )
  };
}
