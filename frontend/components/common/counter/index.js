import CountUp from "react-countup";
const Counter = ({props}) => {
  return (
    <div className="counter">
      <div className="container">
        <div className="row">
          {props &&
            props.map((itm, id) => {
              return (
                <div className="col-md-4" key={id}>
                  <div className="counter_grid">
                    <span className="conter_text">
                      <CountUp
                        duration={5}
                        end={itm.count}
                        enableScrollSpy={true}
                      />
                      +
                    </span>
                    <span className="counter_desc">{itm.title}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default Counter;
