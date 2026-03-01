import type { ChangeEvent, TextareaHTMLAttributes, InputHTMLAttributes } from 'react'
import styles from './field.module.css'

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

export function TextArea({ label, value, onChange, placeholder, rows = 3, ...rest }: TextAreaProps) {
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
