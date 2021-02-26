import Loader from "react-loader-spinner";

const Spinner = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Loader type="BallTriangle" color="#3399FF" height={100} width={100} />
    </div>
  );
};

export { Spinner as Loader };
