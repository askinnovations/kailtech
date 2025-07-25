// EditCustomer.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "utils/axios";
import { toast } from "sonner";
import { Button, Input, Select } from "components/ui";
import { Page } from "components/shared/Page";
import ReactSelect from "react-select";

export default function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    customertype: [],
    modeofpayment: "",
    creditdays: "",
    creditamount: "",
    mobile: "",
    pname: "",
    pnumber: "",
    email: "",
    country: "",
    stateid: "",
    city: "",
    gstno: "",
    pan: "",
    discount: "",
    thumb_image: null
  });

  const [customerTypeOptions, setCustomerTypeOptions] = useState([]);
  const [paymentModes, setPaymentModes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchDropdownsAndCustomer = async () => {
      try {
        const [ctRes, pmRes, countryRes, stateRes, customerRes] = await Promise.all([
          axios.get("/people/get-customer-type-list"),
          axios.get("/people/get-payment-mode"),
          axios.get("/people/get-country"),
          axios.get("/people/get-state"),
          axios.get(`/people/get-single-customer/${id}`)
        ]);

        const ctData = Array.isArray(ctRes?.data?.Data) ? ctRes.data.Data : [];
        const pmData = Array.isArray(pmRes?.data?.data) ? pmRes.data.data : [];
        const countryData = Array.isArray(countryRes?.data?.data) ? countryRes.data.data : [];
        const stateData = Array.isArray(stateRes?.data?.data) ? stateRes.data.data : [];

        setCustomerTypeOptions(ctData.map((item) => ({ label: item.name, value: item.id })));
        setPaymentModes(pmData.map((item) => ({ label: item.name, value: item.id })));
        setCountries(countryData.map((item) => ({ label: item.name, value: item.id })));
        setStates(stateData.map((item) => ({ label: item.state, value: item.id })));

        const customer = customerRes?.data?.data || {};
        setFormData({
          name: customer.name || "",
          customertype: customer.customertype || [],
          modeofpayment: customer.modeofpayment || "",
          creditdays: customer.creditdays || "",
          creditamount: customer.creditamount || "",
          mobile: customer.mobile || "",
          pname: customer.pname || "",
          pnumber: customer.pnumber || "",
          email: customer.email || "",
          country: customer.country || "",
          stateid: customer.stateid || "",
          city: customer.city || "",
          gstno: customer.gstno || "",
          pan: customer.pan || "",
          discount: customer.discount || "",
          thumb_image: null
        });
      } catch (err) {
        toast.error("Failed to load data ❌");
        console.error(err);
      }
    };

    fetchDropdownsAndCustomer();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelectChange = (selectedOptions, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOptions ? selectedOptions.map((opt) => opt.value) : []
    }));
  };

  const handleSelectChange = (e, name) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "customertype") {
        if (Array.isArray(value)) {
          value.forEach((v) => {
            payload.append("customertype[]", v);
          });
        } else {
          payload.append("customertype[]", value);
        }
      } else if (key === "thumb_image") {
        if (value instanceof File) {
          // Optional: Check image type before appending
          const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
          if (allowedTypes.includes(value.type)) {
            payload.append("thumb_image", value);
          } else {
            console.warn("Invalid image file type.");
          }
        } else {
          console.warn("thumb_image is not a valid File object.");
        }
      } else {
        payload.append(key, value);
      }
    });


    const res = await axios.post(`/people/update-customer/${id}`, payload);

    if (res.data.status === "true") {
      toast.success("Customer updated successfully ✅");
      navigate("/dashboards/people/customers");
    } else {
      toast.error(res.data.message || "Update failed ❌");
    }
  } catch (err) {
    toast.error("Error updating customer ❌");
    console.error(err);
  }
};


  return (
    <Page title="Edit Customer">
      <div className="p-6">
      <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Edit Customer</h2>
          <Button
            variant="outline"
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/dashboards/people/customers")}
          >
            Back to List
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Customer Name" name="name" value={formData.name} onChange={handleInputChange} required />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer </label>
            <ReactSelect
              isMulti
              value={customerTypeOptions.filter((opt) => formData.customertype.includes(opt.value))}
              name="customertype"
              options={customerTypeOptions}
              onChange={(selected) => handleMultiSelectChange(selected, "customertype")}
            />
          </div>

          <Select label="Mode of Payment" name="modeofpayment" value={formData.modeofpayment} onChange={(e) => handleSelectChange(e, "modeofpayment")}> 
            <option value="">Choose...</option>
            {paymentModes.map((mode) => (
              <option key={mode.value} value={mode.value}>{mode.label}</option>
            ))}
          </Select>

          <Input label="Credit Days" name="creditdays" value={formData.creditdays} onChange={handleInputChange} />
          <Input label="Credit Amount" name="creditamount" value={formData.creditamount} onChange={handleInputChange} />
          <Input label="Mobile" name="mobile" value={formData.mobile} onChange={handleInputChange} />
          <Input label="Contact Person Name" name="pname" value={formData.pname} onChange={handleInputChange} />
          <Input label="Contact Person Number" name="pnumber" value={formData.pnumber} onChange={handleInputChange} />
          <Input label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />

          <Select label="Country" name="country" value={formData.country} onChange={(e) => handleSelectChange(e, "country")}>
            <option value="">Choose...</option>
            {countries.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </Select>

          <Select label="State" name="stateid" value={formData.stateid} onChange={(e) => handleSelectChange(e, "stateid")}>
            <option value="">Choose...</option>
            {states.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </Select>

          <Input label="City" name="city" value={formData.city} onChange={handleInputChange} />
          <Input label="GST No" name="gstno" value={formData.gstno} onChange={handleInputChange} />
          <Input label="PAN" name="pan" value={formData.pan} onChange={handleInputChange} />
          <Input label="Discount" name="discount" value={formData.discount} onChange={handleInputChange} />
          

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Photo</label>
            <input type="file" name="thumb_image" accept="image/*" onChange={handleInputChange} />
          </div>

          <div className="col-span-2">
            <Button type="submit" color="primary">Update</Button>
          </div>
        </form>
      </div>
    </Page>
  );
}
