export const scrollToAnchor = (hash: string) => {
  if (!hash) return;
  
  const id = hash.replace('#', '');
  const element = document.getElementById(id);
  
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

export const handleAnchorNavigation = () => {
  // Handle initial page load with hash
  if (window.location.hash) {
    setTimeout(() => {
      scrollToAnchor(window.location.hash);
    }, 100);
  }
  
  // Handle hash changes
  const handleHashChange = () => {
    scrollToAnchor(window.location.hash);
  };
  
  window.addEventListener('hashchange', handleHashChange);
  
  // Cleanup function
  return () => {
    window.removeEventListener('hashchange', handleHashChange);
  };
};