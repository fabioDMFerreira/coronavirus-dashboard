import React, { useState, useEffect } from 'react';

export default ({ children, className = '', offset = 0 }: any) => {
  const [affix, setAffix] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

      if (!affix && scrollTop >= offset) {
        setAffix(true);
      }

      if (affix && scrollTop < offset) {
        setAffix(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  });

  return (
    <div className={affix ? className : ''}>
      {children}
    </div>
  );
}
