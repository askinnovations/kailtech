import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";
import axios from "utils/axios";
import { toast } from "sonner";
import ReactSelect from "react-select";

export default function EditSalaryStructureDesign() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    basic: "",
    hra: "",
    sa: "",
    bonus: "",
    pfmax: "",
    esicmin: "",
    esicmax: "",
    epfemp: "",
    esicemp: "",
    epfemployer: "",
    esicemployer: "",
    mobileallowance: "",
    basicPercentOf: [],
    hraPercentOf: [],
    saPercentOf: [],
    bonusPercentOf: [],
    epfempPercentOf: [],
    esicempPercentOf: [],
    epfemployerPercentOf: [],
    esicemployerPercentOf: [],
    mobileallowancePercentOf: [],
    pfRequired: "",
    esicRequired: "",
  });

  const recordEnvOptions = [
    { value: "Manual", label: "Manual" },
    { value: "Not Required", label: "Not Required" },
    { value: "Gross", label: "Gross" },
    { value: "Basic", label: "Basic" },
    { value: "Special Allowances", label: "Special Allowances" },
    { value: "Bonus", label: "Bonus" },
  ];

  const yesNoOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/hrm/salary-structure-get-byid/${id}`);
        const result = res.data;

        if (result.status === true && result.data) {
          const data = result.data;

          setFormData({
            name: data.name || "",
            basic: data.basic || "",
            hra: data.hra || "",
            sa: data.sa || "",
            bonus: data.bonus || "",
            pfmax: data.pfmax || "",
            esicmin: data.esicmin || "",
            esicmax: data.esicmax || "",
            epfemp: data.epfemp || "",
            esicemp: data.esicemp || "",
            epfemployer: data.epfemployer || "",
            esicemployer: data.esicemployer || "",
            mobileallowance: data.mobileallowance || "",
            basicPercentOf: data.basicpercentof ? data.basicpercentof.split(",") : [],
            hraPercentOf: data.hrapercentof ? data.hrapercentof.split(",") : [],
            saPercentOf: data.sapercentof ? data.sapercentof.split(",") : [],
            bonusPercentOf: data.bonuspercentof ? data.bonuspercentof.split(",") : [],
            epfempPercentOf: data.epfemppercentof ? data.epfemppercentof.split(",") : [],
            esicempPercentOf: data.esicemppercentof ? data.esicemppercentof.split(",") : [],
            epfemployerPercentOf: data.epfemployerpercentof ? data.epfemployerpercentof.split(",") : [],
            esicemployerPercentOf: data.esicemployerpercetof ? data.esicemployerpercetof.split(",") : [],
            mobileallowancePercentOf: data.mobileallowancepercentof ? data.mobileallowancepercentof.split(",") : [],
            pfRequired: data.pfrequired || "",
            esicRequired: data.esicrequired || "",
          });
        } else {
          toast.error(result.message || "No data found");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (field, selected) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selected ? selected.map((opt) => opt.value) : [],
    }));
  };

  const handleYesNoChange = (field, selected) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selected ? selected.value : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fieldMap = {
        name: "name",
        basic: "basic",
        hra: "hra",
        sa: "sa",
        bonus: "bonus",
        pfmax: "pfmax",
        esicmin: "esicmin",
        esicmax: "esicmax",
        epfemp: "epfemp",
        esicemp: "esicemp",
        epfemployer: "epfemployer",
        esicemployer: "esicemployer",
        mobileallowance: "mobileallowance",
        basicPercentOf: "basicpercentof",
        hraPercentOf: "hrapercentof",
        saPercentOf: "sapercentof",
        bonusPercentOf: "bonuspercentof",
        epfempPercentOf: "epfemppercentof",
        esicempPercentOf: "esicemppercentof",
        epfemployerPercentOf: "epfemployerpercentof",
        esicemployerPercentOf: "esicemployerpercetof",
        mobileallowancePercentOf: "mobileallowancepercentof",
        pfRequired: "pfrequired",
        esicRequired: "esicrequired",
      };

      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        const backendKey = fieldMap[key];
        if (Array.isArray(value)) {
          form.append(backendKey, value.join(","));
        } else {
          form.append(backendKey, value);
        }
      });

      await axios.post(`/hrm/salary-structure-update/${id}`, form);
      toast.success("Salary structure updated ✅");
      navigate("/dashboards/hrm/salary-structure-design");
    } catch (err) {
      console.error(err);
      toast.error("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Edit Salary Structure Design">
      <div className="p-6">
         <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Edit Salary Structure Design
                  </h2>
                  <Button
                    variant="outline"
                    className="text-white bg-blue-600 hover:bg-blue-700"
                    onClick={() => navigate("/dashboards/hrm/salary-structure-design")}
                  >
                    Back to List
                  </Button>
                </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Name" name="name" value={formData.name} onChange={handleChange} required />

          <Input label="Basic" name="basic" value={formData.basic} onChange={handleChange} required />
          <label>Basic Will Be Percent Of</label>
          <ReactSelect
            options={recordEnvOptions}
            value={recordEnvOptions.filter((opt) => formData.basicPercentOf.includes(opt.value))}
            onChange={(opts) => handleSelectChange("basicPercentOf", opts)}
            isMulti
            isClearable
            placeholder="Select..."
          />

          <Input label="HRA" name="hra" value={formData.hra} onChange={handleChange} required />
          <label>HRA Will Be Percent Of</label>
          <ReactSelect
            options={recordEnvOptions}
            value={recordEnvOptions.filter((opt) => formData.hraPercentOf.includes(opt.value))}
            onChange={(opts) => handleSelectChange("hraPercentOf", opts)}
            isMulti
            isClearable
            placeholder="Select..."
          />

          <Input label="SA" name="sa" value={formData.sa} onChange={handleChange} required />
          <label>SA Will Be Percent Of</label>
          <ReactSelect
            options={recordEnvOptions}
            value={recordEnvOptions.filter((opt) => formData.saPercentOf.includes(opt.value))}
            onChange={(opts) => handleSelectChange("saPercentOf", opts)}
            isMulti
            isClearable
            placeholder="Select..."
          />

          <Input label="Bonus" name="bonus" value={formData.bonus} onChange={handleChange} required />
          <label>Bonus Will Be Percent Of</label>
          <ReactSelect
            options={recordEnvOptions}
            value={recordEnvOptions.filter((opt) => formData.bonusPercentOf.includes(opt.value))}
            onChange={(opts) => handleSelectChange("bonusPercentOf", opts)}
            isMulti
            isClearable
            placeholder="Select..."
          />

          <label>PF Required</label>
          <ReactSelect
            options={yesNoOptions}
            value={yesNoOptions.find((opt) => opt.value === formData.pfRequired) || null}
            onChange={(opt) => handleYesNoChange("pfRequired", opt)}
            isClearable
            placeholder="Select..."
          />

          <Input label="PF Max" name="pfmax" value={formData.pfmax} onChange={handleChange} required />

          <label>ESIC Required</label>
          <ReactSelect
            options={yesNoOptions}
            value={yesNoOptions.find((opt) => opt.value === formData.esicRequired) || null}
            onChange={(opt) => handleYesNoChange("esicRequired", opt)}
            isClearable
            placeholder="Select..."
          />

          <Input label="ESIC Min" name="esicmin" value={formData.esicmin} onChange={handleChange} required />
          <Input label="ESIC Max" name="esicmax" value={formData.esicmax} onChange={handleChange} required />

          <Input label="EPF Employee" name="epfemp" value={formData.epfemp} onChange={handleChange} required />
          <label>EPF Employee Will Be Percent Of</label>
          <ReactSelect
            options={recordEnvOptions}
            value={recordEnvOptions.filter((opt) => formData.epfempPercentOf.includes(opt.value))}
            onChange={(opts) => handleSelectChange("epfempPercentOf", opts)}
            isMulti
            isClearable
            placeholder="Select..."
          />

          <Input label="ESIC Employee" name="esicemp" value={formData.esicemp} onChange={handleChange} required />
          <label>ESIC Employee Will Be Percent Of</label>
          <ReactSelect
            options={recordEnvOptions}
            value={recordEnvOptions.filter((opt) => formData.esicempPercentOf.includes(opt.value))}
            onChange={(opts) => handleSelectChange("esicempPercentOf", opts)}
            isMulti
            isClearable
            placeholder="Select..."
          />

          <Input label="Mobile Allowance" name="mobileallowance" value={formData.mobileallowance} onChange={handleChange} required />
          <label>Mobile Allowance Will Be Percent Of</label>
          <ReactSelect
            options={recordEnvOptions}
            value={recordEnvOptions.filter((opt) => formData.mobileallowancePercentOf.includes(opt.value))}
            onChange={(opts) => handleSelectChange("mobileallowancePercentOf", opts)}
            isMulti
            isClearable
            placeholder="Select..."
          />

          <Input label="EPF Employer" name="epfemployer" value={formData.epfemployer} onChange={handleChange} required />
          <label>EPF Employer Will Be Percent Of</label>
          <ReactSelect
            options={recordEnvOptions}
            value={recordEnvOptions.filter((opt) => formData.epfemployerPercentOf.includes(opt.value))}
            onChange={(opts) => handleSelectChange("epfemployerPercentOf", opts)}
            isMulti
            isClearable
            placeholder="Select..."
          />

          <Input label="ESIC Employer" name="esicemployer" value={formData.esicemployer} onChange={handleChange} required />
          <label>ESIC Employer Will Be Percent Of</label>
          <ReactSelect
            options={recordEnvOptions}
            value={recordEnvOptions.filter((opt) => formData.esicemployerPercentOf.includes(opt.value))}
            onChange={(opts) => handleSelectChange("esicemployerPercentOf", opts)}
            isMulti
            isClearable
            placeholder="Select..."
          />

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
        </form>
      </div>
    </Page>
  );
}
