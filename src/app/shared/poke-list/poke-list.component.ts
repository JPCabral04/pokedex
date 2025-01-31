import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../service/poke-api.service';

@Component({
  selector: 'app-poke-list',
  standalone: false,
  
  templateUrl: './poke-list.component.html',
  styleUrl: './poke-list.component.scss'
})
export class PokeListComponent implements OnInit{

  public getAllPokemons : any;
  private setAllPokemons : any;

  constructor(private pokeApiService : PokeApiService){

  }

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe(
      res => {
        this.setAllPokemons = res.results;
        this.getAllPokemons = this.setAllPokemons;
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
}
