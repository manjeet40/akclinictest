const NewsLetter = ({ props }) => {
  return (
    <div className='news_letter laser_removal_news_letter'>
      <div className='container'>
        <h2 className='newsletter_head wow fadeInUp'>{props?.title}</h2>
        <h4 className='newsletter_subhead wow fadeInUp'>{props?.sub_title}</h4>
        <div className='form_news'>
          <span className='name_input'>
            <div className='form__group'>
              <input type='text' className='form__field' placeholder='Name*' />
              <label htmlFor='name' className='form__label'>
                Name*
              </label>
            </div>
          </span>
          <span className='age_input'>
            <div className='form__group'>
              <input type='number' className='form__field' placeholder='Age*' />
              <label htmlFor='age' className='form__label'>
                Age
              </label>
            </div>
          </span>
          <span className='name_input'>
            <div className='form__group'>
              <input type='text' className='form__field' placeholder='Email*' />
              <label htmlFor='email' className='form__label'>
                Email*
              </label>
            </div>
          </span>
          <span className='name_input'>
            <div className='form__group'>
              <input
                type='number'
                className='form__field'
                placeholder='Phone*'
              />
              <label htmlFor='pone' className='form__label'>
                Phone*
              </label>
            </div>
          </span>
          <button className='newsleter_btn'>SUBMIT</button>
        </div>
      </div>
    </div>
  )
}
export default NewsLetter
