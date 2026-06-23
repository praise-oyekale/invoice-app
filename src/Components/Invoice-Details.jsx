// import { useMemo } from "react";
import BackWardButton from "./BackWard-Button";
import "../StylingFiles/invoice-details.css";
import FormFooter, { ActionButtons } from "./FormFooter";
// import { useState } from "react";

function InvoiceDetails({
  setViewingInvoiceId,
  formMode,
  setFormMode,
  currentInvoice,
  setShowModel,
  showModel,
  onDeleteInvoice,
  onMarkAsPaid,
}) {
  if (!currentInvoice) return <p>Invoice not found.</p>;

  const statusStyles = {
    Paid: { bg: "var(--color-paid-bg)", text: "var(--color-paid-text)" },
    Pending: {
      bg: "var(--color-pending-bg)",
      text: "var(--color-pending-text)",
    },
    Draft: { bg: "var(--color-draft-bg)", text: "var(--color-draft-text)" },
  };

  const currentStatusColor =
    statusStyles[currentInvoice.status] || "var(--color-darft)";

  return (
    <div className="details-view-container">
      <BackWardButton
        setViewingInvoiceId={setViewingInvoiceId}
        formMode={formMode}
        setFormMode={setFormMode}
      />

      <div className="details-view-status-container">
        <div className="statuses-container">
          <span
            className="details-status-text"
            style={{
              fontWeight: "500",
              fontSize: "13px",
              letterSpacing: "-0.1px",
            }}
          >
            Status
          </span>
          <button
            className="details-status-pill"
            style={{
              backgroundColor: currentStatusColor.bg,
              color: currentStatusColor.text,
            }}
          >
            <strong
              style={{
                width: "2px",
                height: "2px",
                backgroundColor:
                  currentInvoice.status === "Paid"
                    ? "#33D69F"
                    : currentInvoice.status === "Pending"
                      ? "#FF8F00"
                      : "#373B53",
                borderRadius: "50px",
                padding: "4px",
              }}
            ></strong>
            <h5>{currentInvoice.status} </h5>
          </button>
        </div>

        <div>
          <ActionButtons
            setFormMode={setFormMode}
            formMode={formMode}
            setShowModel={setShowModel}
            currentInvoice={currentInvoice}
            onMarkAsPaid={onMarkAsPaid}
          />
        </div>
      </div>

      <div className="details-view-items-container">
        <div className="addresses">
          <div className="decrp-id">
            <h5>
              <span style={{ color: "#7E88C3" }}>#</span>
              {currentInvoice.id}
            </h5>
            <p
              style={{
                fontFamily: "sans-serif",
                fontSize: "13px",
                marginTop: "5px",
              }}
            >
              {currentInvoice.projectDescription}
            </p>
          </div>
          <div className="addresses-sec">
            <p className="streetname">{currentInvoice.senderAddress.street}</p>
            <p style={{ fontSize: "13px" }}>
              {currentInvoice.senderAddress.city}
            </p>
            <p style={{ fontSize: "13px" }}>
              {currentInvoice.senderAddress.postCode}
            </p>
            <p style={{ fontSize: "13px" }}>
              {currentInvoice.senderAddress.country}
            </p>
          </div>
        </div>

        <div className="billTo">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div>
              <div className="invoice-creation-date">
                <h5 style={{ fontSize: "13px" }}>Invoice Date</h5>
                <h4 style={{ fontSize: "15px", marginTop: "10px" }}>
                  {currentInvoice.createdAt}
                </h4>
              </div>

              <div style={{ marginTop: "45px" }}>
                <h5 style={{ fontSize: "13px" }}>Payment Due</h5>
                <h4 style={{ fontSize: "15px", marginTop: "10px" }}>
                  {currentInvoice.paymentDue}
                </h4>
              </div>
            </div>

            <div className="billTo-address">
              <h5 style={{ fontSize: "13px" }}>Bill To</h5>
              <h4 style={{ fontSize: "15px", marginTop: "10px" }}>
                {currentInvoice.clientName}
              </h4>

              <p
                style={{
                  marginTop: "25px",

                  fontSize: "13px",
                }}
              >
                {currentInvoice.clientAddress.street}
              </p>
              <p style={{ fontSize: "13px" }}>
                {currentInvoice.clientAddress.city}
              </p>
              <p style={{ fontSize: "13px" }}>
                {currentInvoice.clientAddress.postCode}
              </p>
              <p style={{ fontSize: "13px" }}>
                {currentInvoice.clientAddress.country}
              </p>
            </div>
            <div className="client-Email-desktop">
              <h5 style={{ color: "#7E88C3", fontSize: "13px" }}>Sent To</h5>
              <h5 style={{ fontSize: "15px", marginTop: "10px" }}>
                {currentInvoice.clientEmail}
              </h5>
            </div>
          </div>
          <div className="client-Email-phone">
            <h5 style={{ color: "#7E88C3", fontSize: "13px" }}>Sent To</h5>
            <h5 style={{ fontSize: "15px", marginTop: "10px" }}>
              {currentInvoice.clientEmail}
            </h5>
          </div>
        </div>

        <div className="details-items-container">
          <div className="invoice-items-header">
            <div className="header-name">Item Name</div>
            <div className="header-qty">Qty.</div>
            <div className="header-price">Price</div>
            <div className="header-total">Total</div>
          </div>

          {
            currentInvoice.items && currentInvoice.items.map((item, index) => (
              <div key={index} className="details-items-row">

                <div className="item-name-block">
                  <h5 style={{fontSize: '15px', marginTop: '10px'}}>{item.name}</h5>
                </div>

                <div className="item-mobile-meta">
                   <p style={{color:'#7E88C3', fontWeight: '700', marginTop: '5px'}}>{item.quantity} x £ {Number(item.price).toFixed(2)}</p> 
                </div>

                {/* Desktop Variant: separate quantity & Price block */}
                <div className="item-qty-block">
                  <span>{item.quantity}</span>
                </div>
                <div className="item-price-block">
                  <span>£ {Number(item.price).toFixed(2)}</span>
                </div>

                {/* Total Price (visible pn both layout) */}

                <div className="item-total-block">
                  <h4 style={{ fontSize: '15px' }}>
                    £ {Number(item.total).toFixed(2)}
                  </h4>
                </div>

              </div>
            ) )
          }
        </div>

        <div className="total-payment-details">
          <p className="total-label">Grand Total</p>
          <h2 className="total-amount"> £ {Number(currentInvoice.total).toFixed(2)}</h2>
        </div>
      </div>

      {showModel && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Confirm Delete</h2>
            <p>
              Are you sure you want to delete invoice #{currentInvoice.id}? This
              action cannot be undone.
            </p>

            <div className="modal-actions">
              <button
                onClick={() => setShowModel(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                className="confirm-delete-btn"
                onClick={() => onDeleteInvoice(currentInvoice.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <FormFooter
        formMode={formMode}
        setFormMode={setFormMode}
        setShowModel={setShowModel}
        currentInvoice={currentInvoice}
        onMarkAsPaid={onMarkAsPaid}
      />
    </div>
  );
}

export default InvoiceDetails;
