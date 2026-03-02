import { useEffect, useRef, useState } from 'react'
import { AvrDocument } from '../../documents/avr'
import type { AvrData, AvrServiceItem } from '../../types'
import { Field, TextArea, DatePicker } from '../ui'
import { openInTab } from '../../utils/open-in-tab'
import styles from './avr-generator.module.css'

const INITIAL_DATA: AvrData = {
	customerName:
		'Товарищество с ограниченной ответственностью "Tekmates", 050040, Республика Казахстан, г.Алматы, ул. Байзакова, дом № 280, н.п. 29',
	customerBin: '220440006008',
	contractorName: 'Сыздық Ербол Нұржанұлы, г. Алматы, улица Панфилова, дом №101',
	contractorIin: '961105351374',
	contractNumber: 'ТМ/Д/051225-1',
	documentNumber: '3',
	documentDate: '28.02.2026',
	services: [
		{
			name: 'Страница "Все лиды" для Руководителя ТМ\nСтраница "Мои лиды" для Менеджера ТМ\nМодули "Создание Лида", "Управление лидами"\nТаблица редактируемых Лидов у руководителя\nРазличные рефакторинги и багфиксы',
			reportLinks:
				'https://gitlab.tekmates.pro/sqb/sqb-crm/crm-front/-/merge_requests/119\nhttps://gitlab.tekmates.pro/sqb/sqb-crm/crm-front/-/merge_requests/108\nhttps://gitlab.tekmates.pro/sqb/sqb-crm/crm-front/-/merge_requests/73',
			unit: 'услуга',
			quantity: 1,
			pricePerUnit: 0,
		},
	],
	contractorSignatureName: 'Сыздық Е.Н.',
	customerSignatureName: 'Какиев Д.У.',
	customerPosition: '',
	signDate: '28.02.2026',
}

const EMPTY_SERVICE: AvrServiceItem = {
	name: '',
	reportLinks: '',
	unit: 'услуга',
	quantity: 1,
	pricePerUnit: 0,
}

type SavedTemplate = {
	id: string
	name: string
	data: AvrData
	updatedAt: number
}

const STORAGE_KEY = 'avr_templates'

