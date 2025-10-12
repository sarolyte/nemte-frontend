import styles from './SocialMediaBlock.module.css';
import { BsFacebook, BsInstagram, BsTiktok } from 'react-icons/bs';


export default function SocialMediaBlock() {

    return (
        <div className={styles.socialMediaWraper}>
            <a className={styles.icon} href="#"> <BsFacebook/> </a>
            <a className={styles.icon} href="#"> <BsInstagram/> </a>
            <a className={styles.icon} href="#"> <BsTiktok/> </a>
        </div>
    )
}