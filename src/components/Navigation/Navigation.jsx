import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css'

export default function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to='/all-recipes' className={({isActive}) => isActive ? styles.active : ''} > Explore </NavLink>
                </li>
                <li>
                    <NavLink to='/add-recipe' className={({isActive}) => isActive ? styles.active : ''} > Add a recipe </NavLink>
                </li>
                <li>
                    <NavLink to='/about' className={({isActive}) => isActive ? styles.active : ''} > About </NavLink>
                </li>
            </ul>
        </nav>
    )
}