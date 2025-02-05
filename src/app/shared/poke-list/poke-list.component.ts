import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../service/poke-api.service';
import { Pokemon, PokemonList, PokemonStatus } from '../../interfaces/Pokemon.interface';

@Component({
  selector: 'app-poke-list',
  standalone: false,
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  public getAllPokemons: Pokemon[] = [];  
  private setAllPokemons: Pokemon[] = []; 
  public selectedTypes: string[] = [];

  public apiError: boolean = false;

  constructor(private pokeApiService: PokeApiService) { }

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe(
      (res: PokemonList) => {
        this.setAllPokemons = res.results;
        this.getAllPokemons = [...this.setAllPokemons];
      },
      error => {
        this.apiError = true;
      }
    );
  }

  public getSearch(value: string): void {
    const filter = this.setAllPokemons.filter((res: Pokemon) => {
      return res.name.toLowerCase().includes(value.toLowerCase());
    });

    this.getAllPokemons = filter;
  }

  public updateTypeFilters(types: string[]): void {
    this.selectedTypes = types;
    this.applyFilters();
  }

  private applyFilters(): void {
    if (this.selectedTypes.length === 0) {
      this.getAllPokemons = this.setAllPokemons;
      return;
    }

    this.getAllPokemons = this.setAllPokemons.filter((resPokemon: Pokemon) => {
      const pokemonTypes = resPokemon.status?.types?.map((resType: { type: { name: string } }) => resType.type.name) || [];
      
      return this.selectedTypes.every(selectedType => pokemonTypes.includes(selectedType));
    });
  }
}
