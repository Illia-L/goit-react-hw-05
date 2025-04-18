import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

const buildLinkClass = ({isActive}) => css.link + ' ' + (isActive ? css.active : '');

function Navigation() {
  return (
    <nav>
      <ul className={css.list}>
        <li className={css.item}>
          <NavLink
            to='/'
            className={buildLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to='/movies'
            className={buildLinkClass}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
