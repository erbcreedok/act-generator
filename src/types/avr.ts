export type AvrServiceItem = {
	name: string
	reportLinks?: string
	unit: string
	quantity: number
	pricePerUnit: number
}

export type AvrData = {
	customerName: string
	customerBin: string
	contractorName: string
	contractorIin: string
	contractNumber: string
	documentNumber: string
	documentDate: string
	services: AvrServiceItem[]
	contractorSignatureName: string
	customerSignatureName: string
	customerPosition: string
	signDate: string
	appendixPages?: string
}
