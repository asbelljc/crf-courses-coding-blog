// layout styles
import '../styles/layout.css';

// component styles
import '../styles/components/header.css';
import '../styles/components/footer.css';

// page styles
import '../styles/pages/homepage.css';
import '../styles/pages/blog-posts.css';
import '../styles/pages/post.css';
import '../styles/pages/contact.css';

// prismjs (code block) styles
import '../styles/prismjs.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
