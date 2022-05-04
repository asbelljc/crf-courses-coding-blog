import Header from '../components/header';
import Footer from '../components/footer';

export default function Contact() {
  return (
    <div className="layout-wrapper">
      <Header />
      <div className="contact-container">
        <div className="contact-section">
          <h1>Contact</h1>
          <p>
            Hi, I’m Jonathan, a full stack software engineer based out of
            Western North Carolina. I build apps primarily with JavaScript and
            Python and write about my experiences here.
          </p>
          <p>
            If you have any comments, ideas, critiques, or you just want to say
            hi, don’t hesitate to send me an email at asbelljc@gmail.com!
          </p>
        </div>
        <div className="contact-section">
          <h2>Around the Web</h2>
          <ul>
            <li>
              <strong>Email</strong>:{' '}
              <a href="mailto:asbelljc@gmail.com">asbelljc@gmail.com</a>
            </li>
            <li>
              <strong>GitHub</strong>:{' '}
              <a href="https://github.com/asbelljc">github.com/asbelljc</a>
            </li>
            <li>
              <strong>LinkedIn</strong>:{' '}
              <a href="https://linkedin.com/in/jcasbell">
                linkedin.com/in/jcasbell
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
