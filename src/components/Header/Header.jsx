import { useBreakpoints } from '../../hooks/useBreakpoints.js'
import MobileNavigation from '../Navigation/MobileNavigation.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import styles from './Header.module.css'
import { Link } from 'react-router-dom';

import NemteLogo from '../../assets/nemte_logo.png'

export default function Header() {
    const { isMobile } =useBreakpoints();

    return (
        <header className={styles.header}>
            <Link to="/">
                <img className={styles.logo} src={NemteLogo} alt="Nemte logo" />
            </Link>

            <div>
                {isMobile ? <MobileNavigation/> : <Navigation/> }
            </div>
        </header>
    )
}


