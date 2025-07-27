import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button, Input, Select } from "components/ui";
import { Page } from "components/shared/Page";
import axios from "utils/axios";
import { toast } from "sonner";

export default function EditSubcategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    category: "",
    type: "",
    instrumenttype: "",
    name: "",
    hsn: "",
    critical: "0",
    unit: "",
    expiry: "",
    reorder: "",
    min: "",
    tax: "",
    cost: "",
  });

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [instrumentTypeOptions, setInstrumentTypeOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [taxOptions, setTaxOptions] = useState([]);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [cat, typ, inst, unit, tax] = await Promise.all([
          axios.get("/inventory/category-list"),
          axios.get("/get-type"),
          axios.get("/get-instrument-type"),
          axios.get("/master/units-list"),
          axios.get("/master/get-taxslab-list"),
        ]);

        setCategoryOptions(
          (cat.data.data || []).map((c) => ({ label: c.name, value: c.id })),
        );
        setTypeOptions(
          (typ.data.data || []).map((t) => ({ label: t.name, value: t.id })),
        );
        setInstrumentTypeOptions(
          (inst.data.data || []).map((i) => ({ label: i.name, value: i.id })),
        );
        setUnitOptions(
          (unit.data.data || []).map((u) => ({ label: u.name, value: u.id })),
        );
        setTaxOptions(
          (tax.data.data || []).map((t) => ({
            label: `${t.name} (${t.percentage}%)`,
            value: t.id,
          })),
        );
      } catch (err) {
        console.error("Error loading dropdowns:", err);
        toast.error("Failed to load dropdowns");
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/inventory/subcategory-byid/${id}`);
        const result = response.data;

        if (result.status === "true" && result.data) {
          setFormData({
            category: result.data.category?.toString() || "",
            type: result.data.type?.toString() || "",
            instrumenttype: result.data.instrumenttype?.toString() || "",
            name: result.data.name || "",
            hsn: result.data.hsn || "",
            critical: result.data.critical?.toString() || "0",
            unit: result.data.unit?.toString() || "",
            expiry: result.data.expiry?.toString() || "",
            reorder: result.data.reorder?.toString() || "",
            min: result.data.min?.toString() || "",
            tax: result.data.tax?.toString() || "",
            cost: result.data.cost?.toString() || "",
          });
        } else {
          toast.error(result.message || "Failed to load data");
        }
      } catch (err) {
        console.error("Error fetching subcategory by ID:", err);
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchDropdowns();
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Custom Select change handler
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          form.append(key, value);
        }
      });

      const response = await axios.post(
        `/inventory/subcategory-update/${id}`,
        form,
      );
      const result = response.data;

      if (result.status === "true") {
        toast.success("Subcategory updated successfully ✅");
        navigate("/dashboards/inventory/subcategories");
      } else {
        toast.error(result.message || "Update failed ❌");
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Error during update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Edit Subcategory">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Edit Subcategory</h2>
          <Button
            variant="outline"
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => navigate("/dashboards/inventory/subcategories")}
          >
            Back
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Subcategory Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            label="HSN"
            name="hsn"
            value={formData.hsn}
            onChange={handleChange}
            required
          />

          <Select
            name="category"
            label="Category"
            data={categoryOptions}
            value={formData.category}
            onChange={(val) => handleSelectChange("category", val)}
          />

          <Select
            name="type"
            label="Type"
            data={typeOptions}
            value={formData.type}
            onChange={(val) => handleSelectChange("type", val)}
            required
          />
          <Select
            name="instrumenttype"
            label="Instrument Type"
            data={instrumentTypeOptions}
            value={formData.instrumenttype}
            onChange={(val) => handleSelectChange("instrumenttype", val)}
            required
          />
          <Select
            name="unit"
            label="Unit"
            data={unitOptions}
            value={formData.unit}
            onChange={(val) => handleSelectChange("unit", val)}
            required
          />
          <Select
            name="tax"
            label="Tax Slab"
            data={taxOptions}
            value={formData.tax}
            onChange={(val) => handleSelectChange("tax", val)}
            required
          />
          
          <Select
            name="critical"
            label="Critical"
            data={[
              { label: "Yes", value: "1" },
              { label: "No", value: "0" },
            ]}
            value={formData.critical}
            onChange={(val) => handleSelectChange("critical", val)}
          />

          <Input
            label="Expiry"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            required
          />
          <Input
            label="Reorder Level"
            name="reorder"
            value={formData.reorder}
            onChange={handleChange}
            required
          />
          <Input
            label="Min Level"
            name="min"
            value={formData.min}
            onChange={handleChange}
            required
          />
          <Input
            label="Cost"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            required
          />

          <Button type="submit" color="primary" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>
    </Page>
  );
}
