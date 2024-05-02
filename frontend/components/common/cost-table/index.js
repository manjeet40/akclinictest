const CostTable = ({ props }) => {
  return (
    <div className="cost__table__main">
      <div className="container">
        <h2 className="cost__main__heading">{props?.heading}</h2>

        <div className="row">
          <div className="col-md-6 col-sm-12">
            <h4 className="cost__sub__heading">{props?.sub_heading}</h4>
            <ul className="bullet__list__cost">
              {props?.list &&
                props?.list.map((item, id) => {
                  return (
                    <li className="li__head__cost" key={id}>
                      <strong>{item?.head} </strong>
                      <span className="sub__head__cost">{item?.sub_head}</span>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="col-md-6 col-sm-12">
            <h4 className="cost__sub__heading">{props?.cost_heading}</h4>

            <div className="table-responsive">
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <th>{props?.table_head_headings?.head_one}</th>

                    <th>{props?.table_head_headings?.head_two}</th>
                  </tr>
                </thead>

                <tbody>
                  {props?.prices &&
                    props?.prices.map((item, id) => {
                      return (
                        <tr key={id}>
                          <td>{item?.name}</td>
                          <td>{item?.price}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

              <em>{props?.em_text}</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostTable;
