/* Header, mobile navigation, and subtle scroll reveal */
const header = document.querySelector('.header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 20));

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

/* Front-end validation. Connect to a mail service/API for production sending. */
const form = document.querySelector('#contact-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    const row = field.closest('.form-row');
    const isCheckbox = field.type === 'checkbox';
    const missing = isCheckbox ? !field.checked : !field.value.trim();
    const badEmail = field.type === 'email' && field.value && !/^\S+@\S+\.\S+$/.test(field.value);
    field.classList.toggle('invalid', missing || badEmail);
    if (row) row.querySelector('.error').textContent = missing ? '入力してください。' : badEmail ? '正しいメールアドレスを入力してください。' : '';
    if (missing || badEmail) valid = false;
  });
  const status = form.querySelector('.form-status');
  if (!valid) {
    status.textContent = '入力内容をご確認ください。';
    form.querySelector('.invalid')?.focus();
    return;
  }
  status.textContent = 'まだ送信されていません。公開前に送信先メールアドレスの設定が必要です。';
});
