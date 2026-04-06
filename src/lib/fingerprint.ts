export const getOrCreateFingerprint = () => {
    let fp = localStorage.getItem('visitor_fingerprint');
    if (!fp) {
      fp = generateFingerprint();
      localStorage.setItem('visitor_fingerprint', fp);
    }
    return fp;
  };
  
  const generateFingerprint = () => {
    const nav: any = window.navigator;
    const screen = window.screen;
    let fp = '';
  
    try {
      fp += nav.userAgent || '';
      fp += nav.language || '';
      fp += screen.colorDepth || '';
      fp += screen.width + 'x' + screen.height || '';
      fp += new Date().getTimezoneOffset() || '';
      
      let hash = 0;
      for (let i = 0; i < fp.length; i++) {
        const char = fp.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return 'fp_' + Math.abs(hash).toString(16) + '_' + Date.now().toString(16);
    } catch (e) {
      return 'fp_fallback_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now().toString(16);
    }
  };
