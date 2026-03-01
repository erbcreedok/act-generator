import { forwardRef } from 'react'
import type { CSSProperties } from 'react'
import type { ReportData } from '../../types/report'
import { formatAmount } from '../shared/format-utils'
import { amountToWords } from '../shared/number-to-words'

// ── style helpers ────────────────────────────────────────────────────────────

const PAGE: CSSProperties = {
	width: '210mm',
	minHeight: '297mm',
	padding: '15mm 20mm 20mm 25mm',
	fontFamily: 'Arial, sans-serif',
	fontSize: '10.5pt',
	lineHeight: '1.5',
	backgroundColor: '#fff',
	boxSizing: 'border-box',
	color: '#000',
}

const T: CSSProperties = { width: '100%', borderCollapse: 'collapse' as const }

const c = (extra: CSSProperties = {}): CSSProperties => ({
	border: '1px solid #000',
	padding: '5px 8px',
	verticalAlign: 'top',
	...extra,
})

const bold: CSSProperties = { fontWeight: 'bold' }
const center: CSSProperties = { textAlign: 'center' }
const justify: CSSProperties = { textAlign: 'justify' }

// ── component ─────────────────────────────────────────────────────────────────

export const ReportDocument = forwardRef<HTMLDivElement, { data: ReportData }>(
	function ReportDocument({ data }, ref) {
		const grossWords = amountToWords(data.grossAmount)
		const netWords = amountToWords(data.netAmount)

		return (
			<div ref={ref} style={PAGE}>
				{/* ── Header box (top right) ── */}
				<div
					style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10mm' }}
				>
					<table style={{ ...T, width: '58%', fontSize: '9.5pt' }}>
						<tbody>
							<tr>
								<td colSpan={3} style={c({ ...bold, ...center, padding: '5px 8px' })}>
									ПРИЛОЖЕНИЕ К ДОГОВОРУ ВОЗМЕЗДНОГО ОКАЗАНИЯ
									<br />
									УСЛУГ №&nbsp;&nbsp;{data.contractNumber}
								</td>
							</tr>
							<tr>
								<td style={c({ ...center, width: '22%' })}>
									№&nbsp;{data.appendixNumber}
								</td>
								<td style={c({ ...center, width: '50%' })}>{data.appendixDate}</td>
								<td style={c({ ...center, width: '28%' })}>г.&nbsp;{data.city}</td>
							</tr>
							<tr>
								<td colSpan={3} style={c(center)}>
									{data.contractorHeaderName}
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* ── Main title ── */}
				<div style={{ ...center, ...bold, marginBottom: '2px' }}>
					Отчет об объеме оказанных Услуг №{data.reportNumber} от {data.reportDate}
				</div>
				<div style={{ ...center, marginBottom: '14px' }}>
					к Договору возмездного оказания услуг № {data.contractNumber} (далее&nbsp;-&nbsp;
					{"\"Договор\""})
				</div>

				{/* ── Preamble ── */}
				<p style={{ ...justify, marginBottom: '12px', textIndent: '12.7mm' }}>
					<b>{data.customerFullName}</b>, именуемое в дальнейшем{' '}
					<b>«Заказчик»</b>, в лице {data.customerRepresentativeFull}, действующего на
					основании Устава, с одной стороны, и{' '}
					<b>
						{data.contractorCitizenship}&nbsp;{data.contractorFullName}
					</b>
					, ИИН {data.contractorIin}, именуемый(-ая) в дальнейшем{' '}
					<b>«Исполнитель»</b>, с другой стороны, составили настоящий Отчет (далее&nbsp;-&nbsp;
					{"\"Отчет\""}) о нижеследующем:
				</p>

				{/* ── Item 1: period + services ── */}
				<div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
					<div style={{ minWidth: '18px', fontWeight: 'normal' }}>1.</div>
					<div style={{ flex: 1 }}>
						<p style={{ ...justify, marginBottom: '8px' }}>
							Исполнитель в период с {data.periodStart} по {data.periodEnd} включительно оказал
							Заказчику следующие услуги по Заказу №{data.orderNumber} от {data.orderDate}{' '}
							(далее&nbsp;-&nbsp;«Услуги»):
						</p>

						<table style={{ ...T, fontSize: '10pt' }}>
							<thead>
								<tr>
									<th style={c({ ...bold, ...center, width: '36px' })}>№</th>
									<th style={c({ ...bold, ...center })}>
										Наименование Услуги /{'\n'}Описание Услуги
									</th>
									<th style={c({ ...bold, ...center, width: '38%' })}>
										Каким образом результаты Услуги переданы Заказчику
									</th>
								</tr>
							</thead>
							<tbody>
								{data.services.map((svc, idx) => (
									<tr key={idx}>
										<td style={c(center)}>{idx + 1}</td>
										<td style={c({ whiteSpace: 'pre-line' as const })}>{svc.name}</td>
										<td style={c(center)}>{svc.deliveryMethod}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* ── Item 2: gross amount ── */}
				<div
					style={{
						display: 'flex',
						gap: '8px',
						marginBottom: '12px',
						...justify,
					}}
				>
					<div style={{ minWidth: '18px' }}>2.</div>
					<div style={{ flex: 1 }}>
						Общий размер Вознаграждения Исполнителя за Услуги, указанные в настоящем Отчете, до
						удержания налогов, взносов, отчислений и иных обязательных платежей,
						предусмотренных законодательством Республики Казахстан, составляет сумму в размере{' '}
						<b>
							{formatAmount(data.grossAmount)} ({grossWords}) тенге
						</b>
						.
					</div>
				</div>

				{/* ── Item 3: net amount ── */}
				<div
					style={{
						display: 'flex',
						gap: '8px',
						marginBottom: '24px',
						...justify,
					}}
				>
					<div style={{ minWidth: '18px' }}>3.</div>
					<div style={{ flex: 1 }}>
						Итого общий размер Вознаграждения Исполнителя за Услуги, указанные в настоящем
						Отчете, после удержания налогов, взносов, отчислений и иных обязательных платежей,
						предусмотренных законодательством Республики Казахстан, составляет сумму в размере{' '}
						<b>
							{formatAmount(data.netAmount)} ({netWords}) тенге
						</b>
						.
					</div>
				</div>

				{/* ── Signatures ── */}
				<div style={{ display: 'flex', gap: '32px', marginTop: '8px' }}>
					{/* Заказчик */}
					<div style={{ flex: 1 }}>
						<div style={bold}>Заказчик:</div>
						<div style={{ ...bold, marginBottom: '4px' }}>{data.customerShortName}</div>
						<div>
							<b>{data.customerPosition}</b>
						</div>
						<div style={{ fontSize: '8.5pt', color: '#555', marginBottom: '16px' }}>
							(должность)
						</div>
						<div
							style={{
								display: 'flex',
								alignItems: 'flex-end',
								gap: '4px',
								marginBottom: '2px',
							}}
						>
							<div style={{ flex: 1, borderBottom: '1px solid #000', height: '20px' }}></div>
							<div style={{ paddingBottom: '2px' }}>/</div>
							<div style={{ flex: 1 }}>
								<div style={{ ...bold, textAlign: 'center' }}>
									{data.customerRepresentativeShort}
								</div>
							</div>
						</div>
						<div
							style={{
								display: 'flex',
								fontSize: '8pt',
								color: '#555',
							}}
						>
							<div style={{ flex: 1, textAlign: 'center' }}>(подпись)</div>
							<div style={{ width: '12px' }}></div>
							<div style={{ flex: 1, textAlign: 'center' }}>(ФИО)</div>
						</div>
						<div style={{ ...bold, marginTop: '12px' }}>М.П.</div>
					</div>

					{/* Исполнитель */}
					<div style={{ flex: 1 }}>
						<div style={bold}>Исполнитель:</div>
						<div style={{ ...bold, marginBottom: '20px' }}>{data.contractorFullName}</div>
						<div
							style={{
								display: 'flex',
								alignItems: 'flex-end',
								gap: '4px',
								marginBottom: '2px',
							}}
						>
							<div style={{ flex: 1, borderBottom: '1px solid #000', height: '20px' }}></div>
							<div style={{ paddingBottom: '2px' }}>/</div>
							<div style={{ flex: 1 }}></div>
						</div>
						<div
							style={{
								display: 'flex',
								fontSize: '8pt',
								color: '#555',
							}}
						>
							<div style={{ flex: 1, textAlign: 'center' }}>(подпись)</div>
							<div style={{ width: '12px' }}></div>
							<div style={{ flex: 1, textAlign: 'center' }}>(ФИО)</div>
						</div>
					</div>
				</div>

				{/* ── Page number ── */}
				<div style={{ ...center, marginTop: '20px', fontSize: '10pt' }}>1</div>
			</div>
		)
	}
)
