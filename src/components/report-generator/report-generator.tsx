import { useRef, useState } from 'react'
import { ReportDocument } from '../../documents/report'
import type { ReportData, ReportServiceItem } from '../../types'
import { Field, TextArea } from '../ui'
import { openInTab } from '../../utils/open-in-tab'
import styles from './report-generator.module.css'

const INITIAL_DATA: ReportData = {
	appendixNumber: '2',
	contractNumber: 'ТМ/Д/051225-1',
	appendixDate: '«12» НОЯБРЯ 2025 Г.',
	city: 'АЛМАТЫ',
	contractorHeaderName: 'Сыздық Ербол Нуржанұлы',

	reportNumber: '2',
	reportDate: '«28» февраля 2026г.',

	customerFullName: 'Товарищество с ограниченной ответственностью «Tekmates»',
	customerShortName: 'ТОО «Tekmates»',
	customerRepresentativeFull: 'Директора Какиева Дамира Утебековича',
	customerRepresentativeShort: 'Д. Какиев',
	customerPosition: 'Директор',

	contractorCitizenship: 'Гражданин(-ка) Республики Казахстан',
	contractorFullName: 'Сыздық Ербол Нуржанұлы',
	contractorIin: '961105351374',

	periodStart: '«1» февраля 2026 г.',
	periodEnd: '«28» февраля 2026 г.',
	orderNumber: '2',
	orderDate: '«1» февраля 2026 г.',

	services: [
		{
			name: 'Страница "Все лиды" для Руководителя ТМ\nСтраница "Мои лиды" для Менеджера ТМ\nМодули "Создание Лида", "Управление лидами"\nТаблицы редактируемых Лидов у руководителя\nРазличные рефакторинги и багфиксы',
			deliveryMethod: 'Электронно',
		},
	],

	grossAmount: 1_280_050,
	netAmount: 1_000_000,
}

const EMPTY_SERVICE: ReportServiceItem = { name: '', deliveryMethod: 'Электронно' }

