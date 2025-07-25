import { useNavigate } from "react-router";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";
import { useState } from "react";
import axios from "utils/axios";
import { toast } from "sonner";

export default function AddPromoter() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    pname: "",
    pnumber: "",
    email: "",
    city: "",
    state: "",
    gstno: "",
    pan: "",
    discount: "",
    thumb_image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }

      await axios.post("/people/add-promoter", form);

      toast.success("Promoter added successfully ✅", { duration: 1000 });
      navigate("/dashboards/people/promoters");
    } catch (err) {
      console.error("Error:", err);
      toast.error(err?.response?.data?.message || "Failed to add promoter ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Add Promoter">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Add Promoter</h2>
          <Button
            variant="outline"
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/dashboards/people/promoters")}
          >
            Back to List
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Promoter Name" name="name" placeholder="Promoter name" onChange={handleChange} required />
          <Input label="Mobile" name="mobile" placeholder="Mobile No." type="tel" onChange={handleChange} required />

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Address</label>
            <textarea
              name="address"
              placeholder="Address"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:border-primary-500"
              rows="3"
              required
              onChange={handleChange}
            ></textarea>
          </div>

          <Input label="Contact Person Name" name="pname" placeholder="Contact Person name" onChange={handleChange} />
          <Input label="Contact Person Number" name="pnumber" placeholder="Contact Person Number" type="tel" onChange={handleChange} />
          <Input label="Email" name="email" placeholder="Email Address" type="email" onChange={handleChange} />
          <Input label="City" name="city" placeholder="City" onChange={handleChange} />
          <Input label="State" name="state" placeholder="State" onChange={handleChange} />
          <Input label="GST No" name="gstno" placeholder="GST No" onChange={handleChange} />
          <Input label="PAN No" name="pan" placeholder="PAN No" onChange={handleChange} />
          <Input label="Discount %" name="discount" placeholder="Discount %" type="number" onChange={handleChange} />

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Upload Photo
            </label>
            <input
              type="file"
              name="thumb_image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary-600 file:text-white hover:file:bg-primary-700"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <Button type="submit" color="primary" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"></path>
                  </svg>
                  Saving...
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Page>
  );
}
