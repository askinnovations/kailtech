import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "utils/axios";
import { toast } from "sonner";
import { Button, Input, Select } from "components/ui";
import { Page } from "components/shared/Page";
import ReactSelect from "react-select";

export default function AddCustomer() {
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [ctRes, pmRes, countryRes, stateRes] = await Promise.all([
          axios.get("/people/get-customer-type-list"),
          axios.get("/people/get-payment-mode"),
          axios.get("/people/get-country"),
          axios.get("/people/get-state"),
        ]);

        console.log("Customer Types:", ctRes?.data);
        console.log("Payment Modes:", pmRes?.data);
        console.log("Countries:", countryRes?.data);
        console.log("States:", stateRes?.data);

        // ✅ Fix: Correct response paths
        const ctData = Array.isArray(ctRes?.data?.Data) ? ctRes.data.Data : [];
        const pmData = Array.isArray(pmRes?.data?.data) ? pmRes.data.data : [];
        const countryData = Array.isArray(countryRes?.data?.data) ? countryRes.data.data : [];
        const stateData = Array.isArray(stateRes?.data?.data) ? stateRes.data.data : [];

        // ✅ Mapping for dropdowns
        setCustomerTypeOptions(
          ctData.map((item) => ({ label: item.name, value: item.id }))
        );
        setPaymentModes(
          pmData.map((item) => ({ label: item.name, value: item.id }))
        );
        setCountries(
          countryData.map((item) => ({ label: item.name, value: item.id }))
        );
        
        setStates(
          stateData.map((item) => ({ label: item.state, value: item.id }))
        );

      } catch (err) {
        toast.error("Error loading dropdown data");
        console.error("Dropdown Fetch Error:", err);
      }
    };

    fetchDropdowns();
  }, []);

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
    setLoading(true);

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "customertype") {
          value.forEach((v) => payload.append("customertype[]", v));
        } else {
          payload.append(key, value);
        }
      });

      const res = await axios.post("/people/add-customer", payload);
      if (res.data.status === "true") {
        toast.success("Customer added successfully ✅");
        navigate("/dashboards/people/customers");
      } else {
        toast.error(res.data.message || "Failed to add customer ❌");
      }
    } catch (err) {
      toast.error("Something went wrong ❌");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Add Customers">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Add Customer</h2>
          <Button
            variant="outline"
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/dashboards/people/customers")}
          >
            Back to List
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Customer Name" name="name" onChange={handleInputChange} required />

          {/* ✅ Customer Type - Multi Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Type</label>
            <ReactSelect
              isMulti
              name="customertype"
              options={customerTypeOptions}
              onChange={(selected) => handleMultiSelectChange(selected, "customertype")}
              placeholder="Select customer types"
            />
          </div>

          {/* ✅ Payment Mode */}
          <Select label="Mode of Payment" name="modeofpayment" onChange={(e) => handleSelectChange(e, "modeofpayment")} required>
            <option value="">Choose...</option>
            {paymentModes.map((mode) => (
              <option key={mode.value} value={mode.value}>
                {mode.label}
              </option>
            ))}
          </Select>

          <Input label="Credit Days" name="creditdays" type="number" onChange={handleInputChange} />
          <Input label="Credit Amount" name="creditamount" type="number" onChange={handleInputChange} />
          <Input label="Mobile" name="mobile" onChange={handleInputChange} />
          <Input label="Contact Person Name" name="pname" onChange={handleInputChange} />
          <Input label="Contact Person Number" name="pnumber" onChange={handleInputChange} />
          <Input label="Email" name="email" type="email" onChange={handleInputChange} />

          {/* ✅ Country */}
          <Select label="Country*" name="country" onChange={(e) => handleSelectChange(e, "country")} required>
            <option value="">Choose one...</option>
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </Select>

          {/* ✅ State */}
          <Select label="State*" name="stateid" onChange={(e) => handleSelectChange(e, "stateid")} required>
            <option value="">Choose state...</option>
            {states.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </Select>

          <Input label="City" name="city" onChange={handleInputChange} />
          <Input label="GST No" name="gstno" onChange={handleInputChange} />
          <Input label="PAN" name="pan" onChange={handleInputChange} />
          <Input label="Discount %" name="discount" type="number" onChange={handleInputChange} />
          

          {/* ✅ Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Photo</label>
            <input
              type="file"
              name="thumb_image"
              accept="image/*"
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary-600 file:text-white hover:file:bg-primary-700"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <Button type="submit" color="primary" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </Page>
  );
}