export function ReportGenerator() {
	const [form, setForm] = useState<ReportData>(INITIAL_DATA)
	const docRef = useRef<HTMLDivElement>(null)

	const set = <K extends keyof ReportData>(key: K, value: ReportData[K]) =>
		setForm((prev) => ({ ...prev, [key]: value }))

	const setService = (idx: number, key: keyof ReportServiceItem, value: string) =>
		setForm((prev) => ({
			...prev,
			services: prev.services.map((s, i) => (i === idx ? { ...s, [key]: value } : s)),
		}))

	const addService = () =>
		setForm((prev) => ({ ...prev, services: [...prev.services, { ...EMPTY_SERVICE }] }))

	const removeService = (idx: number) =>
		setForm((prev) => ({ ...prev, services: prev.services.filter((_, i) => i !== idx) }))

	const handleOpenInTab = () => {
		if (docRef.current) {
			openInTab(
				docRef.current,
				`Отчет №${form.reportNumber} к Договору ${form.contractNumber}`
			)
		}
	}

	return (
		<div className={styles.wrap}>
			{/* ── LEFT: form ── */}
			<div className={styles.formCol}>
			<div className={styles.formScroll}>
				<section className={styles.section}>
					<h3 className={styles.sectionTitle}>Шапка документа</h3>
					<div className={styles.row3}>
						<Field
							label='Номер приложения'
							value={form.appendixNumber}
							onChange={(v) => set('appendixNumber', v)}
							placeholder='2'
						/>
						<Field
							label='Номер договора'
							value={form.contractNumber}
							onChange={(v) => set('contractNumber', v)}
							placeholder='ТМ/Д/051225-1'
						/>
						<Field
							label='Город'
							value={form.city}
							onChange={(v) => set('city', v)}
							placeholder='АЛМАТЫ'
						/>
					</div>
					<div className={styles.row2}>
						<Field
							label='Дата приложения'
							value={form.appendixDate}
							onChange={(v) => set('appendixDate', v)}
							placeholder='«12» НОЯБРЯ 2025 Г.'
						/>
						<Field
							label='ФИО исполнителя (шапка)'
							value={form.contractorHeaderName}
							onChange={(v) => set('contractorHeaderName', v)}
						/>
					</div>
				</section>

				<section className={styles.section}>
					<h3 className={styles.sectionTitle}>Отчет</h3>
					<div className={styles.row2}>
						<Field
							label='Номер отчета'
							value={form.reportNumber}
							onChange={(v) => set('reportNumber', v)}
							placeholder='2'
						/>
						<Field
							label='Дата отчета'
							value={form.reportDate}
							onChange={(v) => set('reportDate', v)}
							placeholder='«28» февраля 2026г.'
						/>
					</div>
					<div className={styles.row2}>
						<Field
							label='Период с'
							value={form.periodStart}
							onChange={(v) => set('periodStart', v)}
							placeholder='«1» февраля 2026 г.'
						/>
						<Field
							label='Период по'
							value={form.periodEnd}
							onChange={(v) => set('periodEnd', v)}
							placeholder='«28» февраля 2026 г.'
						/>
					</div>
					<div className={styles.row2}>
						<Field
							label='Номер заказа'
							value={form.orderNumber}
							onChange={(v) => set('orderNumber', v)}
							placeholder='2'
						/>
						<Field
							label='Дата заказа'
							value={form.orderDate}
							onChange={(v) => set('orderDate', v)}
							placeholder='«1» февраля 2026 г.'
						/>
					</div>
				</section>

				<section className={styles.section}>
					<h3 className={styles.sectionTitle}>Заказчик</h3>
					<TextArea
						label='Полное наименование'
						value={form.customerFullName}
						onChange={(v) => set('customerFullName', v)}
						rows={2}
					/>
					<Field
						label='Краткое название'
						value={form.customerShortName}
						onChange={(v) => set('customerShortName', v)}
						placeholder='ТОО «Tekmates»'
					/>
					<Field
						label='ФИО представителя (родительный падеж)'
						value={form.customerRepresentativeFull}
						onChange={(v) => set('customerRepresentativeFull', v)}
						placeholder='Директора Какиева Дамира Утебековича'
					/>
					<div className={styles.row2}>
						<Field
							label='Должность'
							value={form.customerPosition}
							onChange={(v) => set('customerPosition', v)}
							placeholder='Директор'
						/>
						<Field
							label='Подпись (краткое ФИО)'
							value={form.customerRepresentativeShort}
							onChange={(v) => set('customerRepresentativeShort', v)}
							placeholder='Д. Какиев'
						/>
					</div>
				</section>

				<section className={styles.section}>
					<h3 className={styles.sectionTitle}>Исполнитель</h3>
					<Field
						label='Гражданство / статус'
						value={form.contractorCitizenship}
						onChange={(v) => set('contractorCitizenship', v)}
						placeholder='Гражданин(-ка) Республики Казахстан'
					/>
					<div className={styles.row2}>
						<Field
							label='ФИО'
							value={form.contractorFullName}
							onChange={(v) => set('contractorFullName', v)}
						/>
						<Field
							label='ИИН'
							value={form.contractorIin}
							onChange={(v) => set('contractorIin', v)}
						/>
					</div>
				</section>

				<section className={styles.section}>
					<div className={styles.sectionHeaderRow}>
						<h3 className={styles.sectionTitle}>Услуги</h3>
						<button className={styles.addBtn} onClick={addService}>
							+ Добавить
						</button>
					</div>

					{form.services.map((svc, idx) => (
						<div key={idx} className={styles.serviceCard}>
							<div className={styles.serviceCardHeader}>
								<span className={styles.serviceCardNum}>Услуга {idx + 1}</span>
								{form.services.length > 1 && (
									<button className={styles.removeBtn} onClick={() => removeService(idx)}>
										✕
									</button>
								)}
							</div>
							<TextArea
								label='Наименование / описание'
								value={svc.name}
								onChange={(v) => setService(idx, 'name', v)}
								rows={4}
							/>
							<Field
								label='Способ передачи'
								value={svc.deliveryMethod}
								onChange={(v) => setService(idx, 'deliveryMethod', v)}
								placeholder='Электронно'
							/>
						</div>
					))}
				</section>

				<section className={styles.section}>
					<h3 className={styles.sectionTitle}>Суммы</h3>
					<div className={styles.row2}>
						<Field
							label='До вычета налогов (₸)'
							value={String(form.grossAmount)}
							onChange={(v) => set('grossAmount', Number(v) || 0)}
							type='number'
							min='0'
						/>
						<Field
							label='После вычета налогов (₸)'
							value={String(form.netAmount)}
							onChange={(v) => set('netAmount', Number(v) || 0)}
							type='number'
							min='0'
						/>
					</div>
				</section>

			</div>
				<div className={styles.actions}>
					<button className={styles.openBtn} onClick={handleOpenInTab}>
						Открыть в новой вкладке
					</button>
				</div>
			</div>

			{/* ── RIGHT: live preview ── */}
			<div className={styles.previewCol}>
				<div className={styles.previewScroll}>
					<ReportDocument ref={docRef} data={form} />
				</div>
			</div>
		</div>
	)
}
