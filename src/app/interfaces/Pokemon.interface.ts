export interface PokemonList {
   results: Pokemon[];
}

export interface Pokemon {
   name: string;
   url: string;
   status?: PokemonStatus;
}

export interface PokemonStatus {
   types?: {
      type: {
         name: string;
      };
   }[];
}

export interface PokemonType {
   results: { name: string }[];
}