import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Input, Select } from "components/ui";
import { Page } from "components/shared/Page";
import axios from "utils/axios";
import { toast } from "sonner";

export default function AddSubcategory() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    category: "",
    type: "",
    instrumenttype: "",
    name: "",
    hsn: "",
    critical: "0", // default no
    unit: "",
    expiry: "",
    reorder: "",
    min: "",
    tax: "",
    cost: "",
  });

  // dropdowns
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [instrumentTypes, setInstrumentTypes] = useState([]);
  const [units, setUnits] = useState([]);
  const [taxSlabs, setTaxSlabs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cat, typ, inst, unit, tax] = await Promise.all([
          axios.get("/inventory/category-list"),
          axios.get("/get-type"),
          axios.get("/get-instrument-type"),
          axios.get("/master/units-list"),
          axios.get("/master/get-taxslab-list"),
        ]);
      
        setCategories(cat.data.data || []);
        setTypes(typ.data.data || []);
        setInstrumentTypes(inst.data.data || []);
        setUnits(unit.data.data || []);
        setTaxSlabs(tax.data.data || []);
        
      } catch (err) {
        toast.error("Error loading dropdown data");
        console.error("Dropdown Fetch Error:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        form.append(key, value),
      );

      await axios.post("/inventory/subcategory-create", form);

      toast.success("Subcategory created successfully ✅", {
        duration: 1000,
        icon: "✅",
      });

      navigate("/dashboards/inventory/subcategories");
    } catch (err) {
      console.error("Error creating subcategory:", err);
      toast.error(err?.response?.data?.message || "Failed to create ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Add Subcategory">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add Subcategory</h2>
          <Button
            variant="outline"
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => navigate("/dashboards/inventory/subcategories")}
          >
            Back
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>

          <Select
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Type --</option>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </Select>

          <Select
            label="Instrument Type"
            name="instrumenttype"
            value={formData.instrumenttype}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Instrument Type --</option>
            {instrumentTypes.map((ins) => (
              <option key={ins.id} value={ins.id}>
                {ins.name}
              </option>
            ))}
          </Select>

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
            label="Critical"
            name="critical"
            value={formData.critical}
            onChange={handleChange}
            required
          >
            <option value="1">Yes</option>
            <option value="0">No</option>
          </Select>

          <Select
            label="Unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Unit --</option>
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </Select>

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
          <Select
            label="Tax Slab"
            name="tax"
            value={formData.tax}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Tax --</option>
            {taxSlabs.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </Select>
          <Input
            label="Cost"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            required
          />

          <Button type="submit" color="primary" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
                  />
                </svg>
                Saving...
              </div>
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </div>
    </Page>
  );
}
