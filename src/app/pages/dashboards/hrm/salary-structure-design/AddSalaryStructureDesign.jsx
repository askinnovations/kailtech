import { useNavigate } from "react-router";
import { useState } from "react";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";
import axios from "utils/axios"; // Interceptor should attach token
import { toast } from "sonner";
import ReactSelect from "react-select"; // ✅ Make sure you import this!

export default function AddModes() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basic: "",
    hra: "",
    recordEnviornment: [], // ✅ multi select array
  });

  const [loading, setLoading] = useState(false);

  // ✅ Add your select options here
  const recordEnvOptions = [
    { value: "Manual", label: "Manual" },
    { value: "Gross", label: "Gross" },
    { value: "Basic", label: "Basic" },
    { value: "Special Allowances", label: "Special Allowances" },
    { value: "Bonus", label: "Bonus" },
  ];
  const yesNoOptions = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("basic", formData.basic);
      form.append("hra", formData.hra);
      form.append("recordEnviornment", JSON.stringify(formData.recordEnviornment)); // ✅ store as JSON array

      await axios.post("hrm/add-designation", form); // token attached via interceptor

      toast.success("Manage designation created successfully ✅", {
        duration: 1000,
        icon: "✅",
      });

      navigate("/dashboards/hrm/manage-designations");
    } catch (err) {
      console.error("Error creating mode:", err);
      toast.error(err?.response?.data?.message || "Failed to create mode ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Add Modes">
      <div className="p-6">
        {/* ✅ Header + Back Button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Add Salary Structure Design
          </h2>
          <Button
            variant="outline"
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/dashboards/hrm/salary-structure-design")}
          >
            Back to List
          </Button>
        </div>

        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Basic Value"
            name="basic"
            placeholder="Enter Basic Value"
            value={formData.basic}
            onChange={handleChange}
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
           Basic Will Be Percent Of Sum of
          </label>
          <ReactSelect
            name="recordEnviornment"
            options={recordEnvOptions}
            value={recordEnvOptions.filter(opt =>
              formData.recordEnviornment.includes(opt.value)
            )}
            onChange={(selectedOptions) =>
              setFormData((prev) => ({
                ...prev,
                recordEnviornment: selectedOptions
                  ? selectedOptions.map(opt => opt.value)
                  : [],
              }))
            }
            isMulti
            isClearable
            placeholder="Select..."
          />

          
          

          <label className="block text-sm font-medium text-gray-700 mb-1">
          Hra Will Be Percent Of Sum of
          </label>
          <ReactSelect
            name="recordEnviornment"
            options={recordEnvOptions}
            value={recordEnvOptions.filter(opt =>
              formData.recordEnviornment.includes(opt.value)
            )}
            onChange={(selectedOptions) =>
              setFormData((prev) => ({
                ...prev,
                recordEnviornment: selectedOptions
                  ? selectedOptions.map(opt => opt.value)
                  : [],
              }))
            }
            isMulti
            isClearable
            placeholder="Select..."
          />
          <Input
            label="SA Value"
            name="hra"
            placeholder="Enter Hra Value"
            value={formData.hra}
            onChange={handleChange}
            required
          />
           <label className="block text-sm font-medium text-gray-700 mb-1">
         Sa Will Be Percent Of Sum of
          </label>
          <ReactSelect
            name="recordEnviornment"
            options={recordEnvOptions}
            value={recordEnvOptions.filter(opt =>
              formData.recordEnviornment.includes(opt.value)
            )}
            onChange={(selectedOptions) =>
              setFormData((prev) => ({
                ...prev,
                recordEnviornment: selectedOptions
                  ? selectedOptions.map(opt => opt.value)
                  : [],
              }))
            }
            isMulti
            isClearable
            placeholder="Select..."
          />
           <Input
            label="bonus Value"
            name="hra"
            placeholder="Enter Hra Value"
            value={formData.hra}
            onChange={handleChange}
            required
          />
           <label className="block text-sm font-medium text-gray-700 mb-1">
         Bonus Will Be Percent Of Sum of
          </label>
               <ReactSelect
            name="recordEnviornment"
            options={recordEnvOptions}
            value={recordEnvOptions.filter(opt =>
              formData.recordEnviornment.includes(opt.value)
            )}
            onChange={(selectedOptions) =>
              setFormData((prev) => ({
                ...prev,
                recordEnviornment: selectedOptions
                  ? selectedOptions.map(opt => opt.value)
                  : [],
              }))
            }
            isMulti
            isClearable
            placeholder="Select..."
          />
            <label className="block text-sm font-medium text-gray-700 mb-1">
        Pf Required
          </label>
          <ReactSelect
              name="yesNoField"
              options={yesNoOptions}
              value={yesNoOptions.find(opt =>
                opt.value === formData.yesNoField
              ) || null}
              onChange={(selectedOption) =>
                setFormData((prev) => ({
                  ...prev,
                  yesNoField: selectedOption ? selectedOption.value : "",
                }))
              }
              isClearable
              placeholder="Select..."
            />
             <Input
            label="Pf Max"
            name="hra"
            placeholder="Enter Hra Value"
            value={formData.hra}
            onChange={handleChange}
            required
          />

         <Input
            label="epfemp Value"
            name="hra"
            placeholder="Enter Hra Value"
            value={formData.hra}
            onChange={handleChange}
            required
          />
          <Button type="submit" color="primary" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  viewBox="0 0 24 24"
                >
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
