export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '12.2.3 (519615d)';
  };
  public: {
    Tables: {
      ability: {
        Row: {
          change_log: Json[] | null;
          created_at: string;
          description: string | null;
          flavor_text: string;
          gen: number | null;
          id: number;
          name_en: string | null;
          name_ja: string | null;
          name_ko: string;
          poke_list: Json[] | null;
        };
        Insert: {
          change_log?: Json[] | null;
          created_at?: string;
          description?: string | null;
          flavor_text: string;
          gen?: number | null;
          id?: number;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko: string;
          poke_list?: Json[] | null;
        };
        Update: {
          change_log?: Json[] | null;
          created_at?: string;
          description?: string | null;
          flavor_text?: string;
          gen?: number | null;
          id?: number;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string;
          poke_list?: Json[] | null;
        };
        Relationships: [];
      };
      dex_entry: {
        Row: {
          dex_number: number;
          dex_region_id: number;
          id: number;
          poke_id: number;
        };
        Insert: {
          dex_number: number;
          dex_region_id: number;
          id?: number;
          poke_id: number;
        };
        Update: {
          dex_number?: number;
          dex_region_id?: number;
          id?: number;
          poke_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'dex_entry_dex_region_id_fkey';
            columns: ['dex_region_id'];
            isOneToOne: false;
            referencedRelation: 'dex_region';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'dex_entry_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: false;
            referencedRelation: 'national_pokedex_with_stat';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'dex_entry_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: false;
            referencedRelation: 'poke';
            referencedColumns: ['id'];
          },
        ];
      };
      dex_group: {
        Row: {
          description: string;
          game_group: string;
          game_group_ko: string;
          id: number;
        };
        Insert: {
          description: string;
          game_group: string;
          game_group_ko: string;
          id?: number;
        };
        Update: {
          description?: string;
          game_group?: string;
          game_group_ko?: string;
          id?: number;
        };
        Relationships: [];
      };
      dex_region: {
        Row: {
          dex_group_id: number;
          id: number;
          order_index: number;
          region: string;
          region_ko: string | null;
        };
        Insert: {
          dex_group_id: number;
          id?: number;
          order_index: number;
          region: string;
          region_ko?: string | null;
        };
        Update: {
          dex_group_id?: number;
          id?: number;
          order_index?: number;
          region?: string;
          region_ko?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'dex_region_dex_group_id_fkey';
            columns: ['dex_group_id'];
            isOneToOne: false;
            referencedRelation: 'dex_group';
            referencedColumns: ['id'];
          },
        ];
      };
      evolution_chain: {
        Row: {
          created_at: string;
          evolution_id: number;
          from_poke_id: number | null;
          id: number;
          stage: number;
          to_detail: Json[] | null;
          to_poke_id: number;
        };
        Insert: {
          created_at?: string;
          evolution_id: number;
          from_poke_id?: number | null;
          id?: number;
          stage?: number;
          to_detail?: Json[] | null;
          to_poke_id: number;
        };
        Update: {
          created_at?: string;
          evolution_id?: number;
          from_poke_id?: number | null;
          id?: number;
          stage?: number;
          to_detail?: Json[] | null;
          to_poke_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'evolution_chain_from_poke_id_fkey';
            columns: ['from_poke_id'];
            isOneToOne: false;
            referencedRelation: 'national_pokedex_with_stat';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'evolution_chain_from_poke_id_fkey';
            columns: ['from_poke_id'];
            isOneToOne: false;
            referencedRelation: 'poke';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'evolution_chain_to_poke_id_fkey';
            columns: ['to_poke_id'];
            isOneToOne: false;
            referencedRelation: 'national_pokedex_with_stat';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'evolution_chain_to_poke_id_fkey';
            columns: ['to_poke_id'];
            isOneToOne: false;
            referencedRelation: 'poke';
            referencedColumns: ['id'];
          },
        ];
      };
      '\blanguage': {
        Row: {
          id: number;
          identifier: string;
        };
        Insert: {
          id?: number;
          identifier: string;
        };
        Update: {
          id?: number;
          identifier?: string;
        };
        Relationships: [];
      };
      move: {
        Row: {
          accuracy: number | null;
          created_at: string;
          damage_class_id: number | null;
          description: string | null;
          effect_chance: number | null;
          effect_id: number | null;
          generation: number | null;
          id: number;
          identifier: string | null;
          name_en: string | null;
          name_ja: string | null;
          name_ko: string | null;
          power: number | null;
          pp: number | null;
          priority: number | null;
          target_id: number | null;
          type_id: number | null;
        };
        Insert: {
          accuracy?: number | null;
          created_at?: string;
          damage_class_id?: number | null;
          description?: string | null;
          effect_chance?: number | null;
          effect_id?: number | null;
          generation?: number | null;
          id?: number;
          identifier?: string | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          priority?: number | null;
          target_id?: number | null;
          type_id?: number | null;
        };
        Update: {
          accuracy?: number | null;
          created_at?: string;
          damage_class_id?: number | null;
          description?: string | null;
          effect_chance?: number | null;
          effect_id?: number | null;
          generation?: number | null;
          id?: number;
          identifier?: string | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          priority?: number | null;
          target_id?: number | null;
          type_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'move_damage_class_id_fkey';
            columns: ['damage_class_id'];
            isOneToOne: false;
            referencedRelation: 'move_damage_class';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'move_effect_id_fkey';
            columns: ['effect_id'];
            isOneToOne: false;
            referencedRelation: 'move_effect';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'move_target_id_fkey';
            columns: ['target_id'];
            isOneToOne: false;
            referencedRelation: 'move_target';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'move_type_id_fkey';
            columns: ['type_id'];
            isOneToOne: false;
            referencedRelation: 'type';
            referencedColumns: ['id'];
          },
        ];
      };
      move_changelog: {
        Row: {
          accuracy: number | null;
          created_at: string;
          damage_class_id: number | null;
          effect_chance: number | null;
          effect_id: number | null;
          id: number;
          move_id: number | null;
          power: number | null;
          pp: number | null;
          priority: number | null;
          target_id: number | null;
          type_id: number | null;
          version_group_id: number | null;
        };
        Insert: {
          accuracy?: number | null;
          created_at?: string;
          damage_class_id?: number | null;
          effect_chance?: number | null;
          effect_id?: number | null;
          id?: number;
          move_id?: number | null;
          power?: number | null;
          pp?: number | null;
          priority?: number | null;
          target_id?: number | null;
          type_id?: number | null;
          version_group_id?: number | null;
        };
        Update: {
          accuracy?: number | null;
          created_at?: string;
          damage_class_id?: number | null;
          effect_chance?: number | null;
          effect_id?: number | null;
          id?: number;
          move_id?: number | null;
          power?: number | null;
          pp?: number | null;
          priority?: number | null;
          target_id?: number | null;
          type_id?: number | null;
          version_group_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'move_changelog_damage_class_id_fkey';
            columns: ['damage_class_id'];
            isOneToOne: false;
            referencedRelation: 'move_damage_class';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'move_changelog_effect_id_fkey';
            columns: ['effect_id'];
            isOneToOne: false;
            referencedRelation: 'move_effect';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'move_changelog_move_id_fkey';
            columns: ['move_id'];
            isOneToOne: false;
            referencedRelation: 'move';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'move_changelog_target_id_fkey';
            columns: ['target_id'];
            isOneToOne: false;
            referencedRelation: 'move_target';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'move_changelog_type_id_fkey';
            columns: ['type_id'];
            isOneToOne: false;
            referencedRelation: 'type';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'move_changelog_version_group_id_fkey';
            columns: ['version_group_id'];
            isOneToOne: false;
            referencedRelation: 'version_group';
            referencedColumns: ['id'];
          },
        ];
      };
      move_damage_class: {
        Row: {
          id: number;
          identifier: string;
        };
        Insert: {
          id?: number;
          identifier: string;
        };
        Update: {
          id?: number;
          identifier?: string;
        };
        Relationships: [];
      };
      move_effect: {
        Row: {
          effect: string;
          id: number;
        };
        Insert: {
          effect: string;
          id?: number;
        };
        Update: {
          effect?: string;
          id?: number;
        };
        Relationships: [];
      };
      move_lets_go: {
        Row: {
          accuracy: number | null;
          damage_class: string | null;
          id: number;
          move_id: number | null;
          name_en: string | null;
          name_ja: string | null;
          name_ko: string | null;
          power: number | null;
          pp: number | null;
          type: string | null;
        };
        Insert: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Update: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'move_lets_go_move_id_fkey';
            columns: ['move_id'];
            isOneToOne: false;
            referencedRelation: 'move';
            referencedColumns: ['id'];
          },
        ];
      };
      move_list_gen1: {
        Row: {
          accuracy: number | null;
          damage_class: string | null;
          id: number;
          move_id: number | null;
          name_en: string | null;
          name_ja: string | null;
          name_ko: string | null;
          power: number | null;
          pp: number | null;
          type: string | null;
        };
        Insert: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Update: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'move_list_gen1_move_id_fkey';
            columns: ['move_id'];
            isOneToOne: false;
            referencedRelation: 'move';
            referencedColumns: ['id'];
          },
        ];
      };
      move_list_gen2: {
        Row: {
          accuracy: number | null;
          damage_class: string | null;
          id: number;
          move_id: number | null;
          name_en: string | null;
          name_ja: string | null;
          name_ko: string | null;
          power: number | null;
          pp: number | null;
          type: string | null;
        };
        Insert: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Update: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'move_list_gen2_move_id_fkey';
            columns: ['move_id'];
            isOneToOne: false;
            referencedRelation: 'move';
            referencedColumns: ['id'];
          },
        ];
      };
      move_list_gen3: {
        Row: {
          accuracy: number | null;
          damage_class: string | null;
          id: number;
          move_id: number | null;
          name_en: string | null;
          name_ja: string | null;
          name_ko: string | null;
          power: number | null;
          pp: number | null;
          type: string | null;
        };
        Insert: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Update: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'move_list_gen3_move_id_fkey';
            columns: ['move_id'];
            isOneToOne: false;
            referencedRelation: 'move';
            referencedColumns: ['id'];
          },
        ];
      };
      move_list_gen4: {
        Row: {
          accuracy: number | null;
          damage_class: string | null;
          id: number;
          move_id: number | null;
          name_en: string | null;
          name_ja: string | null;
          name_ko: string | null;
          power: number | null;
          pp: number | null;
          type: string | null;
        };
        Insert: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Update: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'move_list_gen4_move_id_fkey';
            columns: ['move_id'];
            isOneToOne: false;
            referencedRelation: 'move';
            referencedColumns: ['id'];
          },
        ];
      };
      move_list_gen5: {
        Row: {
          accuracy: number | null;
          damage_class: string | null;
          id: number;
          move_id: number | null;
          name_en: string | null;
          name_ja: string | null;
          name_ko: string | null;
          power: number | null;
          pp: number | null;
          type: string | null;
        };
        Insert: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Update: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'move_list_gen5_move_id_fkey';
            columns: ['move_id'];
            isOneToOne: false;
            referencedRelation: 'move';
            referencedColumns: ['id'];
          },
        ];
      };
      move_list_gen6: {
        Row: {
          accuracy: number | null;
          damage_class: string | null;
          id: number;
          move_id: number | null;
          name_en: string | null;
          name_ja: string | null;
          name_ko: string | null;
          power: number | null;
          pp: number | null;
          type: string | null;
        };
        Insert: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Update: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'move_list_gen6_move_id_fkey';
            columns: ['move_id'];
            isOneToOne: false;
            referencedRelation: 'move';
            referencedColumns: ['id'];
          },
        ];
      };
      move_list_gen7: {
        Row: {
          accuracy: number | null;
          damage_class: string | null;
          id: number;
          move_id: number | null;
          name_en: string | null;
          name_ja: string | null;
          name_ko: string | null;
          power: number | null;
          pp: number | null;
          type: string | null;
        };
        Insert: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Update: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'move_list_gen7_move_id_fkey';
            columns: ['move_id'];
            isOneToOne: false;
            referencedRelation: 'move';
            referencedColumns: ['id'];
          },
        ];
      };
      move_list_gen8: {
        Row: {
          accuracy: number | null;
          damage_class: string | null;
          id: number;
          move_id: number | null;
          name_en: string | null;
          name_ja: string | null;
          name_ko: string | null;
          power: number | null;
          pp: number | null;
          type: string | null;
        };
        Insert: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Update: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'move_list_gen8_move_id_fkey';
            columns: ['move_id'];
            isOneToOne: false;
            referencedRelation: 'move';
            referencedColumns: ['id'];
          },
        ];
      };
      move_list_gen9: {
        Row: {
          accuracy: number | null;
          damage_class: string | null;
          id: number;
          move_id: number | null;
          name_en: string | null;
          name_ja: string | null;
          name_ko: string | null;
          power: number | null;
          pp: number | null;
          type: string | null;
        };
        Insert: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Update: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'move_list_gen9_move_id_fkey';
            columns: ['move_id'];
            isOneToOne: false;
            referencedRelation: 'move';
            referencedColumns: ['id'];
          },
        ];
      };
      move_machine: {
        Row: {
          created_at: string;
          id: number;
          machine_number: number;
          machine_type: string;
          move_id: number;
          version_group_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          machine_number: number;
          machine_type: string;
          move_id: number;
          version_group_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          machine_number?: number;
          machine_type?: string;
          move_id?: number;
          version_group_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'move_machine_move_id_fkey';
            columns: ['move_id'];
            isOneToOne: false;
            referencedRelation: 'move';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'move_machine_version_group_id_fkey';
            columns: ['version_group_id'];
            isOneToOne: false;
            referencedRelation: 'version_group';
            referencedColumns: ['id'];
          },
        ];
      };
      move_sw_sh: {
        Row: {
          accuracy: number | null;
          damage_class: string | null;
          id: number;
          move_id: number | null;
          name_en: string | null;
          name_ja: string | null;
          name_ko: string | null;
          power: number | null;
          pp: number | null;
          type: string | null;
        };
        Insert: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Update: {
          accuracy?: number | null;
          damage_class?: string | null;
          id?: number;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'move_sw_sh_move_id_fkey';
            columns: ['move_id'];
            isOneToOne: false;
            referencedRelation: 'move';
            referencedColumns: ['id'];
          },
        ];
      };
      move_target: {
        Row: {
          id: number;
          identifier: string;
        };
        Insert: {
          id?: number;
          identifier: string;
        };
        Update: {
          id?: number;
          identifier?: string;
        };
        Relationships: [];
      };
      move_with_changes: {
        Row: {
          accuracy: number | null;
          damage_class_id: number | null;
          damage_class_name: string | null;
          effect_chance: number | null;
          effect_description: string | null;
          effect_id: number | null;
          generation: number | null;
          move_id: number | null;
          name_en: string | null;
          name_ja: string | null;
          name_ko: string | null;
          power: number | null;
          pp: number | null;
          priority: number | null;
          target_id: number | null;
          target_name: string | null;
          type_id: number | null;
          type_name: string | null;
        };
        Insert: {
          accuracy?: number | null;
          damage_class_id?: number | null;
          damage_class_name?: string | null;
          effect_chance?: number | null;
          effect_description?: string | null;
          effect_id?: number | null;
          generation?: number | null;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          priority?: number | null;
          target_id?: number | null;
          target_name?: string | null;
          type_id?: number | null;
          type_name?: string | null;
        };
        Update: {
          accuracy?: number | null;
          damage_class_id?: number | null;
          damage_class_name?: string | null;
          effect_chance?: number | null;
          effect_description?: string | null;
          effect_id?: number | null;
          generation?: number | null;
          move_id?: number | null;
          name_en?: string | null;
          name_ja?: string | null;
          name_ko?: string | null;
          power?: number | null;
          pp?: number | null;
          priority?: number | null;
          target_id?: number | null;
          target_name?: string | null;
          type_id?: number | null;
          type_name?: string | null;
        };
        Relationships: [];
      };
      poke: {
        Row: {
          created_at: string;
          evolution_id: number | null;
          form: string | null;
          id: number;
          name_en: string;
          name_ja: string;
          name_ko: string;
          no: number;
          poke_key: string;
          species_id: number;
          sprite: string;
          type_1: string;
          type_1_id: number;
          type_2: string | null;
          type_2_id: number | null;
        };
        Insert: {
          created_at?: string;
          evolution_id?: number | null;
          form?: string | null;
          id?: number;
          name_en: string;
          name_ja: string;
          name_ko: string;
          no: number;
          poke_key: string;
          species_id: number;
          sprite: string;
          type_1: string;
          type_1_id: number;
          type_2?: string | null;
          type_2_id?: number | null;
        };
        Update: {
          created_at?: string;
          evolution_id?: number | null;
          form?: string | null;
          id?: number;
          name_en?: string;
          name_ja?: string;
          name_ko?: string;
          no?: number;
          poke_key?: string;
          species_id?: number;
          sprite?: string;
          type_1?: string;
          type_1_id?: number;
          type_2?: string | null;
          type_2_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'poke_species_id_fkey';
            columns: ['species_id'];
            isOneToOne: false;
            referencedRelation: 'species';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'poke_type_1_id_fkey';
            columns: ['type_1_id'];
            isOneToOne: false;
            referencedRelation: 'type';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'poke_type_2_id_fkey';
            columns: ['type_2_id'];
            isOneToOne: false;
            referencedRelation: 'type';
            referencedColumns: ['id'];
          },
        ];
      };
      poke_ability: {
        Row: {
          ability_id: number;
          created_at: string;
          id: number;
          poke_id: number;
          slot: number;
        };
        Insert: {
          ability_id: number;
          created_at?: string;
          id?: number;
          poke_id: number;
          slot: number;
        };
        Update: {
          ability_id?: number;
          created_at?: string;
          id?: number;
          poke_id?: number;
          slot?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'poke_ability_ability_id_fkey';
            columns: ['ability_id'];
            isOneToOne: false;
            referencedRelation: 'ability';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'poke_ability_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: false;
            referencedRelation: 'national_pokedex_with_stat';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'poke_ability_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: false;
            referencedRelation: 'poke';
            referencedColumns: ['id'];
          },
        ];
      };
      poke_breeding: {
        Row: {
          created_at: string;
          egg_group_1: string;
          egg_group_2: string | null;
          gender_rate: number | null;
          hatch_counter: number | null;
          id: number;
          poke_id: number;
        };
        Insert: {
          created_at?: string;
          egg_group_1: string;
          egg_group_2?: string | null;
          gender_rate?: number | null;
          hatch_counter?: number | null;
          id?: number;
          poke_id: number;
        };
        Update: {
          created_at?: string;
          egg_group_1?: string;
          egg_group_2?: string | null;
          gender_rate?: number | null;
          hatch_counter?: number | null;
          id?: number;
          poke_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'poke_breeding_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: true;
            referencedRelation: 'national_pokedex_with_stat';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'poke_breeding_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: true;
            referencedRelation: 'poke';
            referencedColumns: ['id'];
          },
        ];
      };
      poke_detail: {
        Row: {
          base_friendship: number | null;
          capture_rate: number | null;
          created_at: string;
          growth_rate: string | null;
          id: number;
          poke_id: number;
        };
        Insert: {
          base_friendship?: number | null;
          capture_rate?: number | null;
          created_at?: string;
          growth_rate?: string | null;
          id?: number;
          poke_id: number;
        };
        Update: {
          base_friendship?: number | null;
          capture_rate?: number | null;
          created_at?: string;
          growth_rate?: string | null;
          id?: number;
          poke_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'poke_detail_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: true;
            referencedRelation: 'national_pokedex_with_stat';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'poke_detail_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: true;
            referencedRelation: 'poke';
            referencedColumns: ['id'];
          },
        ];
      };
      poke_effort_value: {
        Row: {
          created_at: string;
          id: number;
          poke_id: number;
          stat_name: string;
          stat_value: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          poke_id: number;
          stat_name: string;
          stat_value: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          poke_id?: number;
          stat_name?: string;
          stat_value?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'poke_effort_value_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: false;
            referencedRelation: 'national_pokedex_with_stat';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'poke_effort_value_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: false;
            referencedRelation: 'poke';
            referencedColumns: ['id'];
          },
        ];
      };
      poke_move: {
        Row: {
          created_at: string;
          id: number;
          moves: Json;
          poke_id: number;
          version_group_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          moves: Json;
          poke_id: number;
          version_group_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          moves?: Json;
          poke_id?: number;
          version_group_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'poke_move_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: false;
            referencedRelation: 'national_pokedex_with_stat';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'poke_move_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: false;
            referencedRelation: 'poke';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'poke_move_version_group_id_fkey';
            columns: ['version_group_id'];
            isOneToOne: false;
            referencedRelation: 'version_group';
            referencedColumns: ['id'];
          },
        ];
      };
      poke_moves: {
        Row: {
          id: number;
          moves: Json;
          poke_id: number;
          version_group_id: number;
        };
        Insert: {
          id?: number;
          moves: Json;
          poke_id: number;
          version_group_id: number;
        };
        Update: {
          id?: number;
          moves?: Json;
          poke_id?: number;
          version_group_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'poke_moves_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: false;
            referencedRelation: 'national_pokedex_with_stat';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'poke_moves_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: false;
            referencedRelation: 'poke';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'poke_moves_version_group_id_fkey';
            columns: ['version_group_id'];
            isOneToOne: false;
            referencedRelation: 'version_group';
            referencedColumns: ['id'];
          },
        ];
      };
      poke_moves_2: {
        Row: {
          id: number;
          moves: Json;
          poke_id: number;
          version_group_id: number;
        };
        Insert: {
          id?: number;
          moves?: Json;
          poke_id: number;
          version_group_id: number;
        };
        Update: {
          id?: number;
          moves?: Json;
          poke_id?: number;
          version_group_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'poke_moves_2_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: false;
            referencedRelation: 'national_pokedex_with_stat';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'poke_moves_2_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: false;
            referencedRelation: 'poke';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'poke_moves_2_version_group_id_fkey';
            columns: ['version_group_id'];
            isOneToOne: false;
            referencedRelation: 'version_group';
            referencedColumns: ['id'];
          },
        ];
      };
      poke_stat: {
        Row: {
          attack: number;
          created_at: string;
          defense: number;
          hp: number;
          id: number;
          poke_id: number;
          special_attack: number;
          special_defense: number;
          speed: number;
          total: number | null;
        };
        Insert: {
          attack: number;
          created_at?: string;
          defense: number;
          hp: number;
          id?: number;
          poke_id: number;
          special_attack: number;
          special_defense: number;
          speed: number;
          total?: number | null;
        };
        Update: {
          attack?: number;
          created_at?: string;
          defense?: number;
          hp?: number;
          id?: number;
          poke_id?: number;
          special_attack?: number;
          special_defense?: number;
          speed?: number;
          total?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'poke_stat_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: true;
            referencedRelation: 'national_pokedex_with_stat';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'poke_stat_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: true;
            referencedRelation: 'poke';
            referencedColumns: ['id'];
          },
        ];
      };
      pokedex_info: {
        Row: {
          genera: string;
          height: number;
          id: number;
          poke_id: number;
          weight: number;
        };
        Insert: {
          genera: string;
          height: number;
          id?: number;
          poke_id: number;
          weight: number;
        };
        Update: {
          genera?: string;
          height?: number;
          id?: number;
          poke_id?: number;
          weight?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'pokedex_info_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: true;
            referencedRelation: 'national_pokedex_with_stat';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'pokedex_info_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: true;
            referencedRelation: 'poke';
            referencedColumns: ['id'];
          },
        ];
      };
      pokedex_number: {
        Row: {
          dex_number: number;
          dex_type: string;
          id: number;
          poke_id: number | null;
        };
        Insert: {
          dex_number: number;
          dex_type: string;
          id?: number;
          poke_id?: number | null;
        };
        Update: {
          dex_number?: number;
          dex_type?: string;
          id?: number;
          poke_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'pokedex_number_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: false;
            referencedRelation: 'national_pokedex_with_stat';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'pokedex_number_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: false;
            referencedRelation: 'poke';
            referencedColumns: ['id'];
          },
        ];
      };
      regional_pokedex: {
        Row: {
          id: number;
          poke_id: number;
          regional_dex_number: number;
          subdex_code: string;
          version_group_id: number;
        };
        Insert: {
          id?: number;
          poke_id: number;
          regional_dex_number: number;
          subdex_code?: string;
          version_group_id: number;
        };
        Update: {
          id?: number;
          poke_id?: number;
          regional_dex_number?: number;
          subdex_code?: string;
          version_group_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'regional_pokedex_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: false;
            referencedRelation: 'national_pokedex_with_stat';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'regional_pokedex_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: false;
            referencedRelation: 'poke';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'regional_pokedex_version_group_id_fkey';
            columns: ['version_group_id'];
            isOneToOne: false;
            referencedRelation: 'version_group';
            referencedColumns: ['id'];
          },
        ];
      };
      species: {
        Row: {
          id: number;
          name_ko: string;
          no: number;
          species: string;
        };
        Insert: {
          id?: number;
          name_ko: string;
          no: number;
          species: string;
        };
        Update: {
          id?: number;
          name_ko?: string;
          no?: number;
          species?: string;
        };
        Relationships: [];
      };
      type: {
        Row: {
          damage_class_id: number | null;
          generation: number;
          id: number;
          identifier: string;
          type_ko: string;
        };
        Insert: {
          damage_class_id?: number | null;
          generation: number;
          id?: number;
          identifier: string;
          type_ko: string;
        };
        Update: {
          damage_class_id?: number | null;
          generation?: number;
          id?: number;
          identifier?: string;
          type_ko?: string;
        };
        Relationships: [];
      };
      type_effective: {
        Row: {
          attacker_type_id: number;
          defender_type_id: number;
          effectiveness: number;
          generation: number | null;
          id: number;
        };
        Insert: {
          attacker_type_id: number;
          defender_type_id: number;
          effectiveness: number;
          generation?: number | null;
          id?: number;
        };
        Update: {
          attacker_type_id?: number;
          defender_type_id?: number;
          effectiveness?: number;
          generation?: number | null;
          id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'type_defense_attacker_type_id_fkey';
            columns: ['attacker_type_id'];
            isOneToOne: false;
            referencedRelation: 'type';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'type_defense_defender_type_id_fkey';
            columns: ['defender_type_id'];
            isOneToOne: false;
            referencedRelation: 'type';
            referencedColumns: ['id'];
          },
        ];
      };
      version_group: {
        Row: {
          generation: number;
          id: number;
          identifier: string;
          order: number;
          version_group_ko: string;
        };
        Insert: {
          generation: number;
          id?: number;
          identifier: string;
          order: number;
          version_group_ko: string;
        };
        Update: {
          generation?: number;
          id?: number;
          identifier?: string;
          order?: number;
          version_group_ko?: string;
        };
        Relationships: [];
      };
      version_move: {
        Row: {
          accuracy: number | null;
          damage_class: string;
          description: string;
          id: number;
          identifier: string;
          machine_number: number | null;
          machine_type: string | null;
          move_id: number;
          move_number: number;
          name_en: string;
          name_ja: string;
          name_ko: string;
          power: number | null;
          pp: number | null;
          type: string;
          version_group_id: number;
        };
        Insert: {
          accuracy?: number | null;
          damage_class: string;
          description: string;
          id?: number;
          identifier: string;
          machine_number?: number | null;
          machine_type?: string | null;
          move_id: number;
          move_number: number;
          name_en: string;
          name_ja: string;
          name_ko: string;
          power?: number | null;
          pp?: number | null;
          type: string;
          version_group_id: number;
        };
        Update: {
          accuracy?: number | null;
          damage_class?: string;
          description?: string;
          id?: number;
          identifier?: string;
          machine_number?: number | null;
          machine_type?: string | null;
          move_id?: number;
          move_number?: number;
          name_en?: string;
          name_ja?: string;
          name_ko?: string;
          power?: number | null;
          pp?: number | null;
          type?: string;
          version_group_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'version_move_move_id_fkey';
            columns: ['move_id'];
            isOneToOne: false;
            referencedRelation: 'move';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'version_move_version_group_id_fkey';
            columns: ['version_group_id'];
            isOneToOne: false;
            referencedRelation: 'version_group';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      evolution_mview: {
        Row: {
          evolution_data: Json | null;
          evolution_id: number | null;
        };
        Relationships: [];
      };
      national_pokedex_with_stat: {
        Row: {
          attack: number | null;
          defense: number | null;
          dex_number: number | null;
          form: string | null;
          hp: number | null;
          id: number | null;
          name: string | null;
          poke_key: string | null;
          special_attack: number | null;
          special_defense: number | null;
          speed: number | null;
          sprite: string | null;
          total: number | null;
          type1_identifier: string | null;
          type1_typeko: string | null;
          type2_identifier: string | null;
          type2_typeko: string | null;
        };
        Relationships: [];
      };
      poke_move_view: {
        Row: {
          moves: Json | null;
          poke_id: number | null;
          version_group_id: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'poke_move_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: false;
            referencedRelation: 'national_pokedex_with_stat';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'poke_move_poke_id_fkey';
            columns: ['poke_id'];
            isOneToOne: false;
            referencedRelation: 'poke';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'poke_move_version_group_id_fkey';
            columns: ['version_group_id'];
            isOneToOne: false;
            referencedRelation: 'version_group';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
      DefaultSchema['Views'])
  ? (DefaultSchema['Tables'] &
      DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
  ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
  ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
