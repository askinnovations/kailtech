// 📦 imports remain unchanged
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "utils/axios";
import { toast } from "sonner";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";
import ReactSelect from "react-select";

export default function AddInstrument() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    sop: [],
    standard: [],
    typeofsupport: [],
    typeofmaster:[],
    description: "",
    discipline: "",
    group: "",
    remark: "",
  });

  const [sopOptions, setSopOptions] = useState([]);
  const [standardOptions, setStandardOptions] = useState([]);
  const [subcategoryOne, setSubcategoryOne] = useState([]);
  const [subcategoryTwo, setSubcategoryTwo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [sopRes, standardRes, subcategoryoneRes, subcategorytwoRes] =
          await Promise.all([
            axios.get("/calibrationoperations/calibration-method-list"),
            axios.get("/calibrationoperations/calibration-standard-list"),
            axios.get("/inventory/subcategory-list"),
            axios.get("/inventory/subcategory-list"), // ✅ Added this line to fix Type of Master issue
          ]);

        const sopData = Array.isArray(sopRes?.data?.data)
          ? sopRes.data.data
          : [];

        const standardData = Array.isArray(standardRes?.data?.data)
          ? standardRes.data.data
          : [];

        const subcategoryoneData = Array.isArray(subcategoryoneRes?.data?.data)
          ? subcategoryoneRes.data.data
          : [];

        const subcategorytwoData = Array.isArray(subcategorytwoRes?.data?.data)
          ? subcategorytwoRes.data.data
          : [];

        setSopOptions(
          sopData.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        );

        setStandardOptions(
          standardData.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        );

        setSubcategoryOne(
          subcategoryoneData.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        );

        setSubcategoryTwo(
          subcategorytwoData.map((item) => ({
            label: item.name,
            value: item.id,
          })),
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
      [name]: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => payload.append(`${key}[]`, v));
        } else {
          payload.append(key, value);
        }
      });

      const res = await axios.post(
        "/calibrationoperations/add-new-instrument",
        payload,
      );

      if (res.data.status === "true") {
        toast.success("Instrument added successfully ✅");
        navigate("/dashboards/calibration-operations/instrument-list");
      } else {
        toast.error(res.data.message || "Failed to add instrument ❌");
      }
    } catch (err) {
      toast.error("Something went wrong ❌");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Add Instrument">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add Instrument</h2>
          <Button
            variant="outline"
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() =>
              navigate("/dashboards/calibration-operations/instrument-list")
            }
          >
            Back to List
          </Button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <Input
            label="Instrument Name"
            name="name"
            onChange={handleInputChange}
            required
          />

          {/* Discipline */}
          <Input
            label="Discipline"
            name="discipline"
            onChange={handleInputChange}
            required
          />

          {/* Group */}
          <Input
            label="Group"
            name="group"
            onChange={handleInputChange}
            required
          />

          {/* Calibration Method / SOP */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Calibration Method / SOP
            </label>
            <ReactSelect
              isMulti
              name="sop"
              options={sopOptions}
              onChange={(selected) => handleMultiSelectChange(selected, "sop")}
              placeholder="Select Calibration Methods"
            />
          </div>

          {/* Calibration Standard */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Calibration Standard
            </label>
            <ReactSelect
              isMulti
              name="standard"
              options={standardOptions}
              onChange={(selected) =>
                handleMultiSelectChange(selected, "standard")
              }
              placeholder="Select Calibration Standards"
            />
          </div>

          {/* Description */}
          <Input
            label="Instrument Description"
            name="description"
            onChange={handleInputChange}
            required
          />

          {/* Remark */}
          <Input label="Remark" name="remark" onChange={handleInputChange} />

          {/* validation */}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Type Of Support
            </label>
            <ReactSelect
              isMulti
              name="typeofsupport"
              options={subcategoryOne}
              onChange={(selected) =>
                handleMultiSelectChange(selected, "typeofsupport")
              }
              placeholder="Select Type Of Support"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Type Of Master
            </label>
            <ReactSelect
              isMulti
              name="typeofmaster"
              options={subcategoryTwo}
              onChange={(selected) =>
                handleMultiSelectChange(selected, "typeofmaster")
              }
              placeholder="Select Type Of Master"
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
