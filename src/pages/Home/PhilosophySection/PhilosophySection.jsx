import styles from './PhilosophySection.module.css'

export default function PhilosophySection({title, text}) {
    return (
        <div className={styles.sectionWrapper} >
            <h2 className={styles.title} >{title}</h2>
            <p className={styles.text} >{text}</p>
        </div>
    )
}