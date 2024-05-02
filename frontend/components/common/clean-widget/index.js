const CleanWidget = ({ props }) => {
  return (
    <div className="container clean__widget">
      <div dangerouslySetInnerHTML={{ __html: props?.clean_widget_box }} />
    </div>
  );
};

export default CleanWidget;
