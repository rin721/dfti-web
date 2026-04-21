import { MBTIAxisWeights, MBTIEffects, Character, QuizResult, Question, Option, Archetype } from '../types';

export const calculateMBTI = (answers: Option[]): MBTIAxisWeights => {
  const scores: MBTIAxisWeights = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  
  answers.forEach((opt) => {
    Object.entries(opt.mbti_effects).forEach(([axis, val]) => {
      if (axis in scores) {
        scores[axis as keyof MBTIAxisWeights] += (val as number) * opt.score_weight;
      }
    });
  });

  // Normalize scores to 0-1 range (relative)
  const normalize = (a: keyof MBTIAxisWeights, b: keyof MBTIAxisWeights) => {
    const total = scores[a] + scores[b] || 1;
    const ratioA = scores[a] / total;
    const ratioB = scores[b] / total;
    scores[a] = ratioA;
    scores[b] = ratioB;
  };

  normalize('E', 'I');
  normalize('S', 'N');
  normalize('T', 'F');
  normalize('J', 'P');

  return scores;
};

export const getMBTIDescriptor = (scores: MBTIAxisWeights): string => {
  const e_i = scores.E >= scores.I ? 'E' : 'I';
  const s_n = scores.S >= scores.N ? 'S' : 'N';
  const t_f = scores.T >= scores.F ? 'T' : 'F';
  const j_p = scores.J >= scores.P ? 'J' : 'P';
  return `${e_i}${s_n}${t_f}${j_p}`;
};

export const matchCharacter = (scores: MBTIAxisWeights, characters: Character[]): Character => {
  let bestMatch = characters[0];
  let minDistance = Infinity;

  characters.forEach((char) => {
    let distance = 0;
    // Euclidean distance across 8 dimensions
    Object.keys(scores).forEach((axis) => {
      const key = axis as keyof MBTIAxisWeights;
      distance += Math.pow(scores[key] - char.mbti_axis_weights[key], 2);
    });
    
    if (distance < minDistance) {
      minDistance = distance;
      bestMatch = char;
    }
  });

  return bestMatch;
};

export const getResult = (
  answers: Option[], 
  characters: Character[], 
  archetypes: Archetype[]
): QuizResult => {
  const scores = calculateMBTI(answers);
  const mbti = getMBTIDescriptor(scores);
  const character = matchCharacter(scores, characters);
  
  const matchedArchetype = archetypes.find(a => a.mbti_core.includes(mbti)) || null;

  // Simple faction affinity: sum from questions
  const factions: Record<string, number> = {};
  answers.forEach(a => {
    Object.entries(a.faction_affinity_effects).forEach(([f, val]) => {
      factions[f] = (factions[f] || 0) + val;
    });
  });
  const bestFaction = Object.entries(factions).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';

  // Meme synergy
  const memeTags = Array.from(new Set(answers.flatMap(a => a.meme_affinity_effects)));

  return {
    mbti,
    scores,
    character,
    archetype: matchedArchetype,
    faction_affinity: bestFaction,
    meme_tags: memeTags
  };
};
