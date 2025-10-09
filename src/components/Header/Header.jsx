import { useBreakpoints } from '../../hooks/useBreakpoints.js'
import MobileNavigation from '../Navigation/MobileNavigation.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import styles from './Header.module.css'

import NemteLogo from '../../assets/nemte_logo.png'

export default function Header() {
    const { isMobile } =useBreakpoints();

    return (
        <header className={styles.header}>
            <img className={styles.logo} src={NemteLogo} alt="Nemte logo" />
            <div>
                {isMobile ? <MobileNavigation/> : <Navigation/> }
            </div>
        </header>

    )
}


