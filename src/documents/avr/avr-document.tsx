import { forwardRef } from 'react'
import type { CSSProperties } from 'react'
import type { AvrData } from '../../types/avr'
import { formatAmount, calcTotal } from '../shared/format-utils'

// ── style helpers ────────────────────────────────────────────────────────────

const PAGE: CSSProperties = {
	width: '210mm',
	minHeight: '297mm',
	padding: '10mm 10mm 10mm 10mm',
	fontFamily: 'Arial, sans-serif',
	fontSize: '7pt',
	lineHeight: '1.2',
	backgroundColor: '#fff',
	boxSizing: 'border-box',
	color: '#000',
	position: 'relative',
}

// Common table styles
const tableStyle: CSSProperties = {
	width: '100%',
	borderCollapse: 'collapse',
}

// Borders
const borderBottom: CSSProperties = { borderBottom: '1px solid #000' }
const borderAll: CSSProperties = { border: '1px solid #000' }

const bold: CSSProperties = { fontWeight: 'bold' }
const center: CSSProperties = { textAlign: 'center' }

export const AvrDocument = forwardRef<HTMLDivElement, { data: AvrData }>(function AvrDocument(
	{ data },
	ref
) {
	const grandTotal = data.services.reduce((s, i) => s + calcTotal(i.quantity, i.pricePerUnit), 0)

	return (
		<div ref={ref} style={PAGE}>
			{/* ── Top Right Header ── */}
			<div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '4mm' }}>
				<div style={{ textAlign: 'right', fontSize: '6pt', lineHeight: '1.3' }}>
					<div>Приложение 50</div>
					<div>к приказу Министра финансов</div>
					<div>Республики Казахстан</div>
					<div>от 20 декабря 2012 года № 562</div>
					<div style={{ ...bold, marginTop: '2px' }}>Форма Р-1</div>
				</div>
			</div>

			{/* ── Info Block (Table-based for alignment) ── */}
			<table style={{ ...tableStyle, marginBottom: '2mm' }}>
				<colgroup>
					<col style={{ width: '100px' }} /><col /><col style={{ width: '90px' }} />
				</colgroup>
				<tbody>
					{/* Header Row for IIN/BIN */}
					<tr>
						<td colSpan={2}></td>
						<td
							style={{
								...borderAll,
								...center,
								fontWeight: 'bold',
								fontSize: '6pt',
								background: '#f5f5f5',
							}}
						>
							ИИН/БИН
						</td>
					</tr>

					{/* Customer Row */}
					<tr>
						<td style={{ ...bold, verticalAlign: 'bottom', paddingBottom: '2px' }}>Заказчик</td>
						<td style={{ ...borderBottom, verticalAlign: 'bottom', padding: '0 5px 2px 5px' }}>
							{data.customerName}
						</td>
						<td style={{ ...borderAll, ...center, verticalAlign: 'middle', padding: '4px' }}>
							{data.customerBin}
						</td>
					</tr>

					{/* Customer Sub-label */}
					<tr>
						<td></td>
						<td
							style={{
								fontSize: '5pt',
								textAlign: 'center',
								verticalAlign: 'top',
								color: '#555',
							}}
						>
							полное наименование, адрес, данные о средствах связи
						</td>
						<td></td>
					</tr>

					{/* Contractor Row */}
					<tr>
						<td style={{ ...bold, verticalAlign: 'bottom', paddingBottom: '2px' }}>Исполнитель</td>
						<td style={{ ...borderBottom, verticalAlign: 'bottom', padding: '0 5px 2px 5px' }}>
							{data.contractorName}
						</td>
						<td style={{ ...borderAll, ...center, verticalAlign: 'middle', padding: '4px' }}>
							{data.contractorIin}
						</td>
					</tr>

					{/* Contractor Sub-label */}
					<tr>
						<td></td>
						<td
							style={{
								fontSize: '5pt',
								textAlign: 'center',
								verticalAlign: 'top',
								color: '#555',
							}}
						>
							полное наименование, адрес, данные о средствах связи
						</td>
						<td></td>
					</tr>

					{/* Contract Row */}
					<tr>
						<td style={{ ...bold, verticalAlign: 'bottom', paddingBottom: '2px' }}>
							Договор (контракт)
						</td>
						<td style={{ ...borderBottom, verticalAlign: 'bottom', padding: '0 5px 2px 5px' }}>
							Договор №{data.contractNumber}
						</td>
						<td style={{ border: 'none' }}></td>
					</tr>
				</tbody>
			</table>

			{/* ── Main Title Block ── */}
			<div style={{ textAlign: 'center', margin: '20px 0' }}>
				<div style={{ ...bold, fontSize: '9pt', marginBottom: '5px' }}>
					АКТ ВЫПОЛНЕННЫХ РАБОТ (ОКАЗАННЫХ УСЛУГ)
				</div>

				{/* Document Number / Date Table */}
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<table style={{ borderCollapse: 'collapse', width: 'auto' }}>
						<tbody>
							<tr>
								<td
									style={{
										...borderAll,
										fontSize: '6pt',
										padding: '2px 8px',
										textAlign: 'center',
										background: '#fff',
									}}
								>
									Номер документа
								</td>
								<td
									style={{
										...borderAll,
										fontSize: '6pt',
										padding: '2px 8px',
										textAlign: 'center',
										background: '#fff',
									}}
								>
									Дата составления
								</td>
							</tr>
							<tr>
								<td
									style={{
										...borderAll,
										fontWeight: 'bold',
										padding: '4px 8px',
										textAlign: 'center',
									}}
								>
									{data.documentNumber}
								</td>
								<td
									style={{
										...borderAll,
										fontWeight: 'bold',
										padding: '4px 8px',
										textAlign: 'center',
									}}
								>
									{data.documentDate}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			{/* ── Services Table ── */}
			<table
				style={{
					...tableStyle,
					border: '1px solid #000',
					marginBottom: '5mm',
					fontSize: '6.5pt',
				}}
			>
				<thead>
					<tr>
						<th rowSpan={2} style={{ ...borderAll, width: '30px' }}>
							Номер по порядку
						</th>
						<th rowSpan={2} style={{ ...borderAll }}>
							Наименование работ (услуг) (в разрезе их подвидов в соответствии с технической
							спецификацией, заданием, графиком выполнения работ (услуг) при их наличии)
						</th>
						<th rowSpan={2} style={{ ...borderAll, width: '20%' }}>
							Сведения об отчете о научных исследованиях, маркетинговых, консультационных и прочих
							услугах (дата, номер, количество страниц) (при их наличии)
						</th>
						<th rowSpan={2} style={{ ...borderAll, width: '50px' }}>
							Единица измерения
						</th>
						<th colSpan={3} style={{ ...borderAll }}>
							Выполнено работ (оказано услуг)
						</th>
					</tr>
					<tr>
						<th style={{ ...borderAll, width: '60px' }}>количество</th>
						<th style={{ ...borderAll, width: '80px' }}>цена за единицу</th>
						<th style={{ ...borderAll, width: '80px' }}>стоимость</th>
					</tr>
					<tr>
						{[1, 2, 3, 4, 5, 6, 7].map((n) => (
							<th
								key={n}
								style={{ ...borderAll, background: '#f5f5f5', fontWeight: 'normal' }}
							>
								{n}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.services.map((item, idx) => (
						<tr key={idx}>
							<td style={{ ...borderAll, textAlign: 'center' }}>{idx + 1}</td>
							<td style={{ ...borderAll, padding: '4px', whiteSpace: 'pre-line' }}>
								{item.name}
							</td>
							<td style={{ ...borderAll, padding: '4px' }}>{item.reportLinks}</td>
							<td style={{ ...borderAll, textAlign: 'center' }}>{item.unit}</td>
							<td style={{ ...borderAll, textAlign: 'center' }}>{item.quantity}</td>
							<td style={{ ...borderAll, textAlign: 'right', padding: '4px' }}>
								{formatAmount(item.pricePerUnit)}
							</td>
							<td style={{ ...borderAll, textAlign: 'right', padding: '4px' }}>
								{formatAmount(calcTotal(item.quantity, item.pricePerUnit))}
							</td>
						</tr>
					))}
					{/* Total Row */}
					<tr>
						<td
							colSpan={5}
							style={{
								border: '1px solid #000',
								borderRight: 'none',
								textAlign: 'right',
								padding: '4px',
								fontWeight: 'bold',
							}}
						>
							Итого
						</td>
						<td style={{ ...borderAll, textAlign: 'center', fontWeight: 'bold' }}>x</td>
						<td
							style={{
								...borderAll,
								textAlign: 'right',
								padding: '4px',
								fontWeight: 'bold',
							}}
						>
							{formatAmount(grandTotal)}
						</td>
					</tr>
				</tbody>
			</table>

			{/* ── Footer Info ── */}
			<div style={{ marginBottom: '5mm', fontSize: '7pt' }}>
				<div style={{ display: 'flex', marginBottom: '5px' }}>
					<div style={{ marginRight: '10px' }}>
						Сведения об использовании запасов, полученных от заказчика
					</div>
					<div style={{ flex: 1, borderBottom: '1px solid #000' }}></div>
				</div>

				<div style={{ display: 'flex', alignItems: 'flex-end' }}>
					<div style={{ marginRight: '5px' }}>
						Приложение: Перечень документации, в том числе отчет(ы) о маркетинговых, научных
						исследованиях, консультационных и прочих услугах (обязательны при его (их) наличии)
						на
					</div>
					<div
						style={{
							width: '40px',
							borderBottom: '1px solid #000',
							textAlign: 'center',
						}}
					>
						{data.appendixPages}
					</div>
					<div style={{ marginLeft: '5px' }}>страниц</div>
				</div>
				<div style={{ borderBottom: '1px solid #000', marginTop: '1px' }}></div>
			</div>

			{/* ── Signatures ── */}
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginTop: '10mm',
					alignItems: 'flex-start',
				}}
			>
				{/* Contractor Side (Left) */}
				<div style={{ width: '45%' }}>
					<div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '2px' }}>
						<div style={{ fontWeight: 'bold', width: '100px' }}>Сдал (Исполнитель)</div>
						<div style={{ flex: 1, borderBottom: '1px solid #000', margin: '0 10px' }}></div>
						<div style={{ fontWeight: 'bold', minWidth: '80px', textAlign: 'center' }}>
							{data.contractorSignatureName}
						</div>
					</div>
					<div style={{ display: 'flex', fontSize: '5pt', color: '#555' }}>
						<div style={{ width: '100px' }}></div>
						<div style={{ flex: 1, textAlign: 'center' }}>подпись</div>
						<div style={{ minWidth: '80px', textAlign: 'center' }}>расшифровка подписи</div>
					</div>
					<div style={{ fontWeight: 'bold', marginTop: '15px', marginLeft: '20px' }}>М.П.</div>
				</div>

				{/* Customer Side (Right) */}
				<div style={{ width: '45%' }}>
					<div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '2px' }}>
						<div style={{ fontWeight: 'bold', marginRight: '5px' }}>Принял (Заказчик)</div>

						{/* Position line */}
						<div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
							<div style={{ borderBottom: '1px solid #000' }}></div>
							<div style={{ fontSize: '5pt', color: '#555', textAlign: 'center' }}>
								должность
							</div>
						</div>

						{/* Signature line */}
						<div
							style={{
								width: '60px',
								display: 'flex',
								flexDirection: 'column',
								marginLeft: '5px',
							}}
						>
							<div style={{ borderBottom: '1px solid #000' }}></div>
							<div style={{ fontSize: '5pt', color: '#555', textAlign: 'center' }}>
								подпись
							</div>
						</div>

						{/* Name */}
						<div
							style={{
								minWidth: '80px',
								display: 'flex',
								flexDirection: 'column',
								marginLeft: '5px',
							}}
						>
							<div
								style={{
									borderBottom: '1px solid #000',
									textAlign: 'center',
									fontWeight: 'bold',
								}}
							>
								{data.customerSignatureName}
							</div>
							<div style={{ fontSize: '5pt', color: '#555', textAlign: 'center' }}>
								расшифровка подписи
							</div>
						</div>
					</div>

					<div style={{ display: 'flex', alignItems: 'flex-end', marginTop: '15px' }}>
						<div style={{ flex: 1 }}></div>
						<div style={{ marginRight: '5px' }}>
							Дата подписания (принятия) работ (услуг)
						</div>
						<div
							style={{
								width: '80px',
								borderBottom: '1px solid #000',
								textAlign: 'center',
								fontWeight: 'bold',
							}}
						>
							{data.signDate}
						</div>
					</div>
					<div
						style={{
							fontWeight: 'bold',
							marginTop: '5px',
							textAlign: 'right',
							marginRight: '50px',
						}}
					>
						М.П.
					</div>
				</div>
			</div>

			{/* Bottom Date Marker matching screenshot */}
			<div style={{ textAlign: 'center', marginTop: '40px', fontSize: '6pt' }}>2/28/2026</div>
		</div>
	)
})
