// // CustomLink.js
// import Link from "next/link";

// const CustomLink = ({ href, as, children }) => {
//   // Ensure trailing slash in 'href' prop
//   const modifiedHref = href && !href.endsWith("/") ? `${href}/` : href;

//   return (
//     <Link href={modifiedHref} as={as}>
//       {children}
//     </Link>
//   );
// };

// export default CustomLink;

// components/CustomLink.js

import Link from "next/link";

const CustomLink = ({ href, children, ...props }) => {
  const formattedHref = href.endsWith("/") ? href : `${href}/`;

  return (
    <Link href={formattedHref} {...props}>
      {children}
    </Link>
  );
};

export default CustomLink;
