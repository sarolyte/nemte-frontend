import { useEffect, useState } from 'react';
import styles from './MobileNavigation.module.css'
import { NavLink } from 'react-router-dom';

export default function MobileNavigation() {
    const [ isOpen, setIsOpen ] = useState(false);

    useEffect(() => {
        document.body.classList.toggle(styles.noScroll, isOpen);
    }, [isOpen]);

    return (
        <div className={styles.hamburgerMenu}>
            <input 
                id='menuToggle'
                type='checkbox'
                checked={isOpen}
                onChange={() => setIsOpen(!isOpen)}
                className={styles.menuToggle} 
            />
            <label className={styles.menuBtn} htmlFor="menuToggle">
                <span className={isOpen ? styles.topBarOpen : ''}></span>
                <span className={isOpen ? styles.middleBarOpen : ''}></span>
                <span className={isOpen ? styles.bottomBarOpen : ''}></span>
            </label>

            {isOpen && (
                <nav className={`${styles.menuBox} ${isOpen ? styles.menuBoxOpen : ''}`} >
                    <NavLink to='/all-recipes' className={styles.menuItem} onClick={() => setIsOpen(false)}> Explore </NavLink>
                    <NavLink to='/add-recipe' className={styles.menuItem} onClick={() => setIsOpen(false)}> Add a recipe </NavLink>
                    <NavLink to='/about' className={styles.menuItem} onClick={() => setIsOpen(false)}> About </NavLink>
                </nav>
            )}
        </div>
    )
}