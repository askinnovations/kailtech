import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "utils/axios";
import { toast } from "sonner";
import { Button, Input, Select } from "components/ui";
import { Page } from "components/shared/Page";
import ReactSelect from "react-select";

export default function AddLab() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    users: [],
    qaapprove: [],
    ulrgenerate: [],
    uploadreport: [],
    envrecord: [],
    recordEnviornment: "",
    masters: [],
    vertical: ""
  });
  const [loading, setLoading] = useState(false);
  const [userOptions, setUserOptions] = useState([]);
  const [verticalOptions, setVerticalOptions] = useState([]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [userRes, verticalRes] = await Promise.all([
          axios.get("/hrm/get-users-name"),
          axios.get("/master/vertical-list")
        ]);

        const userOptionsFormatted = (userRes.data.data || []).map(u => ({
          label: u.name,
          value: u.id
        }));

        const verticalOptionsFormatted = (verticalRes.data.data || []).map(v => ({
          label: v.name,
          value: v.id
        }));

        setUserOptions(userOptionsFormatted);
        setVerticalOptions(verticalOptionsFormatted);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Something went wrong while loading form data.");
      }
    };

    fetchDropdownData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOptions, name) => {
    const selectedValues = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setFormData((prev) => ({ ...prev, [name]: selectedValues }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        vertical: parseInt(formData.vertical),
      };

      const response = await axios.post("/master/create-lab", payload);

      console.log(payload);

      if (response.data.status === "true") {
        toast.success("Lab created successfully ✅");
        navigate("/dashboards/master-data/manage-labs");
      } else {
        toast.error(response.data.message || "Failed to create lab ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  const recordEnvOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" }
  ];

  return (
    <Page title="Add Manage Labs">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Add Manage Labs</h2>
          <Button
            variant="outline"
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/dashboards/master-data/manage-labs")}
          >
            Back to List
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Lab Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          
          {/* Existing multi-selects using ReactSelect (unchanged) */}
          {[
            { name: "users", label: "Allotted Users" },
            { name: "qaapprove", label: "QA Approve" },
            { name: "ulrgenerate", label: "Generate ULR" },
            { name: "uploadreport", label: "Upload Report" },
            { name: "envrecord", label: "Environmental Record" },
            { name: "masters", label: "Allotted Master" }
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <ReactSelect
                isMulti
                name={field.name}
                options={userOptions}
                value={userOptions.filter(opt => formData[field.name].includes(opt.value))}
                onChange={(selected) => handleSelectChange(selected, field.name)}
              />
            </div>
          ))}

          {/* ✅ Updated: Record Environmental Condition (ReactSelect) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Record Environmental Condition
            </label>
            <ReactSelect
              name="recordEnviornment"
              options={recordEnvOptions}
              value={recordEnvOptions.find(opt => opt.value === formData.recordEnviornment) || null}
              onChange={(selected) =>
                setFormData((prev) => ({
                  ...prev,
                  recordEnviornment: selected ? selected.value : ""
                }))
              }
              isClearable
              placeholder="Select..."
            />
          </div>

          {/* Vertical Select stays as-is (unchanged) */}
          <Select
            name="vertical"
            label="Vertical"
            data={verticalOptions}
            onChange={handleChange}
          />


          <Button type="submit" color="primary" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </form>
      </div>
    </Page>
  );
}
