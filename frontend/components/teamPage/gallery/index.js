import Image from "next/image";

const DoctorsGallery = ({ props }) => {
  return (
    <div className="team_gallery">
      <div className="container">
        <h2 className="team_head_txt">{props?.title}</h2>
        <div className="team_gallery_box">
          <div className="image-grid">
            <div class="container_grid">
              {props &&
                props?.gallery_images.map((item, id) => {
                  return (
                    <figure key={id}>
                      <Image
                        width={500}
                        height={500}
                        src={item.img}
                        alt="Gallery Image"
                      />
                    </figure>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsGallery;
