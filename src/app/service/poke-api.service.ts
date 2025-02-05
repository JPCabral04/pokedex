import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Pokemon, PokemonList, PokemonStatus, PokemonType } from '../interfaces/Pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url : string = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=300";

  private urlTypes : string = "https://pokeapi.co/api/v2/type/";

  constructor(private http : HttpClient) { }

  get apiListAllPokemons():Observable<PokemonList>{
    return this.http.get<PokemonList>(this.url).pipe(
      tap( res => {
        res.results.map( (resPokemons: Pokemon) => {

          this.apiGetPokemon(resPokemons.url).subscribe(
            res => resPokemons.status  = res as PokemonStatus
          );
        })
      })
    )
  }

  get apiGetTypes(): Observable<string[]> {
    return this.http.get<PokemonType>(this.urlTypes).pipe(
      map(res => res.results.map((type) => type.name))
    );
  }

  public apiGetPokemon(url : string) : Observable<Pokemon> {
    return this.http.get<Pokemon>(url).pipe(
      map(
        res => res
      )
    )
  }


}
