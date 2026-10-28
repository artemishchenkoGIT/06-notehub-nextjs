import css from './Footer.module.css';

async function getCurrentYear() {
  'use cache';

  return new Date().getFullYear();
}

async function Footer() {
  const currentYear = await getCurrentYear();

  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {currentYear} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: your name</p>

          <p>
            Contact us:
            <a href="mailto:student@notehub.app">student@notehub.app</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
