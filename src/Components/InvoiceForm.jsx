import "../StylingFiles/invoice-form.css";
import { useState } from "react";
import trashBtn from "../assets/trashBtn.svg";
import FormFooter from "./FormFooter";
import BackWardButton from "./BackWard-Button";

// import { data } from "react-router-dom";

function InvoiceForm({
  formMode,
  existingInvoice,
  setFormMode,
  setViewingInvoiceId,
  onSaveInvoice
}) {
  const [formData, setFormData] = useState({
    id: formMode === "edit" ? existingInvoice?.id : "",
    createdAt: formMode === "edit" ? existingInvoice.createdAt : "",
    paymentTerms: formMode === "edit" ? existingInvoice.paymentTerms : 30,
    projectDescription:
      formMode === "edit" ? existingInvoice.projectDescription : "",
    clientName: formMode === "edit" ? existingInvoice.clientName : "",
    clientEmail: formMode === "edit" ? existingInvoice?.clientEmail : "",
    status: formMode === "edit" ? existingInvoice.status : "Pending",
    paymentDue: formMode === "edit" ? existingInvoice.paymentDue : "",

    senderAddress:
      formMode === "edit"
        ? existingInvoice.senderAddress
        : {
            street: "",
            city: "",
            postCode: "",
            country: "",
          },

    clientAddress:
      formMode === "edit"
        ? existingInvoice.clientAddress
        : {
            street: "",
            city: "",
            postCode: "",
            country: "",
          },

    items: formMode === "edit" ? existingInvoice.items : [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e, addressType) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [addressType]: {
        ...prev[addressType],
        [name]: value,
      },
    }));
  };

  const calculateDueDate = (createdAt, termDays) => {
    if (!createdAt) return "";

    const date = new Date(createdAt);

    const daysToAdd = termDays ? parseInt(termDays, 10) : 0;

    if (isNaN(daysToAdd)) return "";

    date.setDate(date.getDate() + daysToAdd);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleAddItems = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: 1, price: 0, total: 0 }],
    }));
  };

  const handleItemsInputChange = (e, index) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedItems = [...prev.items];

      updatedItems[index] = {
        ...updatedItems[index],
        [name]: value,
      };
      if (name === "quantity" || name === "price") {
        const qty = Number(updatedItems[index].quantity) || 0;
        const prc = Number(updatedItems[index].price) || 0;
        updatedItems[index].total = qty * prc;
      }
      return {
        ...prev,
        items: updatedItems,
      };
    });
  };

  const handleDeleteItem = (indexToDelete) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, index) => index !== indexToDelete),
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    // if (!formData.clientName || !formData.createdAt) {
    //   alert("Please fill the client name and invoice date!");
    //   return;
    // }

    const completedInvoicePayLoad = {
      ...formData,
      paymentDue: calculateDueDate(formData.createdAt, formData.paymentTerms),
      items: formData.items.map(item => ({
        ...item,
        quantity: Number(item.quantity),
        price: Number(item.price),
        total: Number(item.total)
      })),
      total: formData.items.reduce((sum, item) => sum + (Number(item.total) || 0), 0)
    };

    onSaveInvoice(completedInvoicePayLoad);
  }



  return (
    <div className="invoice-form-overlay" onClick={onclose}>
      <div className="invoice-form-container">
        <BackWardButton
          setViewingInvoiceId={setViewingInvoiceId}
          formMode={formMode}
          setFormMode={setFormMode}
        />
        {/* <h3 className="form-heading">
          {formMode === "create" ? "New Invoice" : `Edit #${existingInvoice.id}`}
        </h3> */}
        <form onSubmit={handleSubmit}>
          <h3 className="form-heading">
          {formMode === "create" ? "New Invoice" : `Edit #${existingInvoice.id}`}
        </h3>
          <h6 style={{ marginTop: "15px", color: "blue" }}>Bill From</h6>
          <div className="forms-label-inputContainer">
            <label className="form-label">Street Address</label>
            <input
              type="text"
              name="street"
              value={formData.senderAddress.street}
              onChange={(e) => handleAddressChange(e, "senderAddress")}
              className="full-width-input"
            />
          </div>
          <div className="city-inputs-container">
            <div className="input-city-container">
              <label className="form-label">City</label>
              <input
                name="city"
                value={formData.senderAddress.city}
                onChange={(e) => handleAddressChange(e, "senderAddress")}
                type="text"
                className="city-input"
              />
            </div>
            <div className="input-city-container">
              <label className="form-label">Post Code</label>
              <input
                name="postCode"
                value={formData.senderAddress.postCode}
                onChange={(e) => handleAddressChange(e, "senderAddress")}
                type="text"
                className="city-input"
              />
            </div>
          </div>
          <div className="forms-label-inputContainer">
            <label className="form-label">Country</label>
            <input
              type="text"
              name="country"
              value={formData.senderAddress.country}
              onChange={(e) => handleAddressChange(e, "senderAddress")}
              className="full-width-input"
            />
          </div>
          <h6 style={{ marginTop: "15px", color: "blue" }}>Bill To</h6>
          <div className="forms-label-inputContainer">
            <label className="form-label">Client's Name</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleInputChange}
              className="full-width-input"
            />
          </div>
          <div className="forms-label-inputContainer">
            <label className="form-label">Client's Email</label>
            <input
              type="text"
              name="clientEmail"
              value={formData.clientEmail}
              onChange={handleInputChange}
              className="full-width-input"
            />
          </div>
          <div className="forms-label-inputContainer">
            <label className="form-label">Street Address</label>
            <input
              type="text"
              name="street"
              value={formData.clientAddress.street}
              onChange={(e) => handleAddressChange(e, "clientAddress")}
              className="full-width-input"
            />
          </div>
          <div className="city-inputs-container">
            <div className="input-city-container">
              <label className="form-label">City</label>
              <input
                name="city"
                value={formData.clientAddress.city}
                onChange={(e) => handleAddressChange(e, "clientAddress")}
                type="text"
                className="city-input"
              />
            </div>
            <div className="input-city-container">
              <label className="form-label">Post Code</label>
              <input
                name="postCode"
                value={formData.clientAddress.postCode}
                onChange={(e) => handleAddressChange(e, "clientAddress")}
                type="text"
                className="city-input"
              />
            </div>
          </div>
          <div className="forms-label-inputContainer">
            <label className="form-label">Street Address</label>
            <input
              type="text"
              name="country"
              value={formData.clientAddress.country}
              onChange={(e) => handleAddressChange(e, "clientAddress")}
              className="full-width-input"
            />
          </div>
          <div className="forms-label-inputContainer">
            <label className="form-label" style={{ marginTop: "10px" }}>
              Invoice Date
            </label>
            <input
              type="date"
              className="full-width-input"
              name="createdAt"
              value={formData.createdAt}
              onChange={handleInputChange}
            />
          </div>
          <div className="forms-label-inputContainer">
            <label className="form-label">Payment Term</label>
            <select
              id="paymentTerms"
              name="paymentTerms"
              value={formData.paymentTerms}
              onChange={handleInputChange}
              className="full-width-input"
            >
              <option value={7}>Net 7 Day</option>
              <option value={14}>Net 14 Day</option>
              <option value={30}>Net 30 Day</option>
              <option value={60}>Net 60 Days</option>
            </select>
          </div>
          <div className="forms-label-inputContainer">
            <label className="form-label">Payment Due</label>
            <input
              type="date"
              name="paymentDue"
              value={calculateDueDate(formData.createdAt, formData.paymentTerms)}
              readOnly
              className="full-width-input"
            />
          </div>
          <div className="forms-label-inputContainer">
            <label className="form-label">Project Description</label>
            <input
              type="text"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleInputChange}
              className="full-width-input"
            />
          </div>
          <h6 style={{ marginTop: "30px", color: "#777F98", fontSize: "18px" }}>
            Item List
          </h6>
          {formData.items.map((item, index) => (
            <div key={index} style={{marginBottom: '60px'}}>
              <div className="forms-label-inputContainer">
                <label className="form-label">Item Name</label>
                <input
                  type="text"
                  name="name"
                  value={item.name}
                  onChange={(e) => handleItemsInputChange(e, index)}
                  className="full-width-input"
                />
              </div>
              <div className="item-list-prices" >
                <div className="forms-label-inputContainer">
                  <label className="form-label">Qty.</label>
                  <input
                    type="text"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemsInputChange(e, index)}
                    className="item-price-input"
                  />
                </div>
                <div className="forms-label-inputContainer">
                  <label className="form-label">Price</label>
                  <input
                    type="text"
                    name="price"
                    value={item.price}
                    onChange={(e) => handleItemsInputChange(e, index)}
                    className="item-price-input"
                  />
                </div>
                <div className="forms-label-inputContainer">
                  <label className="form-label">Total</label>
                  <input
                    type="text"
                    name="total"
                    value={item.total.toFixed(2)}
                    readOnly
                    className="item-price-input"
                    style={{ border: "none", background: "transparent", color: '#7E88C3' }}
                  />
                </div>
                <div className="forms-label-inputContainer">
                  <label className="form-label"></label>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      marginTop: "15px",
                    }}
                    onClick={() => handleDeleteItem(index)}
                  >
                    {" "}
                    <img src={trashBtn} alt="trashbtn" />{" "}
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
          className="add-itm-btn"
            style={{
              marginBottom: "100px",
              marginTop: "50px",
              width: "100%",
              border: "none",
              padding: "15px",
              borderRadius: "24px",
              color: "#7E88C3",
              fontSize: "15px",
              fontWeight: "700",
              cursor:"pointer"
            }}
            onClick={() => {
      
              if (formData.items.length >= 4) {
                return console.log('iTEMS cant be more than two')
              }
              handleAddItems()
            } }
            type="button"
          >
            + Add New Item
          </button>
          <FormFooter formMode={formMode} setFormMode={setFormMode} setViewingInvoiceId={setViewingInvoiceId} />
        </form>
      </div>
    </div>
  );
}

export default InvoiceForm;
