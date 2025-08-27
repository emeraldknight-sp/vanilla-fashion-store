// document.querySelector<HTMLDivElement>('#app')!.innerHTML = ``;

const collectionFilterNav = document.getElementById('collection-filter');

collectionFilterNav?.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const selectedButton = target.closest('button');

  if (!selectedButton) return;

  document.querySelectorAll('.menu-btn').forEach((btn) => {
    btn.classList.remove('border-neutral-900');
    btn.classList.add('border-neutral-50');
  });

  selectedButton.classList.remove('border-neutral-50');
  selectedButton.classList.add('border-neutral-900');
});
