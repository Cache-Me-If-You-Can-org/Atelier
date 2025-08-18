import React from 'react';
import { Check } from '@phosphor-icons/react';
import * as g from '../../global.module.css';
import * as css from '../styles/footer.module.css';

function Footer({ product }) {
  return (
    <div className={g.container}>
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
    </div>
  );
}

export default Footer;