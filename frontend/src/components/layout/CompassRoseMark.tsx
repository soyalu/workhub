/** WorkHub brass compass rose: engraved ring, layered directional blades, central faceted star. */
export function CompassRoseMark() {
  return (
    <svg className="brand-compass-svg" viewBox="0 0 80 80" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="wh-compass-metal" x1="9" y1="8" x2="71" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF1BC"/><stop offset=".24" stopColor="#C38B41"/>
          <stop offset=".46" stopColor="#F7CD80"/><stop offset=".68" stopColor="#86501E"/>
          <stop offset=".86" stopColor="#F9D78D"/><stop offset="1" stopColor="#A56B29"/>
        </linearGradient>
        <linearGradient id="wh-compass-blade" x1="32" y1="7" x2="49" y2="73" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF5C5"/><stop offset=".26" stopColor="#FAD789"/>
          <stop offset=".49" stopColor="#B67930"/><stop offset=".7" stopColor="#FFE29A"/>
          <stop offset="1" stopColor="#B87832"/>
        </linearGradient>
        <radialGradient id="wh-compass-halo"><stop stopColor="#FCE2A2" stopOpacity=".18"/><stop offset="1" stopColor="#FCE2A2" stopOpacity="0"/></radialGradient>
      </defs>
      <circle cx="40" cy="40" r="36" fill="url(#wh-compass-halo)"/>
      <circle cx="40" cy="40" r="28.4" stroke="#523418" strokeWidth="4.2" opacity=".62"/>
      <circle cx="40" cy="40" r="28.5" stroke="url(#wh-compass-metal)" strokeWidth="2.7"/>
      <circle cx="40" cy="40" r="25.3" stroke="#E6AF61" strokeWidth=".85" opacity=".9"/>
      <circle cx="40" cy="40" r="31" stroke="#FFD990" strokeWidth=".55" opacity=".66"/>
      <path d="M40 2.5V13.5M40 66.5V77.5M2.5 40H13.5M66.5 40H77.5"
        stroke="#70471F" strokeWidth="3.2" strokeLinecap="round"/>
      <path d="M40 2.5V13.5M40 66.5V77.5M2.5 40H13.5M66.5 40H77.5"
        stroke="#FDE0A0" strokeWidth="1.55" strokeLinecap="round"/>
      <path d="M13 13L21.5 21.5M67 13L58.5 21.5M13 67L21.5 58.5M67 67L58.5 58.5"
        stroke="#B87A32" strokeWidth="2" strokeLinecap="round"/>
      <path d="M13 13L21.5 21.5M67 13L58.5 21.5M13 67L21.5 58.5M67 67L58.5 58.5"
        stroke="#FFDC94" strokeWidth=".85" strokeLinecap="round"/>
      <path d="M40 5L44.2 31.2L58.5 20.6L48.8 35.8L75 40L48.8 44.2L59.4 59.4L44.2 48.8L40 75L35.8 48.8L20.6 59.4L31.2 44.2L5 40L31.2 35.8L20.6 20.6L35.8 31.2Z"
        fill="#573614" stroke="#F9CF85" strokeWidth=".8" strokeLinejoin="round"/>
      <path d="M40 6.5L46.2 40L40 34.8L33.8 40Z" fill="url(#wh-compass-blade)" stroke="#FFE5A0" strokeWidth=".9"/>
      <path d="M40 6.5L33.8 40L40 34.8Z" fill="#9C6227" opacity=".78"/>
      <path d="M40 73.5L33.8 40L40 45.2L46.2 40Z" fill="url(#wh-compass-blade)" stroke="#F8D68F" strokeWidth=".9"/>
      <path d="M73.5 40L40 33.8L45.2 40L40 46.2Z" fill="url(#wh-compass-blade)" stroke="#FFE4A0" strokeWidth=".9"/>
      <path d="M6.5 40L40 46.2L34.8 40L40 33.8Z" fill="url(#wh-compass-blade)" stroke="#FFE4A0" strokeWidth=".9"/>
      <path d="M19 19L38.2 32.7L32.7 38.2Z M61 19L47.3 38.2L41.8 32.7Z M61 61L41.8 47.3L47.3 41.8Z M19 61L32.7 41.8L38.2 47.3Z"
        fill="#C18735" stroke="#FFE0A1" strokeWidth=".65"/>
      <path d="M40 25L44.1 35.9L55 40L44.1 44.1L40 55L35.9 44.1L25 40L35.9 35.9Z"
        fill="#583614" stroke="#FFE5A7" strokeWidth="1.2"/>
      <path d="M40 27.8L43.4 36.6L52.2 40L43.4 43.4L40 52.2L36.6 43.4L27.8 40L36.6 36.6Z"
        fill="url(#wh-compass-blade)" stroke="#FFF0BD" strokeWidth=".55"/>
      <path d="M40 29L40 50M29 40H51" stroke="#FFF5CC" strokeWidth=".6" opacity=".7"/>
      <circle cx="40" cy="40" r="5.3" fill="#77461E" stroke="#FFE5AB" strokeWidth="1.25"/>
      <path d="M40 34.4L45.6 40L40 45.6L34.4 40Z" fill="#FFE3A1" stroke="#8F5926" strokeWidth=".7"/>
      <circle cx="40" cy="40" r="1.65" fill="#805022"/>
      <circle cx="40" cy="9" r="1.4" fill="#FFF4D3"/>
      <circle cx="71" cy="40" r="1.15" fill="#FCE1A1"/>
      <circle cx="9" cy="40" r="1.15" fill="#FCE1A1"/>
      <circle cx="40" cy="71" r="1.15" fill="#FCE1A1"/>
    </svg>
  );
}
