type FrameVariant = 'map' | 'companion' | 'parchment';

/** Ornamental non-interactive overlay; keeps content and controls semantic HTML.
 * Current ornamentation is a replaceable CSS baseline, not final painted art. */
export function OrnateFrame({ variant }: { variant: FrameVariant }) {
  return <span className={'ornate-frame ornate-frame--' + variant} aria-hidden="true">
    <i className="ornate-corner ornate-corner--tl" />
    <i className="ornate-corner ornate-corner--tr" />
    <i className="ornate-corner ornate-corner--br" />
    <i className="ornate-corner ornate-corner--bl" />
  </span>;
}
