import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const RouterContext = createContext({
  path: '/',
  navigate: () => {}
});

const KNOWN_ROUTES = new Set([
  '/',
  '/projects',
  '/services',
  '/lab',
  '/versions',
  '/certificates',
  '/credentials',
  '/journey',
  '/about',
  '/contact'
]);

const HASH_MAP = {
  '#overview': '/',
  '#projects': '/projects',
  '#barrel': '/lab',
  '#versions': '/lab',
  '#services': '/services',
  '#skills': '/about',
  '#credentials': '/certificates',
  '#certificates': '/certificates',
  '#contact': '/contact'
};

function detectBasePath() {
  if (typeof window === 'undefined') return '';
  const rawBase = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  if (rawBase && rawBase !== '.') return rawBase;

  const pathname = window.location.pathname || '/';
  const clean = pathname.replace(/\/index\.html$/i, '').replace(/\/+$/, '');
  if (!clean) return '';

  const segments = clean.split('/').filter(Boolean);
  const last = `/${segments[segments.length - 1] || ''}`;
  if (KNOWN_ROUTES.has(last)) {
    const prefix = segments.slice(0, -1).join('/');
    return prefix ? `/${prefix}` : '';
  }
  return clean;
}

const BASE_PATH = detectBasePath();

function normalizeRoute(rawPath) {
  if (!rawPath) return '/';
  let p = rawPath.split('?')[0].split('#')[0];
  if (BASE_PATH && p.startsWith(BASE_PATH)) {
    p = p.slice(BASE_PATH.length);
  }
  p = p.replace(/\/index\.html$/i, '').replace(/\/+$/, '') || '/';
  if (!p.startsWith('/')) p = `/${p}`;
  if (p === '/versions') return '/lab';
  if (p === '/credentials') return '/certificates';
  if (p === '/journey') return '/about';
  return p;
}

function getInitialRoute() {
  if (typeof window === 'undefined') return '/';

  // Handle GitHub Pages 404.html SPA query redirect (?p=/projects)
  const params = new URLSearchParams(window.location.search);
  const redirected = params.get('p');
  if (redirected) {
    const target = normalizeRoute(redirected);
    const nextUrl = `${BASE_PATH}${target === '/' ? '/' : target}`;
    window.history.replaceState(null, '', nextUrl);
    return target;
  }

  // Map legacy hash links (#projects, #contact, etc.) cleanly
  const hash = window.location.hash.toLowerCase();
  if (hash && HASH_MAP[hash]) {
    const target = HASH_MAP[hash];
    const nextUrl = `${BASE_PATH}${target === '/' ? '/' : target}`;
    window.history.replaceState(null, '', nextUrl);
    return target;
  }

  return normalizeRoute(window.location.pathname);
}

const ROUTE_TITLES = {
  '/': 'Earl Willan Pajo — Full-Stack Web Developer & Software Engineer',
  '/projects': 'Projects — Earl Willan Pajo',
  '/services': 'Services & Workflow — Earl Willan Pajo',
  '/lab': 'Dev Lab (Portfolio v1 & v2) — Earl Willan Pajo',
  '/certificates': 'Verified Certificates — Earl Willan Pajo',
  '/about': 'About — Earl Willan Pajo',
  '/contact': 'FAQs & Contact — Earl Willan Pajo'
};

export function RouterProvider({ children }) {
  const [path, setPath] = useState(getInitialRoute);

  const navigate = useCallback((to, options = {}) => {
    const next = normalizeRoute(to);
    setPath((prev) => {
      if (prev === next && !options.force) return prev;
      if (typeof window !== 'undefined') {
        document.documentElement.classList.add('has-navigated');
        const fullUrl = `${BASE_PATH}${next === '/' ? '/' : next}`;
        if (options.replace) {
          window.history.replaceState(null, '', fullUrl);
        } else {
          window.history.pushState(null, '', fullUrl);
        }
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const onPopState = () => {
      document.documentElement.classList.add('has-navigated');
      setPath(normalizeRoute(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    document.title = ROUTE_TITLES[path] || ROUTE_TITLES['/'];
    const panel = document.getElementById('shell-panel');
    if (panel) panel.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [path]);

  const value = useMemo(() => ({ path, navigate, basePath: BASE_PATH }), [path, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}

export function Link({ to, className = '', activeClassName = 'active', exact = false, onClick, children, ...rest }) {
  const { path, navigate, basePath } = useRouter();
  const normalized = normalizeRoute(to);
  const isActive = exact || normalized === '/' ? path === normalized : path === normalized || path.startsWith(`${normalized}/`);
  const href = `${basePath}${normalized === '/' ? '/' : normalized}`;

  const handleClick = (event) => {
    if (onClick) onClick(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }
    event.preventDefault();
    navigate(normalized);
  };

  const cls = [className, isActive ? activeClassName : ''].filter(Boolean).join(' ');

  return (
    <a href={href} className={cls} aria-current={isActive ? 'page' : undefined} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
