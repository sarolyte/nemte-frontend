import SocialMediaBlock from '../SocialMediaBlock/SocialMediaBlock'
import styles from './Footer.module.css'
import NemteLogo from '../../assets/nemte_logo_white.png'

export default function Footer({shortTxt}) {
    return (
        <div className={styles.sectionWrapper} >
            <img className={styles.logo} src={NemteLogo} alt="" />
            <div className={styles.socialTxtBlock} >
                <SocialMediaBlock/>
                <p> {shortTxt} </p>
            </div>
        </div>
    )
}