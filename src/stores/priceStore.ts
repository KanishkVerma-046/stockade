import { atom } from 'nanostores';

export const $activeTick = atom<{ symbol: string; price: number } | null>(null);
