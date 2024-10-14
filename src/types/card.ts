export interface Card {
  id: string
  name: string
  type: string
  subtype: string
  inkwell: number  // This is the 'ink' cost
  strength?: number
  willpower?: number
  lore?: number
  image: string
  text?: string
  flavor?: string  // This is the 'flavor_text'
  color: string
  rarity: string
  set: string
  number: string
  artist: string
}
