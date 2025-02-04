import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../service/poke-api.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-poke-list',
  standalone: false,
  
  templateUrl: './poke-list.component.html',
  styleUrl: './poke-list.component.scss'
})
export class PokeListComponent implements OnInit{

  public getAllPokemons : any;
  private setAllPokemons : any;
  public selectedTypes : string[] = [];

  public apiError : boolean = false;

  constructor(private pokeApiService : PokeApiService){

  }

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe(
      res => {
        this.setAllPokemons = res.results;
        this.getAllPokemons = [...this.setAllPokemons];
      },error => {
        this.apiError = true;
      }
    )
  }

  public getSearch(value: string) {
    const filter = this.setAllPokemons.filter(
      (res: any ) => {
        return !res.name.indexOf(value.toLowerCase());
      }
    );

    this.getAllPokemons = filter;
  }

  public updateTypeFilters(types: string[]): void {
    this.selectedTypes = types;
    this.applyFilters();
  }

  private applyFilters() {
    if (this.selectedTypes.length === 0) {
      this.getAllPokemons = this.setAllPokemons;
      return;
    }

    this.getAllPokemons = this.setAllPokemons.filter((resPokemon: any) => {
      const pokemonTypes = resPokemon.status.types.map((resType: any) => resType.type.name);
      console.log(pokemonTypes);
      
      return this.selectedTypes.every(selectedType => pokemonTypes.includes(selectedType));
    });
  }

  
}
