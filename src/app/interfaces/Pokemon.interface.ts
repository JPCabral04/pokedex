export interface PokemonList {
   results: Pokemon[];
}

export interface Pokemon {
   name: string;
   url: string;
   status?: PokemonStatus;
}

export interface PokemonStatus {
   id: number;
   sprites: {
      other: {
         dream_world: {
            front_default: string;
         };
      };
   };
   types?: {
      type: {
         name: string;
      };
   }[];
}


export interface PokemonType {
   results: { name: string }[];
}