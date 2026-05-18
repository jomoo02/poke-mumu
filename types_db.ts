export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ability: {
        Row: {
          created_at: string
          description: string | null
          flavor_text: string
          gen: number | null
          id: number
          identifier: string
          name_en: string
          name_ja: string | null
          name_ko: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          flavor_text: string
          gen?: number | null
          id?: number
          identifier: string
          name_en: string
          name_ja?: string | null
          name_ko: string
        }
        Update: {
          created_at?: string
          description?: string | null
          flavor_text?: string
          gen?: number | null
          id?: number
          identifier?: string
          name_en?: string
          name_ja?: string | null
          name_ko?: string
        }
        Relationships: []
      }
      damage_class: {
        Row: {
          id: number
          identifier: string
          name_en: string
          name_ja: string
          name_ko: string
        }
        Insert: {
          id?: number
          identifier: string
          name_en: string
          name_ja: string
          name_ko: string
        }
        Update: {
          id?: number
          identifier?: string
          name_en?: string
          name_ja?: string
          name_ko?: string
        }
        Relationships: []
      }
      dex_entry: {
        Row: {
          dex_number: number
          dex_region_id: number
          id: number
          poke_key: string
        }
        Insert: {
          dex_number: number
          dex_region_id: number
          id?: number
          poke_key: string
        }
        Update: {
          dex_number?: number
          dex_region_id?: number
          id?: number
          poke_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "dex_entry_dex_region_id_fkey"
            columns: ["dex_region_id"]
            isOneToOne: false
            referencedRelation: "dex_region"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dex_entry_poke_key_fkey"
            columns: ["poke_key"]
            isOneToOne: false
            referencedRelation: "national_pokedex_with_stat"
            referencedColumns: ["poke_key"]
          },
          {
            foreignKeyName: "dex_entry_poke_key_fkey"
            columns: ["poke_key"]
            isOneToOne: false
            referencedRelation: "poke"
            referencedColumns: ["poke_key"]
          },
        ]
      }
      dex_group: {
        Row: {
          description: string
          game_group: string
          game_group_ko: string
          id: number
        }
        Insert: {
          description: string
          game_group: string
          game_group_ko: string
          id?: number
        }
        Update: {
          description?: string
          game_group?: string
          game_group_ko?: string
          id?: number
        }
        Relationships: []
      }
      dex_region: {
        Row: {
          dex_group_id: number
          id: number
          order_index: number
          region: string
          region_ko: string | null
        }
        Insert: {
          dex_group_id: number
          id?: number
          order_index: number
          region: string
          region_ko?: string | null
        }
        Update: {
          dex_group_id?: number
          id?: number
          order_index?: number
          region?: string
          region_ko?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dex_region_dex_group_id_fkey"
            columns: ["dex_group_id"]
            isOneToOne: false
            referencedRelation: "dex_group"
            referencedColumns: ["id"]
          },
        ]
      }
      egg_group: {
        Row: {
          id: number
          identifier: string
          name_en: string
          name_ja: string
          name_ko: string
        }
        Insert: {
          id?: number
          identifier: string
          name_en: string
          name_ja: string
          name_ko: string
        }
        Update: {
          id?: number
          identifier?: string
          name_en?: string
          name_ja?: string
          name_ko?: string
        }
        Relationships: []
      }
      form: {
        Row: {
          id: number
          identifier: string
          name_en: string
          name_ja: string
          name_ko: string
        }
        Insert: {
          id?: number
          identifier: string
          name_en: string
          name_ja: string
          name_ko: string
        }
        Update: {
          id?: number
          identifier?: string
          name_en?: string
          name_ja?: string
          name_ko?: string
        }
        Relationships: []
      }
      move: {
        Row: {
          accuracy: number | null
          created_at: string
          damage_class_id: number | null
          description: string
          effect_chance: number | null
          generation: number
          id: number
          identifier: string
          legacy_id: number | null
          name_en: string
          name_ja: string
          name_ko: string
          power: number | null
          pp: number | null
          priority: number
          target_id: number
          type_id: number
          variant_id: number | null
        }
        Insert: {
          accuracy?: number | null
          created_at?: string
          damage_class_id?: number | null
          description: string
          effect_chance?: number | null
          generation: number
          id?: number
          identifier: string
          legacy_id?: number | null
          name_en: string
          name_ja: string
          name_ko: string
          power?: number | null
          pp?: number | null
          priority?: number
          target_id: number
          type_id: number
          variant_id?: number | null
        }
        Update: {
          accuracy?: number | null
          created_at?: string
          damage_class_id?: number | null
          description?: string
          effect_chance?: number | null
          generation?: number
          id?: number
          identifier?: string
          legacy_id?: number | null
          name_en?: string
          name_ja?: string
          name_ko?: string
          power?: number | null
          pp?: number | null
          priority?: number
          target_id?: number
          type_id?: number
          variant_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "move_damage_class_id_fkey"
            columns: ["damage_class_id"]
            isOneToOne: false
            referencedRelation: "damage_class"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "move_damage_class_id_fkey"
            columns: ["damage_class_id"]
            isOneToOne: false
            referencedRelation: "poke_move_vm_view"
            referencedColumns: ["damage_class_id"]
          },
          {
            foreignKeyName: "move_damage_class_id_fkey"
            columns: ["damage_class_id"]
            isOneToOne: false
            referencedRelation: "poke_move_za_view"
            referencedColumns: ["damage_class_id"]
          },
          {
            foreignKeyName: "move_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "move_target"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "move_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "poke_move_vm_view"
            referencedColumns: ["type_id"]
          },
          {
            foreignKeyName: "move_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "poke_move_za_view"
            referencedColumns: ["type_id"]
          },
          {
            foreignKeyName: "move_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "move_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "move_variant"
            referencedColumns: ["id"]
          },
        ]
      }
      move_learn_method: {
        Row: {
          created_at: string
          id: number
          identifier: string
          name_en: string
          name_ja: string
          name_ko: string
        }
        Insert: {
          created_at?: string
          id?: number
          identifier: string
          name_en: string
          name_ja: string
          name_ko: string
        }
        Update: {
          created_at?: string
          id?: number
          identifier?: string
          name_en?: string
          name_ja?: string
          name_ko?: string
        }
        Relationships: []
      }
      move_target: {
        Row: {
          created_at: string
          id: number
          identifier: string
          name_en: string
          name_ja: string
          name_ko: string
        }
        Insert: {
          created_at?: string
          id?: number
          identifier: string
          name_en: string
          name_ja: string
          name_ko: string
        }
        Update: {
          created_at?: string
          id?: number
          identifier?: string
          name_en?: string
          name_ja?: string
          name_ko?: string
        }
        Relationships: []
      }
      move_variant: {
        Row: {
          created_at: string
          id: number
          identifier: string
          name_en: string
          name_ja: string
          name_ko: string
        }
        Insert: {
          created_at?: string
          id?: number
          identifier: string
          name_en: string
          name_ja: string
          name_ko: string
        }
        Update: {
          created_at?: string
          id?: number
          identifier?: string
          name_en?: string
          name_ja?: string
          name_ko?: string
        }
        Relationships: []
      }
      poke: {
        Row: {
          created_at: string
          form_id: number | null
          height_dm: number | null
          id: number
          is_default: boolean
          name_en: string
          name_ja: string
          name_ko: string
          poke_key: string
          sort_order: number
          species_id: number
          sprite: string
          type_1_id: number
          type_2_id: number | null
          weight_hg: number | null
        }
        Insert: {
          created_at?: string
          form_id?: number | null
          height_dm?: number | null
          id?: number
          is_default?: boolean
          name_en: string
          name_ja: string
          name_ko: string
          poke_key: string
          sort_order: number
          species_id: number
          sprite: string
          type_1_id: number
          type_2_id?: number | null
          weight_hg?: number | null
        }
        Update: {
          created_at?: string
          form_id?: number | null
          height_dm?: number | null
          id?: number
          is_default?: boolean
          name_en?: string
          name_ja?: string
          name_ko?: string
          poke_key?: string
          sort_order?: number
          species_id?: number
          sprite?: string
          type_1_id?: number
          type_2_id?: number | null
          weight_hg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "poke_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "form"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "poke_species_id_fkey"
            columns: ["species_id"]
            isOneToOne: false
            referencedRelation: "species"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "poke_type_1_id_fkey"
            columns: ["type_1_id"]
            isOneToOne: false
            referencedRelation: "poke_move_vm_view"
            referencedColumns: ["type_id"]
          },
          {
            foreignKeyName: "poke_type_1_id_fkey"
            columns: ["type_1_id"]
            isOneToOne: false
            referencedRelation: "poke_move_za_view"
            referencedColumns: ["type_id"]
          },
          {
            foreignKeyName: "poke_type_1_id_fkey"
            columns: ["type_1_id"]
            isOneToOne: false
            referencedRelation: "type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "poke_type_2_id_fkey"
            columns: ["type_2_id"]
            isOneToOne: false
            referencedRelation: "poke_move_vm_view"
            referencedColumns: ["type_id"]
          },
          {
            foreignKeyName: "poke_type_2_id_fkey"
            columns: ["type_2_id"]
            isOneToOne: false
            referencedRelation: "poke_move_za_view"
            referencedColumns: ["type_id"]
          },
          {
            foreignKeyName: "poke_type_2_id_fkey"
            columns: ["type_2_id"]
            isOneToOne: false
            referencedRelation: "type"
            referencedColumns: ["id"]
          },
        ]
      }
      poke_ability: {
        Row: {
          ability_id: number
          created_at: string
          id: number
          is_hidden: boolean
          poke_key: string
          slot: number | null
        }
        Insert: {
          ability_id: number
          created_at?: string
          id?: number
          is_hidden?: boolean
          poke_key: string
          slot?: number | null
        }
        Update: {
          ability_id?: number
          created_at?: string
          id?: number
          is_hidden?: boolean
          poke_key?: string
          slot?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "poke_ability_ability_id_fkey"
            columns: ["ability_id"]
            isOneToOne: false
            referencedRelation: "ability"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "poke_ability_poke_key_fkey"
            columns: ["poke_key"]
            isOneToOne: false
            referencedRelation: "national_pokedex_with_stat"
            referencedColumns: ["poke_key"]
          },
          {
            foreignKeyName: "poke_ability_poke_key_fkey"
            columns: ["poke_key"]
            isOneToOne: false
            referencedRelation: "poke"
            referencedColumns: ["poke_key"]
          },
        ]
      }
      poke_effort_value: {
        Row: {
          created_at: string
          id: number
          poke_key: string
          stat_id: number
          value: number
        }
        Insert: {
          created_at?: string
          id?: number
          poke_key: string
          stat_id: number
          value: number
        }
        Update: {
          created_at?: string
          id?: number
          poke_key?: string
          stat_id?: number
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "poke_effort_value_poke_key_fkey"
            columns: ["poke_key"]
            isOneToOne: false
            referencedRelation: "national_pokedex_with_stat"
            referencedColumns: ["poke_key"]
          },
          {
            foreignKeyName: "poke_effort_value_poke_key_fkey"
            columns: ["poke_key"]
            isOneToOne: false
            referencedRelation: "poke"
            referencedColumns: ["poke_key"]
          },
          {
            foreignKeyName: "poke_effort_value_stat_id_fkey"
            columns: ["stat_id"]
            isOneToOne: false
            referencedRelation: "stat"
            referencedColumns: ["id"]
          },
        ]
      }
      poke_move: {
        Row: {
          created_at: string
          detail: string | null
          id: number
          learn_method_id: number
          level: number | null
          move_id: number
          poke_key: string
          version_group_id: number
        }
        Insert: {
          created_at?: string
          detail?: string | null
          id?: number
          learn_method_id: number
          level?: number | null
          move_id: number
          poke_key: string
          version_group_id: number
        }
        Update: {
          created_at?: string
          detail?: string | null
          id?: number
          learn_method_id?: number
          level?: number | null
          move_id?: number
          poke_key?: string
          version_group_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "poke_move_learn_method_id_fkey"
            columns: ["learn_method_id"]
            isOneToOne: false
            referencedRelation: "move_learn_method"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "poke_move_learn_method_id_fkey"
            columns: ["learn_method_id"]
            isOneToOne: false
            referencedRelation: "poke_move_vm_view"
            referencedColumns: ["learn_method_id"]
          },
          {
            foreignKeyName: "poke_move_learn_method_id_fkey"
            columns: ["learn_method_id"]
            isOneToOne: false
            referencedRelation: "poke_move_za_view"
            referencedColumns: ["learn_method_id"]
          },
          {
            foreignKeyName: "poke_move_move_id_fkey"
            columns: ["move_id"]
            isOneToOne: false
            referencedRelation: "move"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "poke_move_move_id_fkey"
            columns: ["move_id"]
            isOneToOne: false
            referencedRelation: "move_current"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "poke_move_move_id_fkey"
            columns: ["move_id"]
            isOneToOne: false
            referencedRelation: "poke_move_vm_view"
            referencedColumns: ["move_id"]
          },
          {
            foreignKeyName: "poke_move_move_id_fkey"
            columns: ["move_id"]
            isOneToOne: false
            referencedRelation: "poke_move_za_view"
            referencedColumns: ["move_id"]
          },
          {
            foreignKeyName: "poke_move_poke_key_fkey"
            columns: ["poke_key"]
            isOneToOne: false
            referencedRelation: "national_pokedex_with_stat"
            referencedColumns: ["poke_key"]
          },
          {
            foreignKeyName: "poke_move_poke_key_fkey"
            columns: ["poke_key"]
            isOneToOne: false
            referencedRelation: "poke"
            referencedColumns: ["poke_key"]
          },
          {
            foreignKeyName: "poke_move_version_group_id_fkey"
            columns: ["version_group_id"]
            isOneToOne: false
            referencedRelation: "version_group"
            referencedColumns: ["id"]
          },
        ]
      }
      poke_stat: {
        Row: {
          attack: number
          created_at: string
          defense: number
          hp: number
          poke_key: string
          special_attack: number
          special_defense: number
          speed: number
          total: number
        }
        Insert: {
          attack: number
          created_at?: string
          defense: number
          hp: number
          poke_key: string
          special_attack: number
          special_defense: number
          speed: number
          total?: number
        }
        Update: {
          attack?: number
          created_at?: string
          defense?: number
          hp?: number
          poke_key?: string
          special_attack?: number
          special_defense?: number
          speed?: number
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "poke_stat_poke_key_fkey"
            columns: ["poke_key"]
            isOneToOne: true
            referencedRelation: "national_pokedex_with_stat"
            referencedColumns: ["poke_key"]
          },
          {
            foreignKeyName: "poke_stat_poke_key_fkey"
            columns: ["poke_key"]
            isOneToOne: true
            referencedRelation: "poke"
            referencedColumns: ["poke_key"]
          },
        ]
      }
      species: {
        Row: {
          base_happiness: number
          capture_rate: number
          created_at: string
          dex_number: number
          egg_group_1_id: number
          egg_group_2_id: number | null
          gender_rate: number
          genera_ko: string
          growth_rate: string
          hatch_counter: number | null
          id: number
          identifier: string
          name_en: string
          name_ja: string
          name_ko: string
        }
        Insert: {
          base_happiness: number
          capture_rate: number
          created_at?: string
          dex_number: number
          egg_group_1_id: number
          egg_group_2_id?: number | null
          gender_rate: number
          genera_ko: string
          growth_rate: string
          hatch_counter?: number | null
          id?: number
          identifier: string
          name_en: string
          name_ja: string
          name_ko: string
        }
        Update: {
          base_happiness?: number
          capture_rate?: number
          created_at?: string
          dex_number?: number
          egg_group_1_id?: number
          egg_group_2_id?: number | null
          gender_rate?: number
          genera_ko?: string
          growth_rate?: string
          hatch_counter?: number | null
          id?: number
          identifier?: string
          name_en?: string
          name_ja?: string
          name_ko?: string
        }
        Relationships: [
          {
            foreignKeyName: "species_egg_group_1_id_fkey"
            columns: ["egg_group_1_id"]
            isOneToOne: false
            referencedRelation: "egg_group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "species_egg_group_2_id_fkey"
            columns: ["egg_group_2_id"]
            isOneToOne: false
            referencedRelation: "egg_group"
            referencedColumns: ["id"]
          },
        ]
      }
      stat: {
        Row: {
          created_at: string
          display_order: number
          id: number
          identifier: string
          name_en: string
          name_ja: string
          name_ko: string
        }
        Insert: {
          created_at?: string
          display_order: number
          id?: number
          identifier: string
          name_en: string
          name_ja: string
          name_ko: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: number
          identifier?: string
          name_en?: string
          name_ja?: string
          name_ko?: string
        }
        Relationships: []
      }
      type: {
        Row: {
          damage_class_id: number | null
          generation: number
          id: number
          identifier: string
          name_en: string
          name_ja: string
          name_ko: string
        }
        Insert: {
          damage_class_id?: number | null
          generation: number
          id?: number
          identifier: string
          name_en: string
          name_ja: string
          name_ko: string
        }
        Update: {
          damage_class_id?: number | null
          generation?: number
          id?: number
          identifier?: string
          name_en?: string
          name_ja?: string
          name_ko?: string
        }
        Relationships: [
          {
            foreignKeyName: "type_damage_class_id_fkey"
            columns: ["damage_class_id"]
            isOneToOne: false
            referencedRelation: "damage_class"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "type_damage_class_id_fkey"
            columns: ["damage_class_id"]
            isOneToOne: false
            referencedRelation: "poke_move_vm_view"
            referencedColumns: ["damage_class_id"]
          },
          {
            foreignKeyName: "type_damage_class_id_fkey"
            columns: ["damage_class_id"]
            isOneToOne: false
            referencedRelation: "poke_move_za_view"
            referencedColumns: ["damage_class_id"]
          },
        ]
      }
      type_effectiveness: {
        Row: {
          attacker_type_id: number
          defender_type_id: number
          effective_from: number
          effectiveness: number
        }
        Insert: {
          attacker_type_id: number
          defender_type_id: number
          effective_from: number
          effectiveness: number
        }
        Update: {
          attacker_type_id?: number
          defender_type_id?: number
          effective_from?: number
          effectiveness?: number
        }
        Relationships: [
          {
            foreignKeyName: "type_effectiveness_attacker_fkey"
            columns: ["attacker_type_id"]
            isOneToOne: false
            referencedRelation: "poke_move_vm_view"
            referencedColumns: ["type_id"]
          },
          {
            foreignKeyName: "type_effectiveness_attacker_fkey"
            columns: ["attacker_type_id"]
            isOneToOne: false
            referencedRelation: "poke_move_za_view"
            referencedColumns: ["type_id"]
          },
          {
            foreignKeyName: "type_effectiveness_attacker_fkey"
            columns: ["attacker_type_id"]
            isOneToOne: false
            referencedRelation: "type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "type_effectiveness_defender_fkey"
            columns: ["defender_type_id"]
            isOneToOne: false
            referencedRelation: "poke_move_vm_view"
            referencedColumns: ["type_id"]
          },
          {
            foreignKeyName: "type_effectiveness_defender_fkey"
            columns: ["defender_type_id"]
            isOneToOne: false
            referencedRelation: "poke_move_za_view"
            referencedColumns: ["type_id"]
          },
          {
            foreignKeyName: "type_effectiveness_defender_fkey"
            columns: ["defender_type_id"]
            isOneToOne: false
            referencedRelation: "type"
            referencedColumns: ["id"]
          },
        ]
      }
      version_group: {
        Row: {
          created_at: string
          generation: number
          id: number
          identifier: string
          name_en: string
          name_ja: string
          name_ko: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          generation: number
          id?: number
          identifier: string
          name_en: string
          name_ja: string
          name_ko: string
          sort_order: number
        }
        Update: {
          created_at?: string
          generation?: number
          id?: number
          identifier?: string
          name_en?: string
          name_ja?: string
          name_ko?: string
          sort_order?: number
        }
        Relationships: []
      }
      version_move: {
        Row: {
          accuracy: number | null
          created_at: string
          damage_class_id: number | null
          description: string
          id: number
          machine_number: number | null
          machine_type: string | null
          move_id: number
          name_ko: string
          power: number | null
          pp: number | null
          type_id: number
          version_group_id: number
        }
        Insert: {
          accuracy?: number | null
          created_at?: string
          damage_class_id?: number | null
          description: string
          id?: number
          machine_number?: number | null
          machine_type?: string | null
          move_id: number
          name_ko: string
          power?: number | null
          pp?: number | null
          type_id: number
          version_group_id: number
        }
        Update: {
          accuracy?: number | null
          created_at?: string
          damage_class_id?: number | null
          description?: string
          id?: number
          machine_number?: number | null
          machine_type?: string | null
          move_id?: number
          name_ko?: string
          power?: number | null
          pp?: number | null
          type_id?: number
          version_group_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "version_move_damage_class_id_fkey"
            columns: ["damage_class_id"]
            isOneToOne: false
            referencedRelation: "damage_class"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "version_move_damage_class_id_fkey"
            columns: ["damage_class_id"]
            isOneToOne: false
            referencedRelation: "poke_move_vm_view"
            referencedColumns: ["damage_class_id"]
          },
          {
            foreignKeyName: "version_move_damage_class_id_fkey"
            columns: ["damage_class_id"]
            isOneToOne: false
            referencedRelation: "poke_move_za_view"
            referencedColumns: ["damage_class_id"]
          },
          {
            foreignKeyName: "version_move_move_id_fkey"
            columns: ["move_id"]
            isOneToOne: false
            referencedRelation: "move"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "version_move_move_id_fkey"
            columns: ["move_id"]
            isOneToOne: false
            referencedRelation: "move_current"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "version_move_move_id_fkey"
            columns: ["move_id"]
            isOneToOne: false
            referencedRelation: "poke_move_vm_view"
            referencedColumns: ["move_id"]
          },
          {
            foreignKeyName: "version_move_move_id_fkey"
            columns: ["move_id"]
            isOneToOne: false
            referencedRelation: "poke_move_za_view"
            referencedColumns: ["move_id"]
          },
          {
            foreignKeyName: "version_move_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "poke_move_vm_view"
            referencedColumns: ["type_id"]
          },
          {
            foreignKeyName: "version_move_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "poke_move_za_view"
            referencedColumns: ["type_id"]
          },
          {
            foreignKeyName: "version_move_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "version_move_version_group_id_fkey"
            columns: ["version_group_id"]
            isOneToOne: false
            referencedRelation: "version_group"
            referencedColumns: ["id"]
          },
        ]
      }
      version_move_legends_za: {
        Row: {
          base_move_id: number | null
          cooldown: number | null
          created_at: string
          damage_class_id: number
          description: string
          duration: number | null
          frames_exec: number | null
          frames_wind_up: number | null
          id: number
          identifier: string
          legacy_move_id: number
          machine_number: number | null
          machine_type: string | null
          name_en: string
          name_ja: string
          name_ko: string
          power: number | null
          pp: number | null
          range_eff: number | null
          range_max: number | null
          range_min: number | null
          type_id: number
          version_group_id: number
          za_variant: string
        }
        Insert: {
          base_move_id?: number | null
          cooldown?: number | null
          created_at?: string
          damage_class_id: number
          description: string
          duration?: number | null
          frames_exec?: number | null
          frames_wind_up?: number | null
          id?: number
          identifier: string
          legacy_move_id: number
          machine_number?: number | null
          machine_type?: string | null
          name_en: string
          name_ja: string
          name_ko: string
          power?: number | null
          pp?: number | null
          range_eff?: number | null
          range_max?: number | null
          range_min?: number | null
          type_id: number
          version_group_id?: number
          za_variant: string
        }
        Update: {
          base_move_id?: number | null
          cooldown?: number | null
          created_at?: string
          damage_class_id?: number
          description?: string
          duration?: number | null
          frames_exec?: number | null
          frames_wind_up?: number | null
          id?: number
          identifier?: string
          legacy_move_id?: number
          machine_number?: number | null
          machine_type?: string | null
          name_en?: string
          name_ja?: string
          name_ko?: string
          power?: number | null
          pp?: number | null
          range_eff?: number | null
          range_max?: number | null
          range_min?: number | null
          type_id?: number
          version_group_id?: number
          za_variant?: string
        }
        Relationships: [
          {
            foreignKeyName: "version_move_legends_za_base_move_id_fkey"
            columns: ["base_move_id"]
            isOneToOne: false
            referencedRelation: "move"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "version_move_legends_za_base_move_id_fkey"
            columns: ["base_move_id"]
            isOneToOne: false
            referencedRelation: "move_current"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "version_move_legends_za_base_move_id_fkey"
            columns: ["base_move_id"]
            isOneToOne: false
            referencedRelation: "poke_move_vm_view"
            referencedColumns: ["move_id"]
          },
          {
            foreignKeyName: "version_move_legends_za_base_move_id_fkey"
            columns: ["base_move_id"]
            isOneToOne: false
            referencedRelation: "poke_move_za_view"
            referencedColumns: ["move_id"]
          },
          {
            foreignKeyName: "version_move_legends_za_damage_class_id_fkey"
            columns: ["damage_class_id"]
            isOneToOne: false
            referencedRelation: "damage_class"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "version_move_legends_za_damage_class_id_fkey"
            columns: ["damage_class_id"]
            isOneToOne: false
            referencedRelation: "poke_move_vm_view"
            referencedColumns: ["damage_class_id"]
          },
          {
            foreignKeyName: "version_move_legends_za_damage_class_id_fkey"
            columns: ["damage_class_id"]
            isOneToOne: false
            referencedRelation: "poke_move_za_view"
            referencedColumns: ["damage_class_id"]
          },
          {
            foreignKeyName: "version_move_legends_za_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "poke_move_vm_view"
            referencedColumns: ["type_id"]
          },
          {
            foreignKeyName: "version_move_legends_za_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "poke_move_za_view"
            referencedColumns: ["type_id"]
          },
          {
            foreignKeyName: "version_move_legends_za_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "version_move_legends_za_version_group_id_fkey"
            columns: ["version_group_id"]
            isOneToOne: false
            referencedRelation: "version_group"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      move_current: {
        Row: {
          accuracy: number | null
          damage_class_id: number | null
          damage_class_identifier: string | null
          damage_class_name_ko: string | null
          generation: number | null
          id: number | null
          identifier: string | null
          name_en: string | null
          name_ja: string | null
          name_ko: string | null
          power: number | null
          pp: number | null
          type_id: number | null
          type_identifier: string | null
          type_name_ko: string | null
          version_group_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "version_move_version_group_id_fkey"
            columns: ["version_group_id"]
            isOneToOne: false
            referencedRelation: "version_group"
            referencedColumns: ["id"]
          },
        ]
      }
      national_pokedex_with_stat: {
        Row: {
          attack: number | null
          defense: number | null
          dex_number: number | null
          form_identifier: string | null
          form_name_ko: string | null
          hp: number | null
          name_ko: string | null
          poke_key: string | null
          sort_order: number | null
          special_attack: number | null
          special_defense: number | null
          speed: number | null
          sprite: string | null
          total: number | null
          type_1_identifier: string | null
          type_1_name_ko: string | null
          type_2_identifier: string | null
          type_2_name_ko: string | null
        }
        Relationships: []
      }
      poke_move_vm_view: {
        Row: {
          accuracy: number | null
          damage_class_id: number | null
          damage_class_identifier: string | null
          description: string | null
          detail: string | null
          generation: number | null
          identifier: string | null
          learn_method_id: number | null
          learn_method_identifier: string | null
          learn_method_name_ko: string | null
          level: number | null
          machine_number: number | null
          machine_type: string | null
          move_id: number | null
          name_ko: string | null
          poke_key: string | null
          power: number | null
          pp: number | null
          type_id: number | null
          type_identifier: string | null
          type_name_ko: string | null
          version_group_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "poke_move_poke_key_fkey"
            columns: ["poke_key"]
            isOneToOne: false
            referencedRelation: "national_pokedex_with_stat"
            referencedColumns: ["poke_key"]
          },
          {
            foreignKeyName: "poke_move_poke_key_fkey"
            columns: ["poke_key"]
            isOneToOne: false
            referencedRelation: "poke"
            referencedColumns: ["poke_key"]
          },
          {
            foreignKeyName: "poke_move_version_group_id_fkey"
            columns: ["version_group_id"]
            isOneToOne: false
            referencedRelation: "version_group"
            referencedColumns: ["id"]
          },
        ]
      }
      poke_move_za_view: {
        Row: {
          base_move_id: number | null
          cooldown: number | null
          damage_class_id: number | null
          damage_class_identifier: string | null
          description: string | null
          detail: string | null
          duration: number | null
          frames_exec: number | null
          frames_wind_up: number | null
          generation: number | null
          identifier: string | null
          learn_method_id: number | null
          learn_method_identifier: string | null
          learn_method_name_ko: string | null
          legacy_move_id: number | null
          level: number | null
          machine_number: number | null
          machine_type: string | null
          move_id: number | null
          name_ko: string | null
          poke_key: string | null
          power: number | null
          pp: number | null
          range_eff: number | null
          range_max: number | null
          range_min: number | null
          type_id: number | null
          type_identifier: string | null
          type_name_ko: string | null
          version_group_id: number | null
          za_id: number | null
          za_variant: string | null
        }
        Relationships: [
          {
            foreignKeyName: "poke_move_poke_key_fkey"
            columns: ["poke_key"]
            isOneToOne: false
            referencedRelation: "national_pokedex_with_stat"
            referencedColumns: ["poke_key"]
          },
          {
            foreignKeyName: "poke_move_poke_key_fkey"
            columns: ["poke_key"]
            isOneToOne: false
            referencedRelation: "poke"
            referencedColumns: ["poke_key"]
          },
          {
            foreignKeyName: "poke_move_version_group_id_fkey"
            columns: ["version_group_id"]
            isOneToOne: false
            referencedRelation: "version_group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "version_move_legends_za_base_move_id_fkey"
            columns: ["base_move_id"]
            isOneToOne: false
            referencedRelation: "move"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "version_move_legends_za_base_move_id_fkey"
            columns: ["base_move_id"]
            isOneToOne: false
            referencedRelation: "move_current"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "version_move_legends_za_base_move_id_fkey"
            columns: ["base_move_id"]
            isOneToOne: false
            referencedRelation: "poke_move_vm_view"
            referencedColumns: ["move_id"]
          },
          {
            foreignKeyName: "version_move_legends_za_base_move_id_fkey"
            columns: ["base_move_id"]
            isOneToOne: false
            referencedRelation: "poke_move_za_view"
            referencedColumns: ["move_id"]
          },
        ]
      }
    }
    Functions: {
      backfill_poke_metrics: { Args: { updates: Json }; Returns: number }
      get_available_vgs_for_poke: {
        Args: { p_poke_key: string }
        Returns: {
          generation: number
          identifier: string
          name_ko: string
          sort_order: number
          version_group_id: number
        }[]
      }
      get_default_vg_for_poke: { Args: { p_poke_key: string }; Returns: number }
      poke_type_defense: {
        Args: { defender_ids: number[]; target_gen?: number }
        Returns: {
          attacker_type_id: number
          effectiveness: number
        }[]
      }
      poke_type_defense_history: {
        Args: { defender_ids: number[] }
        Returns: {
          attacker_type_id: number
          defender_type_id: number
          effective_from: number
          effective_until: number
          effectiveness: number
        }[]
      }
      reset_poke_metrics: { Args: never; Returns: undefined }
      sync_move_learn_method_sequence: { Args: never; Returns: undefined }
      sync_move_sequence: { Args: never; Returns: undefined }
      sync_move_target_sequence: { Args: never; Returns: undefined }
      sync_move_variant_sequence: { Args: never; Returns: undefined }
      sync_poke_move_sequence: { Args: never; Returns: undefined }
      sync_version_group_sequence: { Args: never; Returns: undefined }
      sync_version_move_legends_za_sequence: { Args: never; Returns: undefined }
      sync_version_move_sequence: { Args: never; Returns: undefined }
      truncate_ability_tables: { Args: never; Returns: undefined }
      truncate_poke: { Args: never; Returns: undefined }
      truncate_species: { Args: never; Returns: undefined }
      type_effectiveness_at: {
        Args: { target_gen?: number }
        Returns: {
          attacker_type_id: number
          defender_type_id: number
          effectiveness: number
        }[]
      }
      type_effectiveness_changes: {
        Args: never
        Returns: {
          attacker_type_id: number
          change_kind: string
          current: number
          defender_type_id: number
          generation: number
          previous: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
