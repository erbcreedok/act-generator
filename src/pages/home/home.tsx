import { useState } from 'react'
import { AvrGenerator } from '../../components/avr-generator'
import { ReportGenerator } from '../../components/report-generator'
import styles from './home.module.css'

type Tab = 'avr' | 'report'

export function Home() {
	const [activeTab, setActiveTab] = useState<Tab>('avr')

	return (
		<div className={styles.wrap}>
			<header className={styles.header}>
				<div>
					<h1 className={styles.title}>Генератор документов</h1>
					<p className={styles.subtitle}>Tekmates · АВР и Отчеты об оказанных услугах</p>
				</div>
				<div className={styles.tabs}>
					<button
						className={`${styles.tab} ${activeTab === 'avr' ? styles.tabActive : ''}`}
						onClick={() => setActiveTab('avr')}
					>
						АВР (Форма Р-1)
					</button>
					<button
						className={`${styles.tab} ${activeTab === 'report' ? styles.tabActive : ''}`}
						onClick={() => setActiveTab('report')}
					>
						Отчет / Приложение
					</button>
				</div>
			</header>

			<main className={styles.main}>
				{activeTab === 'avr' ? <AvrGenerator /> : <ReportGenerator />}
			</main>
		</div>
	)
}
