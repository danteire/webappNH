// System breakpointów dla responsywności
export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  large: '1200px',
  xlarge: '1440px'
};

// Media queries
export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  large: `@media (min-width: ${breakpoints.large})`,
  xlarge: `@media (min-width: ${breakpoints.xlarge})`,
  
  // Range queries
  mobileOnly: `@media (max-width: ${breakpoints.tablet})`,
  tabletOnly: `@media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop})`,
  desktopUp: `@media (min-width: ${breakpoints.desktop})`,
  tabletUp: `@media (min-width: ${breakpoints.tablet})`
};

// Utility functions
export const isMobile = () => window.innerWidth <= parseInt(breakpoints.tablet);
export const isTablet = () => window.innerWidth > parseInt(breakpoints.tablet) && window.innerWidth <= parseInt(breakpoints.desktop);
export const isDesktop = () => window.innerWidth > parseInt(breakpoints.desktop);
