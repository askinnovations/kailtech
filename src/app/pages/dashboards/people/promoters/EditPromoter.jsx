import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";
import axios from "utils/axios";
import { toast } from "sonner";

export default function EditPromoter() {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchPromoter = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/people/get-promoter/${id}`);
        const result = response.data;

        if (result.status === "true" && result.data) {
          setFormData({
            name: result.data.name || "",
            mobile: result.data.mobile || "",
            address: result.data.address || "",
            pname: result.data.contact_person_name || "",
            pnumber: result.data.contact_person_number || "",
            email: result.data.email || "",
            city: result.data.city || "",
            state: result.data.state || "",
            gstno: result.data.gst_no || "",
            pan: result.data.pan_no || "",
            discount: result.data.discount || "",
            thumb_image: null,
          });
        } else {
          toast.error(result.message || "Failed to load promoter data.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Something went wrong while loading data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPromoter();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "thumb_image" && value instanceof File) {
          form.append(key, value);
        } else {
          form.append(key, value);
        }
      });

      const response = await axios.post(`/people/update-promoter/${id}`, form);
      const result = response.data;
      console.log( response.data)

      if (result.status === "true") {
        toast.success(result.message || "Promoter updated successfully ✅");
        navigate("/dashboards/people/promoters");
      } else {
        toast.error(result.message || "Failed to update promoter ❌");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Something went wrong while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Edit Promoter">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Edit Promoter
          </h2>
          <Button
            variant="outline"
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/dashboards/people/promoters")}
          >
            Back to List
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Promoter Name" name="name" value={formData.name} onChange={handleChange} required />
          <Input label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} required />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:border-primary-500"
              required
            />
          </div>
          <Input label="Contact Person Name" name="pname" value={formData.pname} onChange={handleChange} />
          <Input label="Contact Person Number" name="pnumber" value={formData.pnumber} onChange={handleChange} />
          <Input label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />
          <Input label="City" name="city" value={formData.city} onChange={handleChange} />
          <Input label="State" name="state" value={formData.state} onChange={handleChange} />
          <Input label="GST No" name="gstno" value={formData.gstno} onChange={handleChange} />
          <Input label="PAN No" name="pan" value={formData.pan} onChange={handleChange} />
          <Input label="Discount %" name="discount" value={formData.discount} onChange={handleChange} type="number" />

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Upload Photo</label>
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
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                  Updating...
                </div>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Page>
  );
}
