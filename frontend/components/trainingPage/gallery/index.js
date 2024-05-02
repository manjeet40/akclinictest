import Image from 'next/image'
import Slider from 'react-slick'
const settings = {
  dots: false,
  infinite: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}
function SampleNextArrow (props) {
  const { className, style, onClick } = props
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <Image src='/training/right.svg' width={56} height={56} />
    </div>
  )
}

function SamplePrevArrow (props) {
  const { className, style, onClick } = props
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <Image src='/training/left.svg' width={56} height={56} />
    </div>
  )
}
const Gallery = ({ props }) => {
  console.log('props', props)
  return (
    <div className='training_gallery'>
      <div className='container'>
        <h2 className='service_head'>Gallery</h2>
        <div className='training_gallery_main_box'>
          <Slider {...settings}>
            {props &&
              props?.map((item, id) => {
                return (
                  <div className='slide_cont training_slide_cont'>
                    <div className='training_slide_right' key={id}>
                      <Image src={item.img} fill={true} />
                    </div>
                  </div>
                )
              })}
          </Slider>
        </div>
      </div>
    </div>
  )
}
export default Gallery
