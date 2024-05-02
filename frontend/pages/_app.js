import "/styles/fonts.min.css";
import "styles/animate.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "/styles/style.min.css";
import "/styles/responsive.min.css";
import "/styles/slick.min.css";
import "/styles/beforeslider.min.css";
//css end

import Script from "next/script";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const scriptCode = `
    (function(I, L, T, i, c, k, s) {
      if(I.iticks) return;
      I.iticks = {
        host: c,
        settings: s,
        clientId: k,
        cdn: L,
        queue: []
      };
      var h = T.head || T.documentElement;
      var e = T.createElement(i);
      var l = I.location;
      e.async = true;
      e.src = (L || c) + '/client/inject-v2.min.js';
      h.insertBefore(e, h.firstChild);
      I.iticks.call = function(a, b) {
        I.iticks.queue.push([a, b]);
      };
    })(window, 'https://cdn-v1.intelliticks.com/prod/common', document, 'script', 'https://app.intelliticks.com', 'kEEbS63MgGiojbePd_c', {});
  `;
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" type="image" sizes="<generated>" />
      </Head>
      <Component {...pageProps} />
      <Script
        defer
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload" defer>
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <Script
        defer
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: scriptCode }}
      />
    </>
  );
}
