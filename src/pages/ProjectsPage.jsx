import React, { useState } from 'react';
import { MousePointerClick } from 'lucide-react';
import {
  siNodedotjs,
  siNextdotjs,
  siMysql,
  siSpringboot,
  siFlutter,
  siDart,
  siPhp,
  siReact,
  siVite,
  siHtml5,
  siJavascript,
  siCss,
  siPython,
  siDocker
} from 'simple-icons';
import { useRouter } from '../lib/router';
import { ArrowUpRightIcon, BrandIcon } from '../components/Icons';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web' },
  { key: 'systems', label: 'Systems' },
  { key: 'java', label: 'Java' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'lab', label: 'Lab' }
];

export default function ProjectsPage({ onOpenProject }) {
  const { navigate } = useRouter();
  const [filter, setFilter] = useState('all');

  return (
    <section className="page-view page-projects" aria-label="Projects showcase">
      <header className="view__head">
        <span className="view__eyebrow">PROJECTS</span>
        <h2 className="view__title">Real web apps, Java systems and mobile builds.</h2>
        <p className="view__lede">
          Everything here has source code on GitHub. Open a card to walk through the work at full size.
        </p>
      </header>

      <div className="pfilter" role="tablist" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            role="tab"
            aria-selected={filter === f.key}
            className={`pfilter__chip ${filter === f.key ? 'is-active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="sweep-glass pgrid__shell">
        <span className="pgrid__hint" aria-hidden="true">
          <MousePointerClick size={13} />
          <span>CLICK A CARD TO OPEN IT</span>
        </span>

        <div className="pgrid__scroll">
        <div className="pgrid-bento" data-filter={filter}>
          {/* Top-Left Wide Card: Full-Stack Web */}
          <button
            type="button"
            className="bento-card pcard pcard--wide"
            data-cat="web"
            onClick={() => onOpenProject('motofix')}
          >
            <div className="pcard__copy">
              <div className="bento__logos">
                <span className="bento__logo"><BrandIcon item={siNodedotjs} size={20} /></span>
                <span className="bento__logo"><BrandIcon item={siNextdotjs} size={20} /></span>
                <span className="bento__logo"><BrandIcon item={siMysql} size={20} /></span>
              </div>
              <h3 className="bento-card__title">Full-Stack Web</h3>
              <p className="bento-card__desc">
                Real screens from MotoFix e-commerce and the PharmaCare portal.
              </p>
            </div>

            <div className="pcard__windows">
              <div className="bento-win">
                <div className="bento-win__bar"><i /><i /><i /></div>
                <img src="./projects/motofix.png" alt="MotoFix motorcycle parts e-commerce" />
              </div>
              <div className="bento-win">
                <div className="bento-win__bar"><i /><i /><i /></div>
                <img src="./projects/pharmacare.png" alt="PharmaCare healthcare portal" />
              </div>
            </div>
          </button>

          {/* Top-Middle Card: Architecture Blueprint */}
          <button
            type="button"
            className="bento-card pcard pcard--spec"
            data-cat="java"
            onClick={() => onOpenProject('hitohouse')}
          >
            <div className="bento__logos">
              <span className="bento__logo"><BrandIcon item="java" size={20} /></span>
              <span className="bento__logo"><BrandIcon item={siSpringboot} size={20} /></span>
            </div>
            <h3 className="bento-card__title">The build plan</h3>
            <p className="bento-card__desc">
              Schema and REST endpoints mapped before any UI is clicked together.
            </p>

            <div className="bento__doc">
              <span className="bento__doc-eyebrow">BACKEND ARCHITECTURE</span>
              <strong className="bento__doc-title">The full schema &amp; API blueprint.</strong>
              <div className="bento__doc-flow">
                <i className="is-on">Schema</i>
                <i>REST</i>
                <i>UI</i>
              </div>
            </div>
          </button>

          {/* Top-Right Stack of 3 Quick-Open Project Cards */}
          <div className="pcard-stack">
            <button
              type="button"
              className="bento-card pcard-mini"
              data-cat="web"
              onClick={() => onOpenProject('motofix')}
            >
              <span className="bento__logo"><BrandIcon item={siNodedotjs} size={19} /></span>
              <span className="pcard-mini__copy">
                <span className="pcard-mini__kicker">NODE · MYSQL</span>
                <strong>MotoFix</strong>
                <small>Motorcycle parts e-commerce</small>
              </span>
              <span className="pcard-mini__go" aria-hidden="true">
                <ArrowUpRightIcon size={14} />
              </span>
            </button>

            <button
              type="button"
              className="bento-card pcard-mini"
              data-cat="web"
              onClick={() => onOpenProject('pharmacare')}
            >
              <span className="bento__logo"><BrandIcon item={siNextdotjs} size={19} /></span>
              <span className="pcard-mini__copy">
                <span className="pcard-mini__kicker">NEXT.JS · TS</span>
                <strong>PharmaCare</strong>
                <small>Modern healthcare portal</small>
              </span>
              <span className="pcard-mini__go" aria-hidden="true">
                <ArrowUpRightIcon size={14} />
              </span>
            </button>

            <button
              type="button"
              className="bento-card pcard-mini"
              data-cat="web"
              onClick={() => onOpenProject('barbergo')}
            >
              <span className="bento__logo"><BrandIcon item={siHtml5} size={19} /></span>
              <span className="pcard-mini__copy">
                <span className="pcard-mini__kicker">CLIENT SITE</span>
                <strong>BarberGo</strong>
                <small>Barbershop landing page</small>
              </span>
              <span className="pcard-mini__go" aria-hidden="true">
                <ArrowUpRightIcon size={14} />
              </span>
            </button>
          </div>

          {/* Bottom-Left Card: Java & Client Deck */}
          <button
            type="button"
            className="bento-card pcard pcard--deck"
            data-cat="java"
            onClick={() => onOpenProject('streetfood')}
          >
            <div className="pcard__head">
              <div className="bento__logos">
                <span className="bento__logo"><BrandIcon item="java" size={20} /></span>
                <span className="bento__logo"><BrandIcon item={siSpringboot} size={20} /></span>
              </div>
              <h3 className="bento-card__title">Java systems &amp; client sites</h3>
              <p className="bento-card__desc">
                Spring Boot web ordering, Java 21 FlatLaf desktop apps and client pages.
              </p>
            </div>

            <div className="fan-deck" aria-hidden="true">
              <div className="fan-deck__card fan-deck__card--left">
                <img src="./projects/hitohouse.png" alt="" />
              </div>
              <div className="fan-deck__card fan-deck__card--mid">
                <img src="./projects/streetfood-preview.svg" alt="" />
              </div>
              <div className="fan-deck__card fan-deck__card--right">
                <img src="./projects/barbergo-page.png" alt="" />
              </div>
            </div>
          </button>

          {/* Bottom-Middle Card: Portfolio Generations */}
          <button
            type="button"
            className="bento-card pcard pcard--gens"
            data-cat="lab"
            onClick={() => navigate('/lab')}
          >
            <div className="bento__logos">
              <span className="bento__logo"><BrandIcon item={siReact} size={19} /></span>
              <span className="bento__logo"><BrandIcon item={siVite} size={19} /></span>
              <span className="bento__logo"><BrandIcon item={siHtml5} size={19} /></span>
            </div>
            <h3 className="bento-card__title">Portfolio v1 &amp; 3D Lab</h3>
            <p className="bento-card__desc">
              Original interactive SVG showcase and the 3D cylinder project reel.
            </p>

            <div className="bento-pills">
              <span className="bento-pill">
                <BrandIcon item={siHtml5} size={14} />
                <span>Portfolio v1.0</span>
                <i className="bento-pill__dot" />
              </span>
              <span className="bento-pill">
                <BrandIcon item={siReact} size={14} />
                <span>Open 3D Cylinder</span>
              </span>
            </div>
          </button>

          {/* Bottom-Right Card: Mobile & Ordering Apps */}
          <button
            type="button"
            className="bento-card pcard pcard--apps"
            data-cat="mobile"
            onClick={() => onOpenProject('burgerbites')}
          >
            <div className="pcard__apps-copy">
              <div className="bento__logos">
                <span className="bento__logo"><BrandIcon item={siFlutter} size={19} /></span>
                <span className="bento__logo"><BrandIcon item={siDart} size={19} /></span>
                <span className="bento__logo"><BrandIcon item={siPhp} size={19} /></span>
              </div>
              <h3 className="bento-card__title">Mobile &amp; ordering apps</h3>
              <p className="bento-card__desc">
                BurgerBites mobile ordering built in Flutter &amp; Dart, wired to PHP and MySQL.
              </p>
            </div>

            <div className="pcard__phone-peek" aria-hidden="true">
              <img src="./projects/burgerbites.png" alt="" />
            </div>
          </button>
        </div>

        {/* ---------- Second screen: business systems & code archive ---------- */}
        <div className="pgrid-more" data-filter={filter}>
          <div className="pgrid-more__head" data-cat="web systems lab">
            <span className="pgrid-more__eyebrow">BUSINESS SYSTEMS &amp; CODE ARCHIVE</span>
            <span className="pgrid-more__rule" aria-hidden="true" />
            <span className="pgrid-more__count">5 more on GitHub</span>
          </div>

          <div className="pgrid-bento pgrid-bento--more" data-filter={filter}>
            {/* Wide: Daylight appointment booking */}
            <button
              type="button"
              className="bento-card pcard pcard--wide pcard--booking"
              data-cat="web systems"
              onClick={() => onOpenProject('daylight-booking')}
            >
              <div className="pcard__copy">
                <div className="bento__logos">
                  <span className="bento__logo"><BrandIcon item={siReact} size={20} /></span>
                  <span className="bento__logo"><BrandIcon item={siVite} size={20} /></span>
                  <span className="bento__logo"><BrandIcon item={siJavascript} size={20} /></span>
                </div>
                <h3 className="bento-card__title">Daylight Booking</h3>
                <p className="bento-card__desc">
                  Appointment &amp; scheduling system: week calendar, customers and business hours, built in React.
                </p>
                <div className="bento__doc-flow pcard__tags">
                  <i className="is-on">Calendar</i>
                  <i>Customers</i>
                  <i>Availability</i>
                </div>
              </div>

              <div className="bento-win pcard__hero-win">
                <div className="bento-win__bar"><i /><i /><i /></div>
                <img src="./projects/appointment.jpg" alt="Daylight appointment booking dashboard" />
              </div>
            </button>

            {/* Square: Northstar CRM */}
            <button
              type="button"
              className="bento-card pcard pcard--shot"
              data-cat="web systems"
              onClick={() => onOpenProject('northstar-crm')}
            >
              <div className="bento__logos">
                <span className="bento__logo"><BrandIcon item={siJavascript} size={19} /></span>
                <span className="bento__logo"><BrandIcon item={siVite} size={19} /></span>
              </div>
              <h3 className="bento-card__title">Northstar CRM</h3>
              <p className="bento-card__desc">Customers, leads, deals &amp; reports with CSV export.</p>
              <div className="bento-win pcard__shot-win">
                <div className="bento-win__bar"><i /><i /><i /></div>
                <img src="./projects/crm.jpg" alt="Northstar CRM dashboard" />
              </div>
            </button>

            {/* Square: Goodswell Commerce */}
            <button
              type="button"
              className="bento-card pcard pcard--shot"
              data-cat="web systems"
              onClick={() => onOpenProject('goodswell-commerce')}
            >
              <div className="bento__logos">
                <span className="bento__logo"><BrandIcon item={siJavascript} size={19} /></span>
                <span className="bento__logo"><BrandIcon item={siCss} size={19} /></span>
              </div>
              <h3 className="bento-card__title">Goodswell Commerce</h3>
              <p className="bento-card__desc">Storefront, cart, orders &amp; admin product catalog.</p>
              <div className="bento-win pcard__shot-win">
                <div className="bento-win__bar"><i /><i /><i /></div>
                <img src="./projects/commerce.jpg" alt="Goodswell Commerce admin dashboard" />
              </div>
            </button>

            {/* Stack: CoreStack archive + Calc */}
            <div className="pcard-stack pcard-stack--two">
              <button
                type="button"
                className="bento-card pcard-mini"
                data-cat="lab"
                onClick={() => onOpenProject('corestack')}
              >
                <span className="bento__logo"><BrandIcon item={siDocker} size={19} /></span>
                <span className="pcard-mini__copy">
                  <span className="pcard-mini__kicker">JS · PYTHON · SQL · DART</span>
                  <strong>CoreStack</strong>
                  <small>Practice code archive</small>
                </span>
                <span className="pcard-mini__go" aria-hidden="true">
                  <ArrowUpRightIcon size={14} />
                </span>
              </button>

              <button
                type="button"
                className="bento-card pcard-mini"
                data-cat="web lab"
                onClick={() => onOpenProject('calculator')}
              >
                <span className="bento__logo"><BrandIcon item={siPython} size={19} /></span>
                <span className="pcard-mini__copy">
                  <span className="pcard-mini__kicker">JS · PYTHON</span>
                  <strong>Calc</strong>
                  <small>Web &amp; Python calculators</small>
                </span>
                <span className="pcard-mini__go" aria-hidden="true">
                  <ArrowUpRightIcon size={14} />
                </span>
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

