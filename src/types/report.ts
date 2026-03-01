export type ReportServiceItem = {
	name: string
	deliveryMethod: string
}

export type ReportData = {
	// Header box (top-right)
	appendixNumber: string // "2"
	contractNumber: string // "ТМ/Д/051225-1"
	appendixDate: string // "«12» НОЯБРЯ 2025 Г."
	city: string // "АЛМАТЫ"
	contractorHeaderName: string // "Сыздық Ербол Нуржанұлы"

	// Report title
	reportNumber: string // "2"
	reportDate: string // "«28» февраля 2026г."

	// Customer info
	customerFullName: string // "Товарищество с ограниченной ответственностью «Tekmates»"
	customerShortName: string // "ТОО «Tekmates»"
	customerRepresentativeFull: string // "Директора Какиева Дамира Утебековича"
	customerRepresentativeShort: string // "Д. Какиев"
	customerPosition: string // "Директор"

	// Contractor info
	contractorCitizenship: string // "Гражданин(-ка) Республики Казахстан"
	contractorFullName: string // "Сыздық Ербол Нуржанұлы"
	contractorIin: string // "961105351374"

	// Period & order
	periodStart: string // "«1» февраля 2026 г."
	periodEnd: string // "«28» февраля 2026 г."
	orderNumber: string // "2"
	orderDate: string // "«1» февраля 2026 г."

	// Services
	services: ReportServiceItem[]

	// Amounts
	grossAmount: number // 1_280_050
	netAmount: number // 1_000_000
}
