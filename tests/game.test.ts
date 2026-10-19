import {describe,it,expect} from 'vitest';
import {createDeck,isSelectable,nextDifficulty,pairCount,randomFromSeed} from '../src/game';
describe('PS09 game rules',()=>{
 it('starts with a 4x4 grid of eight pairs',()=>{const d=createDeck('Explorer',42);expect(d).toHaveLength(16);expect(new Set(d.map(x=>x.symbol)).size).toBe(8);expect(d.every(x=>d.filter(y=>y.symbol===x.symbol).length===2)).toBe(true);});
 it('seeded shuffle is reproducible',()=>{expect(createDeck('Explorer',42)).toEqual(createDeck('Explorer',42));expect(createDeck('Explorer',42)).not.toEqual(createDeck('Explorer',43));expect(randomFromSeed(3)()).toBe(randomFromSeed(3)());});
 it('expert mode adds two pairs',()=>{expect(pairCount('Expert')).toBe(10);expect(createDeck('Expert',2)).toHaveLength(20);});
 it('rejects third click while resolving two cards',()=>{const c=createDeck('Explorer',1)[0];expect(isSelectable(c,[5,6],true)).toBe(false);expect(isSelectable(c,[5,6],false)).toBe(false);});
 it('rejects repeat clicks and already matched cards',()=>{const c=createDeck('Explorer',1)[0];expect(isSelectable(c,[c.id],false)).toBe(false);expect(isSelectable({...c,matched:true},[],false)).toBe(false);});
 it('promotes only when both Explorer thresholds are met',()=>{expect(nextDifficulty('Explorer',14,90).next).toBe('Expert');expect(nextDifficulty('Explorer',15,80).next).toBe('Explorer');expect(nextDifficulty('Explorer',12,91).next).toBe('Explorer');});
 it('demotes Expert on either exceeded threshold',()=>{expect(nextDifficulty('Expert',29,90).next).toBe('Explorer');expect(nextDifficulty('Expert',20,181).next).toBe('Explorer');expect(nextDifficulty('Expert',28,180).next).toBe('Expert');});
 it('provides an explanation for all transitions',()=>{for(const level of ['Explorer','Expert'] as const)expect(nextDifficulty(level,12,70).reason.length).toBeGreaterThan(20);});
});
