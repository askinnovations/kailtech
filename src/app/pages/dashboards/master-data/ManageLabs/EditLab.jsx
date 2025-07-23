import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, Input, MultiSelect, Select } from "components/ui";
import { Page } from "components/shared/Page";
import axios from "utils/axios";
import { toast } from "sonner";

export default function EditLab() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    users: [],
    qaapprove: [],
    ulrgenerate: [],
    uploadreport: [],
    envrecord: [],
    recordEnviornment: "No",
    masters: [],
    vertical: 0,
  });

  useEffect(() => {
    const fetchLab = async () => {
      try {
        const response = await axios.get(`/master/get-lab-byid/${id}`);
        const data = response.data?.data;
        if (data) {
          setFormData({
            name: data.name,
            users: data.users || [],
            qaapprove: data.qaapprove || [],
            ulrgenerate: data.ulrgenerate || [],
            uploadreport: data.uploadreport || [],
            envrecord: data.envrecord || [],
            recordEnviornment: data.recordEnviornment || "No",
            masters: data.masters || [],
            vertical: data.vertical || 0,
          });
        }
      } catch (err) {
        toast.error("Failed to load lab data");
      }
    };

    fetchLab();
  }, [id]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`/master/update-lab/${id}`, formData);
      toast.success("Lab updated successfully ✅");
      navigate("/dashboards/master-data/manage-labs");
    } catch (err) {
      toast.error("Failed to update lab ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Edit Lab">
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Edit Lab</h2>
          <Button onClick={() => navigate("/dashboards/master-data/manage-labs")}>
            {"<< Back to Manage Labs"}
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Lab Name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required />

          <MultiSelect label="Allotted Users" value={formData.users} onChange={(val) => handleChange("users", val)} />
          <MultiSelect label="QA Approve" value={formData.qaapprove} onChange={(val) => handleChange("qaapprove", val)} />
          <MultiSelect label="Generate ULR" value={formData.ulrgenerate} onChange={(val) => handleChange("ulrgenerate", val)} />
          <MultiSelect label="Upload Report" value={formData.uploadreport} onChange={(val) => handleChange("uploadreport", val)} />
          <MultiSelect label="Environmental Record" value={formData.envrecord} onChange={(val) => handleChange("envrecord", val)} />
          <MultiSelect label="Alloted Master" value={formData.masters} onChange={(val) => handleChange("masters", val)} />

          <Select
            label="Record Environmental Condition"
            value={formData.recordEnviornment}
            options={["Yes", "No"]}
            onChange={(val) => handleChange("recordEnviornment", val)}
          />

          <Select
            label="Vertical"
            value={formData.vertical}
            options={[
              { label: "Yes", value: 1 },
              { label: "No", value: 0 },
            ]}
            onChange={(val) => handleChange("vertical", val)}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Lab"}
          </Button>
        </form>
      </div>
    </Page>
  );
}
