import CountUp from "react-countup";

const Counter = () => {
  return (
    <div className="team_counter">
      <div className="team_counter_box">
        <div className="counter_box">
          <h2 className="count_up_team_num">
            <CountUp duration={5} end={1500} enableScrollSpy={true} />+
          </h2>
          <h3 className="count_up_txt">SUCCESSFUL PROCEDURES</h3>
        </div>

        <div className="counter_box">
          <h2 className="count_up_team_num">
            <CountUp duration={5} end={1000000} enableScrollSpy={true} />+
          </h2>
          <h3 className="count_up_txt">FOLLICLES TRANSPLANTED</h3>
        </div>

        <div className="counter_box">
          <h2 className="count_up_team_num">
            <CountUp duration={2} end={20} enableScrollSpy={true} />+
          </h2>
          <h3 className="count_up_txt">YEARS OF EXPERIENCE</h3>
        </div>
      </div>
    </div>
  );
};

export default Counter;
