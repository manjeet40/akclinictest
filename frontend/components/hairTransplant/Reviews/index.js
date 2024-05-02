const Reviews = () => {
  return (
    <div className="reviews">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h4 className="rew_h">Is the content scientifically based?</h4>
            <h4 className="rew_p">
              Only answer if you have proven medical knowledge
            </h4>
            <div className="btn_grp">
              <button>Yes</button>
              <button>No</button>
            </div>
          </div>
          <div className="col-md-6">
            <h4 className="rew_h">Was this information helpful?</h4>
            <h4 className="rew_p">Tell us what you think</h4>
            <div className="btn_grp">
              <button>Yes</button>
              <button>No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reviews;
