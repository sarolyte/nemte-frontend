import styles from './SocialMediaBlock.module.css'
import { BsFacebook, BsInstagram, BsTiktok } from 'react-icons/bs';


export default function SocialMediaBlock() {
    return (
        <div className={styles.socialMediaWraper}>
            <a href="#"> <BsFacebook/> </a>
            <a href="#"> <BsInstagram/> </a>
            <a href="#"> <BsTiktok/> </a>
        </div>
    )
}