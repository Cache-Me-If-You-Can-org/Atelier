import React from 'react';
import { Moon, Sun } from '@phosphor-icons/react';
import * as g from './global.module.css';
import * as css from './navbar.module.css';

function Navbar({ theme, setTheme }) {
  return (
    <div className={[g.containerLg, g.fullWidth].join(' ')}>
      <div className={[g.group, g.alignCenter, g.sb, g.pMd, g.fullWidth, css.navbar].join(' ')}>
        <div className={[g.textLg, g.bold, css.logo].join(' ')}>
          Company Name
        </div>
        <button 
          type='button' 
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className={css.toggleThemeButton}
        >
          {theme === 'light' ? <Sun /> : <Moon />}
        </button>        
      </div>
    </div>
  )
}

export default Navbar;