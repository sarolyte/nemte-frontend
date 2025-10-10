import styles from './HeroSection.module.css'

export default function HeroSection({heroTxt, buttonLink, btnTxt, heroBg}) {
    return (
        <div className={styles.heroWrapper } style={{backgroundImage: `url(${heroBg})`}} >
            <div className={styles.overlay}></div>
            <h1> {heroTxt} </h1>
            <a href={buttonLink}> {btnTxt} </a>
        </div>
    )
}