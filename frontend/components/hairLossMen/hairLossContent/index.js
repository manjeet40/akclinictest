import { useRouter } from 'next/router'
import { useEffect } from 'react'

const TrainingContent = ({ props }) => {
  const router = useRouter()
  useEffect(() => {
    document.addEventListener('scroll', inView(), {
      passive: true
    })
  })
  const inView = () => {
    var observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting === true)
          console.log('Element has just become visible in screen')
        document.querySelector('#homesvg').classList.add('active')
      },
      { threshold: [1] }
    )

    observer.observe(document.querySelector('.training_cont_img'))
  }
  return (
    <div className='home_content hair__loss__content'>
      <div
        className='training_cont_img home_cont_img'
        style={{ left: 'auto', right: '0px', bottom: '0px' }}
      >
        <svg
          width='618'
          height='100%'
          viewBox='0 0 618 730'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          id='homesvg'
        >
          <path
            d='M-113 447.954L202.227 132.727V730'
            stroke='#F47920'
            strokeOpacity='1'
            strokeWidth='1.8'
            className='svg-elem-1'
          ></path>
          <path
            d='M301.773 0V580.682L459.386 423.068M617 265.455L459.386 423.068M459.386 423.068L583.818 547.5'
            stroke='#F47920'
            strokeOpacity='1'
            strokeWidth='1.8'
            className='svg-elem-2'
          ></path>
        </svg>
      </div>
      <div className='container'>
        <div className='content_row'>
          <div
            className='content_right training_content_right hairloss_content_right'
            style={{ width: '60%' }}
          >
            <h2
              className='content_head wow fadeInUp'
              style={{ color: '#231F20' }}
            >
              {props?.title}
            </h2>
            <div className='p_o wow fadeInUp' style={{ paddingLeft: '0px' }}>
              <h3 className='p_0_h' style={{ color: '#231F20' }}>
                {props?.sub_title}
              </h3>
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: props?.para_text
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className='content_left hair__loss'></div>
        </div>
      </div>
    </div>
  )
}
export default TrainingContent
