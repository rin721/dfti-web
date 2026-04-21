export interface MBTIEffects {
  E?: number;
  I?: number;
  S?: number;
  N?: number;
  T?: number;
  F?: number;
  J?: number;
  P?: number;
}

export interface MBTIAxisWeights {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

export interface Character {
  id: string;
  code: string;
  name: string;
  codename: string;
  display_name: string;
  faction: string;
  organization: string;
  archetype_type: 'operator' | 'npc' | 'enemy' | 'faction_archetype' | 'meme_archetype';
  result_mode: 'direct_character' | 'hybrid' | 'faction_persona';
  short_intro: string;
  official_background: string;
  player_impression: string;
  community_interpretation: string;
  meme_tags: string[];
  personality_tags: string[];
  gameplay_style_tags: string[];
  battlefield_identity_tags: string[];
  relationship_impression_tags: string[];
  mbti_axis_weights: MBTIAxisWeights;
  result_title: string;
  result_subtitle: string;
  result_copy: string;
  share_copy: string;
  source_type: 'official' | 'community' | 'mixed';
  canon_level: 'canon' | 'fanon' | 'ambiguous';
  confidence: 'high' | 'medium' | 'low';
  source_note: string;
  detailed_bio?: string;
  profiling_suggestion?: string;
}

export interface Meme {
  id: string;
  title: string;
  raw_phrase: string;
  normalized_phrase: string;
  meme_type: string;
  related_characters: string[];
  related_factions: string[];
  related_scene: string;
  tone_tags: string[];
  explanation: string;
  usage_context: string;
  suitability: string[];
  risk_note: string;
  source_type: string;
  canon_level: string;
  confidence: string;
  source_note: string;
}

export interface Option {
  id: string;
  text: string;
  mbti_effects: MBTIEffects;
  personality_tag_effects: string[];
  faction_affinity_effects: Record<string, number>;
  meme_affinity_effects: string[];
  score_weight: number;
}

export interface Question {
  id: string;
  order: number;
  title: string;
  scenario: string;
  question: string;
  options: Option[];
}

export interface Archetype {
  id: string;
  name: string;
  description: string;
  mbti_core: string[];
  key_traits: string[];
}

export interface Faction {
  id: string;
  name: string;
  display_name: string;
  summary: string;
  tone_tags: string[];
  style_tags: string[];
  role_in_world: string;
  common_player_impression: string;
}

export interface QuizResult {
  mbti: string;
  scores: MBTIAxisWeights;
  character: Character;
  archetype: Archetype | null;
  faction_affinity: string;
  meme_tags: string[];
}
