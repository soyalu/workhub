import { useState, type ReactNode } from 'react';

/**
 * Optional high-quality art. React controls still render if asset installation
 * has not been performed yet or a WebP fails to load.
 */
export function OptionalArt({src, fallback, className='', alt=''}:{
  src:string;fallback:ReactNode;className?:string;alt?:string;
}) {
  const [ok,setOk]=useState(true);
  return ok
    ? <img className={'optional-art '+className} src={src} alt={alt} aria-hidden={!alt}
        draggable={false} onError={()=>setOk(false)}/>
    : <>{fallback}</>;
}
