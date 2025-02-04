import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url : string = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=200";

  private urlTypes : string = "https://pokeapi.co/api/v2/type/";

  constructor(private http : HttpClient) { }

  get apiListAllPokemons() : Observable<any> {
    return this.http.get<any>(this.url).pipe(
      tap(res => res),
      tap(res => {
        res.results.map( (resPokemons : any) => {
            this.apiGetPokemon(resPokemons.url).subscribe(
              res => {
                resPokemons.status = res
              }
            )
        })
      })
    )
  }

  get apiGetTypes(): Observable<string[]> {
    return this.http.get<any>(this.urlTypes).pipe(
      map(res => res.results.map((type: any) => type.name))
    );
  }
  

  public apiGetPokemon(url : string) : Observable<any> {
    return this.http.get<any>(url).pipe(
      map(
        res => res
      )
    )
  }


}
