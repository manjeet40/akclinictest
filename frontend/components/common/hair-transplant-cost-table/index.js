const HairTransplantCostTable = ({ props }) => {
  const combinedData = [];

  if (
    props?.number_of_grafts &&
    props?.lower_side &&
    props?.higher_side &&
    props?.sitting
  ) {
    const maxLength = Math.max(
      props.number_of_grafts.length,
      props.lower_side.length,
      props.higher_side.length,
      props.sitting.length
    );

    for (let i = 0; i < maxLength; i++) {
      combinedData.push({
        number_of_grafts: props.number_of_grafts[i]?.text || "",
        lower_side: props.lower_side[i]?.text || "",
        higher_side: props.higher_side[i]?.text || "",
        sitting: props.sitting[i]?.text || "",
      });
    }
  }

  return (
    <div className="hair__transplant__cost__table">
      <div className="container">
        {props?.title ? (
          <h2 className="heading__cost">{props?.title}</h2>
        ) : null}

        {props?.paragraph ? (
          <div
            dangerouslySetInnerHTML={{ __html: props?.paragraph }}
            className="paragraph__cost"
          />
        ) : null}

        <div className="table-responsive">
          <table className="table table-responsive">
            <thead>
              <tr>
                {props?.table_head &&
                  props?.table_head.map((item, id) => {
                    return <th key={id}>{item.title}</th>;
                  })}
              </tr>
            </thead>

            <tbody>
              {combinedData.map((item, id) => {
                return (
                  <tr key={id}>
                    {item.number_of_grafts && <td>{item.number_of_grafts}</td>}
                    {item.lower_side && <td>{item.lower_side}</td>}
                    {item.higher_side && <td>{item.higher_side}</td>}
                    {item.sitting && <td>{item.sitting}</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {props?.disclaimer ? (
            <div
              dangerouslySetInnerHTML={{ __html: props?.disclaimer }}
              className="disclaimer__cost"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HairTransplantCostTable;
