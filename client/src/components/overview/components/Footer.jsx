import React from 'react';
import { Check } from '@phosphor-icons/react';
import * as g from '../../global.module.css';
import * as css from '../styles/footer.module.css';

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com',
  },
  {
    name: 'Twitter',
    url: 'https://www.twitter.com',
  },
  {
    name: 'Pinterest',
    url: 'https://www.pinterest.com',
  },
];

function Footer({ product }) {
  return (
    <div className={g.container}>
      <div className={[g.stack, g.gapLg].join(' ')}>
        <div className={[g.group, g.gapMd].join(' ')}>
          <div className={[g.stack, g.gapSm, css.leftContent].join(' ')}>
            <div className={[g.textMd, g.bold].join(' ')}>
              {product.slogan}
            </div>
            <div className={g.textSm}>
              {product.description}
            </div>
          </div>
          <div className={css.divider} />
          <div className={[g.stack, css.features].join(' ')}>
            {product.features.map((feature) => (
              <div key={feature.value} className={[g.group, g.gapSm, g.alignStart].join(' ')}>
                <Check size={20} className={css.icon} />
                <span className={css.text}>{feature.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={[g.group, g.gapSm, g.center].join(' ')}>
          <div className={[g.textSm, g.bold].join(' ')}>Share on:</div>
          {SOCIAL_LINKS.map((link) => (
            <button 
              key={link.name} 
              type='button' 
              className={css.socialButton}
              onClick={() => {
                window.open(link.url, '_blank');
              }}
            >
              <div className={g.textXs}>
                {link.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
