export type Difficulty = 'Explorer' | 'Expert';
export type Card = { id: number; symbol: string; matched: boolean };
export type Session = { id: string; difficulty: Difficulty; moves: number; seconds: number; pairs: number; next: Difficulty; reason: string; completedAt: string };
export const ICONS = ['🍓','🌙','🦋','🌻','🎧','🚀','🐼','🍀','🎮','🪐','🍩','⚡'];
export const pairCount = (difficulty: Difficulty) => difficulty === 'Explorer' ? 8 : 10;
// Mulberry32: deterministic pseudo-random generator for repeatable test sessions.
export function randomFromSeed(seed: number): () => number { let a = seed >>> 0; return () => { a += 0x6D2B79F5; let t = a; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
export function createDeck(difficulty: Difficulty, seed: number): Card[] { const n = pairCount(difficulty); const rng = randomFromSeed(seed); const deck = ICONS.slice(0,n).flatMap((symbol,i) => [{id:i*2,symbol,matched:false},{id:i*2+1,symbol,matched:false}]); for(let i=deck.length-1;i>0;i--){const j=Math.floor(rng()*(i+1)); [deck[i],deck[j]]=[deck[j],deck[i]];} return deck; }
export function nextDifficulty(difficulty: Difficulty, moves: number, seconds: number): {next:Difficulty;reason:string} { if(difficulty==='Explorer' && moves<=14 && seconds<=90) return {next:'Expert',reason:'Great memory! You finished in 14 moves or fewer and within 90 seconds, so the next round adds two pairs.'}; if(difficulty==='Expert' && (moves>28 || seconds>180)) return {next:'Explorer',reason:'This round took more than 28 moves or 180 seconds. Next round returns to eight pairs for practice.'}; return {next:difficulty,reason:'Your performance is in the current difficulty range, so the next round stays at this level.'}; }
export function isSelectable(card: Card, flipped: number[], locked: boolean): boolean {return !locked && !card.matched && !flipped.includes(card.id) && flipped.length<2;}
export function getSessions(): Session[] {try {const value=JSON.parse(localStorage.getItem('mindmatch-sessions')||'[]'); return Array.isArray(value)?value:[];} catch{return [];}}
export function saveSession(session:Session):void {try{localStorage.setItem('mindmatch-sessions',JSON.stringify([session,...getSessions()].slice(0,20)));}catch{/* Storage can be disabled; gameplay still works. */}}
