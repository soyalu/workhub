/** Ornamental brass plate used only for the selected React Router link.
 * Decorative SVG stays separate from dynamic text, icon and click target. */
export function SidebarActivePlaque() {
  return (
    <svg className="sidebar-active-ornament" viewBox="0 0 216 56"
      preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="wh-plate-rim" x1="8" y1="0" x2="213" y2="57" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEEDBA" /><stop offset=".14" stopColor="#B07C35"/>
          <stop offset=".37" stopColor="#FFE0A0"/><stop offset=".64" stopColor="#AD742C"/>
          <stop offset=".86" stopColor="#FFE9A7"/><stop offset="1" stopColor="#A77330"/>
        </linearGradient>
        <linearGradient id="wh-plate-face" x1="9" y1="46" x2="209" y2="7" gradientUnits="userSpaceOnUse">
          <stop stopColor="#71502D"/><stop offset=".19" stopColor="#9A713D"/>
          <stop offset=".48" stopColor="#B78D52"/><stop offset=".71" stopColor="#D8A661"/>
          <stop offset=".91" stopColor="#F0BB6D"/><stop offset="1" stopColor="#B77C35"/>
        </linearGradient>
        <linearGradient id="wh-plate-sheen" x1="98" y1="2" x2="112" y2="51" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF7CB" stopOpacity=".55"/>
          <stop offset=".29" stopColor="#FFEDBB" stopOpacity=".15"/>
          <stop offset=".52" stopColor="#5B3216" stopOpacity=".10"/>
          <stop offset=".78" stopColor="#9B5324" stopOpacity=".06"/>
          <stop offset="1" stopColor="#FFF0BA" stopOpacity=".23"/>
        </linearGradient>
        <radialGradient id="wh-plate-light" cx="0" cy="0" r="1" gradientTransform="translate(187 18) rotate(173) scale(130 49)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE4A0" stopOpacity=".36"/><stop offset="1" stopColor="#FFF2C6" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <path d="M13 3H199L207 12L215 28L207 44L199 53H13L6 44L1 28L6 12Z"
        fill="#020B17" opacity=".65" transform="translate(0 2)"/>
      <path d="M13 1.5H198L206 10.5L215 28L206 45.5L198 54.5H13L5 44L1 28L5 12Z"
        fill="url(#wh-plate-rim)" stroke="#FFE5A1" strokeWidth=".9"/>
      <path d="M15 4.8H196L202.7 12.5L211.5 28L202.7 43.5L196 51.2H15L8.5 42.5L4.8 28L8.5 13.5Z"
        fill="#422C1A" stroke="#5B391F" strokeWidth="1.4"/>
      <path d="M17 6.8H194L201.2 14L208.4 28L201.2 42L194 49.2H17L10.4 41L7.6 28L10.4 15Z"
        fill="url(#wh-plate-face)" stroke="#EBC17A" strokeWidth=".8"/>
      <path d="M17 6.8H194L201.2 14L208.4 28L201.2 42L194 49.2H17L10.4 41L7.6 28L10.4 15Z"
        fill="url(#wh-plate-sheen)"/>
      <path d="M17 6.8H194L201.2 14L208.4 28L201.2 42L194 49.2H17L10.4 41L7.6 28L10.4 15Z"
        fill="url(#wh-plate-light)"/>
      <path d="M18 8.9H193L199.3 15.4M18 47.1H193L199.3 40.6"
        stroke="#FFE4A5" strokeOpacity=".53" strokeWidth=".8"/>
      <path d="M17 11L12.2 18L10.2 28L12.2 38L17 45M196 11L202 18L205.5 28L202 38L196 45"
        stroke="#6D451F" strokeOpacity=".73" strokeWidth="1.2"/>
      <path d="M15.9 14.5L12.8 19.5L11 28L12.8 36.5L15.9 41.5"
        stroke="#FFE5AB" strokeWidth=".8"/>
      <path d="M199.5 14.5L203.2 20.5L205 28L203.2 35.5L199.5 41.5"
        stroke="#FFE5AB" strokeWidth=".8"/>
      <path d="M14.5 17.5L19.5 22.8L16.4 28L19.5 33.2L14.5 38.5L11.5 28Z"
        fill="#87561E" stroke="#FBE4A2" strokeWidth="1.1"/>
      <path d="M14.4 20.1L17.5 28L14.4 35.9L12.3 28Z"
        fill="#FBE3A5" stroke="#8E602A" strokeWidth=".5"/>
      <path d="M200.8 17.5L196 22.8L199.2 28L196 33.2L200.8 38.5L204 28Z"
        fill="#A36C2A" stroke="#FFDB91" strokeWidth=".95"/>
      <path d="M200.9 20.1L197.8 28L200.9 35.9L203 28Z"
        fill="#FBE1A0" stroke="#87521F" strokeWidth=".4"/>
      <path d="M16.5 8.5L19.1 11.1L16.5 13.7L13.9 11.1Z M16.5 42.3L19.1 44.9L16.5 47.5L13.9 44.9Z"
        fill="#F5D390" stroke="#68431C" strokeWidth=".6"/>
      <circle cx="196.8" cy="11.1" r="1.5" fill="#FFF0BC" stroke="#98672F" strokeWidth=".7"/>
      <circle cx="196.8" cy="44.9" r="1.5" fill="#FFF0BC" stroke="#98672F" strokeWidth=".7"/>
      <path d="M29 10.4H177M29 45.6H177" stroke="#FFF0B5" strokeOpacity=".11" strokeWidth=".8"/>
    </svg>
  );
}
