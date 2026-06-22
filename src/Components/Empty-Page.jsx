import emptyInvoice from "../assets/emptyinvoice.svg";

function EmptyInvioce() {
  return (
    <div style={{  height: "62vh" }}>
      <div
        style={{
          margin: "auto",
          width: "20%",
          marginTop: "100px",
        }}
      >
        <img
          src={emptyInvoice}
          alt="emptyinvoice"
          style={{ width: "100%", margin: "auto" }}
        />
      </div>
    </div>
  );
}

export default EmptyInvioce;
