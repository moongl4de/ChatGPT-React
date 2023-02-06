import Spinner from "react-bootstrap/Spinner";

function ShowSpinner(props) {
  if (props.showSpinner)
    return <Spinner animation="border" variant="primary" />;
}

export default ShowSpinner;
