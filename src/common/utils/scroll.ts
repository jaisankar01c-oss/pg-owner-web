export function headerHeight(){
  return 64; // px, matches Navbar height
}

export function smoothScrollToId(id: string){
  const el = document.querySelector(id) as HTMLElement | null;
  if(!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - headerHeight();
  window.scrollTo({ top: y, behavior: 'smooth' });
}
