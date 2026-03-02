import { type ChangeEvent, type TextareaHTMLAttributes, type InputHTMLAttributes, forwardRef } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import { format as fnsFormat, parse, isValid } from 'date-fns'
import { ru } from 'date-fns/locale/ru'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './field.module.css'

registerLocale('ru', ru)

// ── Standard Inputs ──

type InputProps = {
	label: string
	value: string
	onChange: (value: string) => void
	placeholder?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>

export function Field({ label, value, onChange, placeholder, ...rest }: InputProps) {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)
	return (
		<div className={styles.field}>
			<label className={styles.label}>{label}</label>
			<input
				className={styles.input}
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				{...rest}
			/>
		</div>
	)
}

type TextAreaProps = {
	label: string
	value: string
	onChange: (value: string) => void
	placeholder?: string
	rows?: number
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'>

export function TextArea({
	label,
	value,
	onChange,
	placeholder,
	rows = 3,
	...rest
}: TextAreaProps) {
	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)
	return (
		<div className={styles.field}>
			<label className={styles.label}>{label}</label>
			<textarea
				className={styles.textarea}
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				rows={rows}
				{...rest}
			/>
		</div>
	)
}

// ── DatePicker ─────────────────────────────────────────────────────────────

type DateFormat = 'dotted' | 'verbose' | 'verbose_upper'

const FORMAT_MAP: Record<DateFormat, string> = {
	dotted: 'dd.MM.yyyy',
	verbose: "«d» MMMM yyyy 'г.'",
	verbose_upper: "«d» MMMM yyyy 'Г.'",
}

type DatePickerProps = {
	label: string
	value: string
	onChange: (value: string) => void
	format?: DateFormat
	placeholder?: string
}

// Custom Input for ReactDatePicker
// Needs to handle props passed by ReactDatePicker: value, onClick, onChange, etc.
const CustomDateInput = forwardRef<HTMLInputElement, any>(
	({ value, onClick, onChange, placeholder, className }, ref) => (
		<div className={styles.dateWrapper} onClick={onClick}>
			<input
				className={`${styles.input} ${styles.dateInput} ${className || ''}`}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				ref={ref}
			/>
			<div className={styles.calendarIcon}>📅</div>
		</div>
	)
)

CustomDateInput.displayName = 'CustomDateInput'

export function DatePicker({
	label,
	value,
	onChange,
	format = 'dotted',
	placeholder,
}: DatePickerProps) {
	const pattern = FORMAT_MAP[format]

	const parseDate = (str: string): Date | null => {
		if (!str) return null
		let parsed = parse(str, pattern, new Date(), { locale: ru })
		if (isValid(parsed)) return parsed

		if (format === 'verbose_upper') {
			parsed = parse(str, FORMAT_MAP['verbose'], new Date(), { locale: ru })
			if (isValid(parsed)) return parsed
		}

		if (format !== 'dotted') {
			parsed = parse(str, FORMAT_MAP['dotted'], new Date(), { locale: ru })
			if (isValid(parsed)) return parsed
		}

		return null
	}

	const selectedDate = parseDate(value)

	const handleChange = (date: Date | null) => {
		if (!date) {
			onChange('')
			return
		}
		let formatted = fnsFormat(date, pattern, { locale: ru })
		if (format === 'verbose_upper') {
			formatted = formatted.toUpperCase()
		}
		onChange(formatted)
	}

	return (
		<div className={styles.field}>
			<label className={styles.label}>{label}</label>
			<ReactDatePicker
				selected={selectedDate}
				onChange={handleChange}
				locale='ru'
				dateFormat={pattern}
				customInput={<CustomDateInput />}
				placeholderText={placeholder}
				showYearDropdown
				dropdownMode='select'
			/>
		</div>
	)
}
