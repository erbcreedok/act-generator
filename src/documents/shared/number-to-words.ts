import { ru } from 'n2words'

export function amountToWords(amount: number): string {
	return ru(Math.floor(amount))
}