export function AvrGenerator() {
	const [form, setForm] = useState<AvrData>(INITIAL_DATA)
	const [templates, setTemplates] = useState<SavedTemplate[]>([])
	const docRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY)
			if (saved) {
				setTemplates(JSON.parse(saved))
			}
		} catch (e) {
			console.error('Failed to load templates', e)
		}
	}, [])

	const saveTemplatesToStorage = (newTemplates: SavedTemplate[]) => {
		setTemplates(newTemplates)
		localStorage.setItem(STORAGE_KEY, JSON.stringify(newTemplates))
	}

	const handleSaveTemplate = () => {
		const name = window.prompt('Введите название для сохранения:', `Шаблон ${templates.length + 1}`)
		if (!name) return

		const existingIndex = templates.findIndex((t) => t.name === name)

		if (existingIndex >= 0) {
			if (!window.confirm(`Шаблон "${name}" уже существует. Перезаписать?`)) {
				return
			}
			const newTemplates = [...templates]
			newTemplates[existingIndex] = {
				...newTemplates[existingIndex],
				data: form,
				updatedAt: Date.now(),
			}
			saveTemplatesToStorage(newTemplates)
		} else {
			const newTemplate: SavedTemplate = {
				id: crypto.randomUUID(),
				name,
				data: form,
				updatedAt: Date.now(),
			}
			saveTemplatesToStorage([newTemplate, ...templates])
		}
	}

	const handleLoadTemplate = (t: SavedTemplate) => {
		if (window.confirm(`Загрузить шаблон "${t.name}"? Текущие данные формы будут потеряны.`)) {
			setForm(t.data)
		}
	}

	const handleDeleteTemplate = (e: React.MouseEvent, id: string) => {
		e.stopPropagation()
		if (window.confirm('Удалить этот шаблон?')) {
			const newTemplates = templates.filter((t) => t.id !== id)
			saveTemplatesToStorage(newTemplates)
		}
	}

	const handleRenameTemplate = (e: React.MouseEvent, t: SavedTemplate) => {
		e.stopPropagation()
		const newName = window.prompt('Новое название:', t.name)
		if (newName && newName !== t.name) {
			const newTemplates = templates.map((temp) =>
				temp.id === t.id ? { ...temp, name: newName } : temp
			)
			saveTemplatesToStorage(newTemplates)
		}
	}

	const set = <K extends keyof AvrData>(key: K, value: AvrData[K]) =>
		setForm((prev) => ({ ...prev, [key]: value }))

	const setService = (idx: number, key: keyof AvrServiceItem, value: string | number) =>
		setForm((prev) => ({
			...prev,
			services: prev.services.map((s, i) => (i === idx ? { ...s, [key]: value } : s)),
		}))

	const addService = () =>
		setForm((prev) => ({ ...prev, services: [...prev.services, { ...EMPTY_SERVICE }] }))

	const removeService = (idx: number) =>
		setForm((prev) => ({ ...prev, services: prev.services.filter((_, i) => i !== idx) }))

	const grandTotal = form.services.reduce((sum, s) => sum + s.quantity * s.pricePerUnit, 0)

	const handleOpenInTab = () => {
		if (docRef.current) {
			openInTab(
				docRef.current,
				`АВР №${form.documentNumber} от ${form.documentDate} — ${form.contractorSignatureName}`
			)
		}
	}

	return (
		<div className={styles.wrap}>
			{/* ── LEFT: form ── */}
			<div className={styles.formCol}>
				<div className={styles.formScroll}>
					<section className={styles.section}>
						<div className={styles.sectionHeaderRow}>
							<h3 className={styles.sectionTitle}>Сохраненные шаблоны</h3>
						</div>
						<button className={styles.saveLocalBtn} onClick={handleSaveTemplate}>
							💾 Сохранить текущую форму локально
						</button>

						{templates.length > 0 && (
							<div className={styles.templateList}>
								{templates.map((t) => (
									<div
										key={t.id}
										className={styles.templateItem}
										onClick={() => handleLoadTemplate(t)}
										title='Нажмите, чтобы загрузить'
									>
										<span className={styles.templateName}>{t.name}</span>
										<div className={styles.templateActions}>
											<button
												className={styles.iconBtn}
												onClick={(e) => handleRenameTemplate(e, t)}
												title='Переименовать'
											>
												✏️
											</button>
											<button
												className={styles.iconBtn}
												onClick={(e) => handleDeleteTemplate(e, t.id)}
												title='Удалить'
											>
												✕
											</button>
										</div>
									</div>
								))}
							</div>
						)}
					</section>

					<section className={styles.section}>
						<h3 className={styles.sectionTitle}>Стороны</h3>
						<TextArea
							label='Заказчик (полное наименование и адрес)'
							value={form.customerName}
							onChange={(v) => set('customerName', v)}
							rows={3}
						/>
						<Field
							label='БИН Заказчика'
							value={form.customerBin}
							onChange={(v) => set('customerBin', v)}
						/>
						<TextArea
							label='Исполнитель (ФИО и адрес)'
							value={form.contractorName}
							onChange={(v) => set('contractorName', v)}
							rows={2}
						/>
						<Field
							label='ИИН Исполнителя'
							value={form.contractorIin}
							onChange={(v) => set('contractorIin', v)}
						/>
					</section>

					<section className={styles.section}>
						<h3 className={styles.sectionTitle}>Реквизиты АВР</h3>
						<div className={styles.row3}>
							<Field
								label='Номер договора'
								value={form.contractNumber}
								onChange={(v) => set('contractNumber', v)}
								placeholder='ТМ/Д/051225-1'
							/>
							<Field
								label='Номер АВР'
								value={form.documentNumber}
								onChange={(v) => set('documentNumber', v)}
								placeholder='1'
							/>
							<DatePicker
								label='Дата составления'
								value={form.documentDate}
								onChange={(v) => set('documentDate', v)}
								placeholder='28.02.2026'
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
									label='Наименование работ / услуг'
									value={svc.name}
									onChange={(v) => setService(idx, 'name', v)}
									rows={4}
									placeholder='Описание выполненных задач...'
								/>
								<TextArea
									label='Ссылки / отчёты (необязательно)'
									value={svc.reportLinks ?? ''}
									onChange={(v) => setService(idx, 'reportLinks', v)}
									rows={3}
									placeholder='https://...'
								/>
								<div className={styles.row3}>
									<Field
										label='Ед. измерения'
										value={svc.unit}
										onChange={(v) => setService(idx, 'unit', v)}
										placeholder='услуга'
									/>
									<Field
										label='Количество'
										value={String(svc.quantity)}
										onChange={(v) => setService(idx, 'quantity', Number(v) || 0)}
										type='number'
										min='0'
									/>
									<Field
										label='Цена за единицу (₸)'
										value={String(svc.pricePerUnit)}
										onChange={(v) => setService(idx, 'pricePerUnit', Number(v) || 0)}
										type='number'
										min='0'
									/>
								</div>
							</div>
						))}

						<div className={styles.totalBadge}>
							Итого:{' '}
							<strong>
								{new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2 }).format(grandTotal)}{' '}
								₸
							</strong>
						</div>
					</section>

					<section className={styles.section}>
						<h3 className={styles.sectionTitle}>Подписи</h3>
						<div className={styles.row2}>
							<Field
								label='ФИО Исполнителя'
								value={form.contractorSignatureName}
								onChange={(v) => set('contractorSignatureName', v)}
								placeholder='Иванов И.И.'
							/>
							<Field
								label='ФИО Заказчика'
								value={form.customerSignatureName}
								onChange={(v) => set('customerSignatureName', v)}
								placeholder='Петров П.П.'
							/>
						</div>
						<div className={styles.row2}>
							<Field
								label='Должность Заказчика'
								value={form.customerPosition}
								onChange={(v) => set('customerPosition', v)}
								placeholder='Директор'
							/>
							<DatePicker
								label='Дата подписания'
								value={form.signDate}
								onChange={(v) => set('signDate', v)}
								placeholder='28.02.2026'
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
					<AvrDocument ref={docRef} data={form} />
				</div>
			</div>
		</div>
	)
}
