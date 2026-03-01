import { forwardRef } from 'react'
import type { CSSProperties } from 'react'
import type { AvrData } from '../../types/avr'
import { formatAmount, calcTotal } from '../shared/format-utils'

// ── style helpers ────────────────────────────────────────────────────────────

const PAGE: CSSProperties = {
	width: '210mm',
	minHeight: '297mm',
	padding: '8mm 12mm 10mm 20mm',
	fontFamily: 'Arial, sans-serif',
	fontSize: '7pt',
	lineHeight: '1.3',
	backgroundColor: '#fff',
	boxSizing: 'border-box',
	color: '#000',
}

const T: CSSProperties = { width: '100%', borderCollapse: 'collapse' as const }

const c = (extra: CSSProperties = {}): CSSProperties => ({
	border: '1px solid #000',
	padding: '2px 4px',
	verticalAlign: 'top',
	...extra,
})

const bold: CSSProperties = { fontWeight: 'bold' }
const center: CSSProperties = { textAlign: 'center' }
const right: CSSProperties = { textAlign: 'right' }

// ── component ─────────────────────────────────────────────────────────────────

export const AvrDocument = forwardRef<HTMLDivElement, { data: AvrData }>(function AvrDocument(
	{ data },
	ref
) {
	const grandTotal = data.services.reduce((s, i) => s + calcTotal(i.quantity, i.pricePerUnit), 0)
	const totalQty = data.services.reduce((s, i) => s + i.quantity, 0)

	return (
		<div ref={ref} style={PAGE}>
			{/* ── Приложение 50 / Форма Р-1 ── */}
			<div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3mm' }}>
				<div style={{ textAlign: 'right', fontSize: '6pt', lineHeight: '1.5' }}>
					<div>Приложение 50</div>
					<div>к приказу Министра финансов</div>
					<div>Республики Казахстан</div>
					<div>от 20 декабря 2012 года № 562</div>
					<div style={bold}>Форма Р-1</div>
				</div>
			</div>

			{/* ── Info table: Заказчик / Исполнитель / Договор ── */}
			<table style={T}>
				<colgroup>
					<col style={{ width: '58px' }} />
					<col />
					<col style={{ width: '78px' }} />
				</colgroup>
				<tbody>
					<tr>
						<td style={c()}></td>
						<td style={c()}></td>
						<td style={c({ ...center, ...bold })}>ИИН/БИН</td>
					</tr>
					<tr>
						<td style={c(bold)}>Заказчик</td>
						<td style={c()}>{data.customerName}</td>
						<td style={c(center)}>{data.customerBin}</td>
					</tr>
					<tr>
						<td style={c()}></td>
						<td
							colSpan={2}
							style={c({ fontSize: '5.5pt', color: '#555', fontStyle: 'italic' })}
						>
							полное наименование, адрес, данные о средствах связи
						</td>
					</tr>
					<tr>
						<td style={c(bold)}>Исполнитель</td>
						<td style={c()}>{data.contractorName}</td>
						<td style={c(center)}>{data.contractorIin}</td>
					</tr>
					<tr>
						<td style={c()}></td>
						<td
							colSpan={2}
							style={c({ fontSize: '5.5pt', color: '#555', fontStyle: 'italic' })}
						>
							полное наименование, адрес, данные о средствах связи
						</td>
					</tr>
					<tr>
						<td style={c(bold)}>Договор (контракт)</td>
						<td colSpan={2} style={c()}>
							Договор №{data.contractNumber}
						</td>
					</tr>
				</tbody>
			</table>

			{/* ── Title block ── */}
			<table style={T}>
				<colgroup>
					<col style={{ width: '62%' }} />
					<col />
					<col />
				</colgroup>
				<tbody>
					<tr>
						<td
							style={c({
								...bold,
								...center,
								fontSize: '8.5pt',
								padding: '4px',
								whiteSpace: 'pre-line' as const,
							})}
						>
							{'АКТ ВЫПОЛНЕННЫХ РАБОТ\n(ОКАЗАННЫХ УСЛУГ)'}
						</td>
						<td style={c({ padding: 0 })}>
							<div
								style={{
									...center,
									fontSize: '6pt',
									padding: '1px 3px',
									borderBottom: '1px solid #000',
								}}
							>
								Номер документа
							</div>
							<div style={{ ...center, ...bold, padding: '1px 3px' }}>{data.documentNumber}</div>
						</td>
						<td style={c({ padding: 0 })}>
							<div
								style={{
									...center,
									fontSize: '6pt',
									padding: '1px 3px',
									borderBottom: '1px solid #000',
								}}
							>
								Дата составления
							</div>
							<div style={{ ...center, ...bold, padding: '1px 3px' }}>{data.documentDate}</div>
						</td>
					</tr>
				</tbody>
			</table>

			{/* ── Services table ── */}
			<table style={T}>
				<thead>
					<tr>
						<th
							rowSpan={2}
							style={c({ ...bold, ...center, width: '22px', fontSize: '6.5pt' })}
						>
							Номер по порядку
						</th>
						<th rowSpan={2} style={c({ ...bold, ...center, fontSize: '6.5pt' })}>
							Наименование работ (услуг) (в разрезе их подвидов в соответствии с технической
							спецификацией, заданием, графиком выполнения работ (услуг) при их наличии)
						</th>
						<th rowSpan={2} style={c({ ...bold, ...center, fontSize: '6.5pt' })}>
							Сведения об отчете о научных исследованиях, маркетинговых, консультационных и прочих
							услугах (дата, номер, количество страниц) (при их наличии)
						</th>
						<th
							rowSpan={2}
							style={c({ ...bold, ...center, width: '38px', fontSize: '6.5pt' })}
						>
							Единица измерения
						</th>
						<th colSpan={3} style={c({ ...bold, ...center, fontSize: '6.5pt' })}>
							Выполнено работ (оказано услуг)
						</th>
					</tr>
					<tr>
						<th style={c({ ...bold, ...center, width: '30px', fontSize: '6.5pt' })}>
							количество
						</th>
						<th style={c({ ...bold, ...center, width: '54px', fontSize: '6.5pt' })}>
							цена за единицу
						</th>
						<th style={c({ ...bold, ...center, width: '54px', fontSize: '6.5pt' })}>стоимость</th>
					</tr>
					<tr>
						{['1', '2', '3', '4', '5', '6', '7'].map((n) => (
							<th
								key={n}
								style={c({ ...center, fontSize: '6.5pt', backgroundColor: '#f0f0f0' })}
							>
								{n}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.services.map((item, idx) => (
						<tr key={idx}>
							<td style={c(center)}>{idx + 1}</td>
							<td style={c({ whiteSpace: 'pre-line' as const })}>{item.name}</td>
							<td style={c({ fontSize: '5.5pt' })}>{item.reportLinks ?? ''}</td>
							<td style={c(center)}>{item.unit}</td>
							<td style={c(center)}>{item.quantity}</td>
							<td style={c(right)}>{formatAmount(item.pricePerUnit)}</td>
							<td style={c(right)}>
								{formatAmount(calcTotal(item.quantity, item.pricePerUnit))}
							</td>
						</tr>
					))}
					<tr style={{ backgroundColor: '#f5f5f5' }}>
						<td style={c(center)}></td>
						<td style={c(bold)}>Итого</td>
						<td style={c()}></td>
						<td style={c()}></td>
						<td style={c({ ...center, ...bold })}>{totalQty}</td>
						<td style={c({ ...center, ...bold })}>х</td>
						<td style={c({ ...right, ...bold })}>{formatAmount(grandTotal)}</td>
					</tr>
				</tbody>
			</table>

			{/* ── Notes ── */}
			<table style={T}>
				<tbody>
					<tr>
						<td style={c({ fontSize: '6.5pt' })}>
							Сведения об использовании запасов, полученных от заказчика
						</td>
					</tr>
					<tr>
						<td style={c({ fontSize: '6.5pt' })}>
							Приложение: Перечень документации, в том числе отчет(ы) о маркетинговых, научных
							исследованиях, консультационных и прочих услугах (обязательны при его (их) наличии) на{' '}
							{data.appendixPages ?? '____________'} страниц
						</td>
					</tr>
				</tbody>
			</table>

			{/* ── Signature row ── */}
			<table style={T}>
				<tbody>
					<tr>
						<td style={c({ width: '90px', verticalAlign: 'middle' })}>
							<div style={bold}>{data.contractorSignatureName}</div>
						</td>
						<td style={c({ padding: '4px 6px' })}>
							<div style={{ display: 'flex', gap: '12px' }}>
								{/* Сдал */}
								<div style={{ flex: 1 }}>
									<div style={{ ...bold, marginBottom: '6px' }}>Сдал (Исполнитель)</div>
									<div
										style={{
											display: 'flex',
											alignItems: 'flex-end',
											gap: '4px',
											marginTop: '4px',
										}}
									>
										<div style={{ flex: 1 }}>
											<div style={{ borderBottom: '1px solid #000', height: '14px' }}></div>
											<div style={{ fontSize: '5.5pt', color: '#555', marginTop: '1px' }}>
												подпись
											</div>
										</div>
										<div style={{ paddingBottom: '14px' }}>/</div>
										<div style={{ flex: 1 }}>
											<div style={{ borderBottom: '1px solid #000', height: '14px' }}></div>
											<div style={{ fontSize: '5.5pt', color: '#555', marginTop: '1px' }}>
												расшифровка подписи
											</div>
										</div>
									</div>
								</div>

								{/* Принял */}
								<div
									style={{ flex: 1, borderLeft: '1px solid #000', paddingLeft: '10px' }}
								>
									<div style={{ ...bold, marginBottom: '2px' }}>Принял (Заказчик)</div>
									<div style={{ fontSize: '6pt', color: '#555', marginBottom: '4px' }}>
										Дата подписания (принятия) работ (услуг)
									</div>
									<div
										style={{
											display: 'flex',
											alignItems: 'flex-end',
											gap: '4px',
										}}
									>
										<div style={{ flex: 1 }}>
											<div style={{ borderBottom: '1px solid #000', height: '14px' }}></div>
											<div style={{ fontSize: '5.5pt', color: '#555', marginTop: '1px' }}>
												должность
											</div>
										</div>
										<div style={{ paddingBottom: '14px' }}>/</div>
										<div style={{ flex: 1 }}>
											<div style={{ borderBottom: '1px solid #000', height: '14px' }}></div>
											<div style={{ fontSize: '5.5pt', color: '#555', marginTop: '1px' }}>
												подпись
											</div>
										</div>
										<div style={{ paddingBottom: '14px' }}>/</div>
										<div style={{ flex: 1 }}>
											<div style={{ ...bold, fontSize: '7pt', textAlign: 'right' }}>
												{data.customerSignatureName}
											</div>
											<div style={{ borderBottom: '1px solid #000', height: '14px' }}></div>
											<div style={{ fontSize: '5.5pt', color: '#555', marginTop: '1px' }}>
												расшифровка подписи
											</div>
										</div>
									</div>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>

			{/* ── М.П. row ── */}
			<table style={T}>
				<colgroup>
					<col style={{ width: '40px' }} />
					<col />
					<col style={{ width: '40px' }} />
				</colgroup>
				<tbody>
					<tr>
						<td style={c()}>
							<div style={{ fontWeight: 'bold', fontSize: '8.5pt' }}>М.П.</div>
						</td>
						<td style={c({ ...center, fontSize: '6.5pt' })}>
							<div style={{ marginBottom: '4px' }}>
								Дата подписания (принятия) работ (услуг)
							</div>
							<div style={bold}>{data.signDate}</div>
						</td>
						<td style={c()}>
							<div style={{ fontWeight: 'bold', fontSize: '8.5pt' }}>М.П.</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
})
