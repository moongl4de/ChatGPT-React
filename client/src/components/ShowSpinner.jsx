import Spinner from "react-bootstrap/Spinner";

function ShowSpinner(props) {
  if (props.showSpinner)
    return (
      <Spinner
        style={{
          backgroundColor:
            "linear-gradient(19deg, rgba(252, 121, 255, 1) 0%, rgba(140, 236, 255, 1) 100%, rgb(116, 232, 255) 100%)",
          color: "rgb(153, 135, 255)",
        }}
        animation="border"
      />
    );
}

export default ShowSpinner;
