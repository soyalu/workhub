/** WorkHub fantasy compass-rose crest, decorative and reusable in the sidebar. */
export function CompassRoseMark() {
  return (
    <svg className="brand-compass-svg" viewBox="0 0 80 80" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="wh-rose-gold" x1="11" y1="9" x2="70" y2="71" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF2B9"/><stop offset=".29" stopColor="#E9BD68"/>
          <stop offset=".57" stopColor="#A56D2D"/><stop offset=".81" stopColor="#F8D689"/>
          <stop offset="1" stopColor="#A8752E"/>
        </linearGradient>
        <linearGradient id="wh-rose-needle" x1="28" y1="14" x2="54" y2="67" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF5D8"/><stop offset=".52" stopColor="#D9AA54"/>
          <stop offset="1" stopColor="#926027"/>
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r="29.5" stroke="#5C371C" strokeWidth="5.2" opacity=".5"/>
      <circle cx="40" cy="40" r="29.5" stroke="url(#wh-rose-gold)" strokeWidth="1.8"/>
      <circle cx="40" cy="40" r="26.1" stroke="#F4CF87" strokeWidth=".7" opacity=".75"/>
      <path d="M40 3L44.4 31.2L69.9 10.1L48.8 35.6L77 40L48.8 44.4L69.9 69.9L44.4 48.8L40 77L35.6 48.8L10.1 69.9L31.2 44.4L3 40L31.2 35.6L10.1 10.1L35.6 31.2L40 3Z"
        fill="url(#wh-rose-gold)" stroke="#F8DF9D" strokeWidth=".55" strokeLinejoin="round"/>
      <path d="M40 11.1L43.6 35.8L66.7 40L43.6 44.2L40 68.9L36.4 44.2L13.3 40L36.4 35.8L40 11.1Z"
        fill="#152A40" stroke="#D4A456" strokeWidth="1.45" strokeLinejoin="round"/>
      <path d="M40 13L46.8 40L40 67L33.2 40L40 13Z" fill="url(#wh-rose-needle)" stroke="#FFF1BD" strokeWidth=".9"/>
      <path d="M13 40L40 33.2L67 40L40 46.8L13 40Z" fill="url(#wh-rose-needle)" stroke="#F3D087" strokeWidth=".85"/>
      <path d="M40 18L40 62M18 40H62" stroke="#FFF4CE" strokeWidth=".65" opacity=".57"/>
      <circle cx="40" cy="40" r="6.3" fill="#192B42" stroke="#F5D187" strokeWidth="1.5"/>
      <path d="M40 34.7L44.2 40L40 45.3L35.8 40L40 34.7Z" fill="#FFE5A1"/>
      <circle cx="40" cy="40" r="1.5" fill="#805322"/>
      <circle cx="40" cy="7.5" r="1.5" fill="#FFF4C7"/>
      <circle cx="72.5" cy="40" r="1.2" fill="#F5CE79"/>
      <circle cx="40" cy="72.5" r="1.2" fill="#F5CE79"/>
      <circle cx="7.5" cy="40" r="1.2" fill="#F5CE79"/>
    </svg>
  );
}
