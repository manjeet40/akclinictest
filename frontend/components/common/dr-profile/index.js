import Image from "next/image";
import Link from "next/link";

const DocProfile = ({ props }) => {
  return (
    <div className="container dr__profile">
      <div className="author-info">
        <div className="banner__section">
          <div className="left__box">
            <Image
              src={props.image}
              alt={props.title}
              width={300}
              height={300}
            />
            <h1 className="head__txt">{props.title}</h1>
            <p className="para__txt">{props.sub_title}</p>
            <div className="social__icons">
              <Image
                width={20}
                height={20}
                src="/author/facebook.svg"
                alt="Facebook"
              />
              <Image
                width={20}
                height={20}
                src="/author/linkedin.svg"
                alt="LinkedIn"
              />
              <Image
                width={20}
                height={20}
                src="/author/insta.svg"
                alt="Instagram"
              />
              <Image
                width={20}
                height={20}
                src="/author/youtube.svg"
                alt="Youtube"
              />
            </div>
          </div>
          <div className="right__box">
            <h2 className="head__txt">{props.right_title}</h2>
            <p
              className="para__txt"
              dangerouslySetInnerHTML={{
                __html: props.description,
              }}
            />
            {props.button ? (
              <button className="btn__banner btn__two">
                <Link href={props.url} target="_blank">
                  {props.button}
                </Link>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocProfile;
