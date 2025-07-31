import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import axios from "utils/axios";
import { toast } from "sonner";
import { Button, Input, Select } from "components/ui";
import { Page } from "components/shared/Page";
import ReactSelect from "react-select";

export default function AddInstrument() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    sop: [],
    standard: [],
    typeofsupport: [],
    typeofmaster: [],
    description: "",
    discipline: "",
    groups: "",
    remark: "",
    range: "",
    leastcount: "",
    unittype: "",
    mode: "",
    supportmaster: "",
    supportrange: "",
    supportleastcount: "",
    supportunittype: "",
    supportmode: "",
    scopematrixvalidation: "",
    digitincmc: "2",
    biomedical: "No",
    showvisualtest: "No",
    showelectricalsafety: "No",
    showbasicsafety: "No",
    showperformancetest: "No",
    setpoint: "UUC",
    uuc: "1",
    master: "1",
    setpointheading: "Set Point",
    parameterheading: "",
    uucheading: "Observation On UUC",
    masterheading: "Standard Reading",
    errorheading: "Error",
    remarkheading: "Remark",
    setpointtoshow: "Yes",
    parametertoshow: "Yes",
    uuctoshow: "Yes",
    mastertoshow: "Yes",
    errortoshow: "Yes",
    remarktoshow: "Yes",
    specificationtoshow: "Yes",
    specificationheading: "",
    tempsite: "",
    tempvariablesite: "",
    humisite: "",
    humivariablesite: "",
    templab: "",
    tempvariablelab: "",
    humilab: "",
    humivariablelab: "",
    mastersincertificate: "Yes",
    uncertaintyincertificate: "Yes",
    allottolab: "",
    suffix: [],
    uncertaintytable: [],
    vertical: "1",
  });

  const [priceLists, setPriceLists] = useState([
    {
      packagename: "",
      packagedesc: "",
      accreditation: "",
      location: "",
      currency: null,
      rate: "",
      daysrequired: "",
      matrices: [],
    },
  ]);

  const [sopOptions, setSopOptions] = useState([]);
  const [standardOptions, setStandardOptions] = useState([]);
  const [subcategoryOne, setSubcategoryOne] = useState([]);
  const [subcategoryTwo, setSubcategoryTwo] = useState([]);
  const [formateOptions, setFormateOptions] = useState([]);
  const [labOptions, setLabOptions] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [unitTypeOptions, setUnitTypeOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [modeOptions, setModeOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [
          sopRes,
          standardRes,
          subcategoryoneRes,
          subcategorytwoRes,
          formatelist,
          lablist,
          currencylist,
          unitTypeRes,
          unitRes,
          modeRes,
        ] = await Promise.all([
          axios.get("/calibrationoperations/calibration-method-list"),
          axios.get("/calibrationoperations/calibration-standard-list"),
          axios.get("/inventory/subcategory-list"),
          axios.get("/inventory/subcategory-list"),
          axios.get("/get-formate"),
          axios.get("/master/list-lab"),
          axios.get("/master/currency-list"),
          axios.get("/master/unit-type-list"),
          axios.get("/master/units-list"),
          axios.get("/master/mode-list"),
        ]);
        const safeArray = (data) => (Array.isArray(data) ? data : []);

        setSopOptions(safeArray(sopRes.data.data).map((item) => ({ label: item.name, value: item.id.toString() })));
        setStandardOptions(safeArray(standardRes.data.data).map((item) => ({ label: item.name, value: item.id.toString() })));
        setSubcategoryOne(safeArray(subcategoryoneRes.data.data).map((item) => ({ label: item.name, value: item.id.toString() })));
        setSubcategoryTwo(safeArray(subcategorytwoRes.data.data).map((item) => ({ label: item.name, value: item.id.toString() })));
        setFormateOptions(safeArray(formatelist.data.data).map((item) => ({ label: item.name, value: item.description.toString() })));
        setLabOptions(safeArray(lablist.data.data).map((item) => ({ label: item.name, value: item.id.toString() })));
        setCurrencyOptions(safeArray(currencylist.data.data).map((item) => ({ label: `${item.name} (${item.description})`, value: item.id.toString() })));
        setUnitTypeOptions(unitTypeRes.data.data?.map((item) => ({ label: item.name, value: item.name })) || []);
        setUnitOptions(unitRes.data.data?.map((item) => ({ label: item.name, value: item.id.toString() })) || []);
        setModeOptions(modeRes.data.data?.map((item) => ({ label: item.name, value: item.name })) || []);
      } catch (err) {
        toast.error("Error loading dropdown data");
        console.error("Dropdown Fetch Error:", err);
      }
    };

    fetchDropdowns();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (selectedOptions, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
    }));
  };

  const handleSingleSelectChange = (selectedOption, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: selectedOption?.value || "",
    }));
  };

  const handlePriceListChange = (index, e) => {
    const { name, value } = e.target;
    setPriceLists((prev) => {
      const updated = [...prev];
      updated[index][name] = value;
      return updated;
    });
  };

  const handlePriceCurrencyChange = (selected, index) => {
    setPriceLists((prev) => {
      const updated = [...prev];
      updated[index].currency = selected;
      return updated;
    });
  };

  const handleMatrixChange = (priceIndex, matrixIndex, e) => {
    const { name, value } = e.target;
    setPriceLists((prev) => {
      const updated = [...prev];
      updated[priceIndex].matrices[matrixIndex][name] = value;
      return updated;
    });
  };

  const addMatrix = useCallback((priceIndex) => {
    setPriceLists((prev) => {
      // Create a new array to avoid mutating state directly
      const updated = [...prev];
      const selectedPrice = { ...updated[priceIndex] };
      const newMatrices = [...(selectedPrice.matrices || [])];

      // Check if the last matrix is identical to a new empty matrix
      const newMatrix = {
        unittype: "",
        unit: "",
        mode: "",
        instrangemin: "",
        instrangemax: "",
        tolerance: "",
        tolerancetype: "",
      };

      // Prevent adding if the last matrix is identical (debounce-like behavior)
      if (
        newMatrices.length > 0 &&
        JSON.stringify(newMatrices[newMatrices.length - 1]) === JSON.stringify(newMatrix)
      ) {
        // console.warn("Duplicate matrix addition prevented");
        return prev; // Return previous state to prevent duplicate addition
      }

      newMatrices.push(newMatrix);
      selectedPrice.matrices = newMatrices;
      updated[priceIndex] = selectedPrice;

      return updated;
    });
  }, []);

  const removeMatrix = (priceIndex, matrixIndex) => {
    setPriceLists((prev) => {
      const updated = [...prev];
      updated[priceIndex].matrices = updated[priceIndex].matrices.filter((_, i) => i !== matrixIndex);
      return updated;
    });
  };

  const addPriceList = () => {
    setPriceLists((prev) => [
      ...prev,
      {
        packagename: "",
        packagedesc: "",
        accreditation: "",
        location: "",
        currency: null,
        rate: "",
        daysrequired: "",
        matrices: [],
      },
    ]);
  };

  const removePriceList = (index) => {
    setPriceLists((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        suffix: Array.isArray(formData.suffix)
          ? formData.suffix[0] || ""
          : formData.suffix || "",
        uncertaintytable: Array.isArray(formData.uncertaintytable)
          ? formData.uncertaintytable[0] || ""
          : formData.uncertaintytable || "",
        packagename: [],
        packagedesc: [],
        pricematrix: [],
        accreditationpricelist: [],
        locationpricelist: [],
        daysrequiredpricelist: [],
        ratepricelist: [],
        currencypricelist: [],
      };

      priceLists.forEach((price, priceIndex) => {
        payload.pricematrix.push(priceIndex);
        payload.packagename.push(price.packagename);
        payload.packagedesc.push(price.packagedesc);
        payload.accreditationpricelist.push(price.accreditation);
        payload.locationpricelist.push(price.location);
        payload.daysrequiredpricelist.push(price.daysrequired);
        payload.ratepricelist.push(price.rate);
        payload.currencypricelist.push(price.currency?.value || "");

        price.matrices.forEach((matrix, matrixIndex) => {
          const prefix = `${priceIndex}`;

          payload[`matrixno${prefix}`] = payload[`matrixno${prefix}`] || [];
          payload[`unittype${prefix}`] = payload[`unittype${prefix}`] || [];
          payload[`unit${prefix}`] = payload[`unit${prefix}`] || [];
          payload[`mode${prefix}`] = payload[`mode${prefix}`] || [];
          payload[`instrangemin${prefix}`] = payload[`instrangemin${prefix}`] || [];
          payload[`instrangemax${prefix}`] = payload[`instrangemax${prefix}`] || [];
          payload[`tolerance${prefix}`] = payload[`tolerance${prefix}`] || [];
          payload[`tolerancetype${prefix}`] = payload[`tolerancetype${prefix}`] || [];

          payload[`matrixno${prefix}`].push(matrixIndex + 1);
          payload[`unittype${prefix}`].push(matrix.unittype);
          payload[`unit${prefix}`].push(matrix.unit);
          payload[`mode${prefix}`].push(matrix.mode);
          payload[`instrangemin${prefix}`].push(matrix.instrangemin);
          payload[`instrangemax${prefix}`].push(matrix.instrangemax);
          payload[`tolerance${prefix}`].push(matrix.tolerance);
          payload[`tolerancetype${prefix}`].push(matrix.tolerancetype);
        });
      });

      // console.log(" FINAL JSON Payload:", payload);

      await axios.post(
        "/calibrationoperations/add-new-instrument",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Instrument added ✅");
      navigate("/dashboards/calibration-operations/instrument-list");
    } catch  {
      // console.error("❌ API Error:", err);
      toast.error("Error ❌");
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
            onClick={() => navigate("/dashboards/calibration-operations/instrument-list")}
          >
            Back to List
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Main Form Fields */}
          <Input
            label="Instrument Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Calibration Method / SOP</label>
            <ReactSelect
              isMulti
              name="sop"
              options={sopOptions}
              value={sopOptions.filter((opt) => formData.sop.includes(opt.value))}
              onChange={(selected) => handleMultiSelectChange(selected, "sop")}
              placeholder="Select Calibration Methods"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Calibration Standard</label>
            <ReactSelect
              isMulti
              name="standard"
              options={standardOptions}
              value={standardOptions.filter((opt) => formData.standard.includes(opt.value))}
              onChange={(selected) => handleMultiSelectChange(selected, "standard")}
              placeholder="Select Calibration Standards"
            />
          </div>
          <Input
            label="Instrument Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <input type="hidden" name="vertical" value={formData.vertical} />
          <Input
            label="Discipline"
            name="discipline"
            value={formData.discipline}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Group"
            name="groups"
            value={formData.groups}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Remark"
            name="remark"
            value={formData.remark}
            onChange={handleInputChange}
          />
          <div className="col-span-1 md:col-span-2">
            <h1 className="text-lg font-semibold">Validation</h1>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Range Validation</label>
            <Select
              name="range"
              value={formData.range}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Leastcount Validation</label>
            <Select
              name="leastcount"
              value={formData.leastcount}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Unittype</label>
            <Select
              name="unittype"
              value={formData.unittype}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Mode</label>
            <Select
              name="mode"
              value={formData.mode}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Support Required</label>
            <Select
              name="supportmaster"
              value={formData.supportmaster}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Type Of Support</label>
            <ReactSelect
              isMulti
              name="typeofsupport"
              options={subcategoryOne}
              value={subcategoryOne.filter((opt) => formData.typeofsupport.includes(opt.value))}
              onChange={(selected) => handleMultiSelectChange(selected, "typeofsupport")}
              placeholder="Select Type Of Support"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Range Validation For Support</label>
            <Select
              name="supportrange"
              value={formData.supportrange}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Leastcount Validation For Support</label>
            <Select
              name="supportleastcount"
              value={formData.supportleastcount}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Unittype For Support</label>
            <Select
              name="supportunittype"
              value={formData.supportunittype}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Mode For Support</label>
            <Select
              name="supportmode"
              value={formData.supportmode}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Type Of Master Required</label>
            <ReactSelect
              isMulti
              name="typeofmaster"
              options={subcategoryTwo}
              value={subcategoryTwo.filter((opt) => formData.typeofmaster.includes(opt.value))}
              onChange={(selected) => handleMultiSelectChange(selected, "typeofmaster")}
              placeholder="Select Type Of Master"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Scope Matrix Validation</label>
            <Select
              name="scopematrixvalidation"
              value={formData.scopematrixvalidation}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <Input
            label="No Of Digit in CMC"
            name="digitincmc"
            type="number"
            value={formData.digitincmc}
            onChange={handleInputChange}
            required
          />
          <div className="col-span-1 md:col-span-2">
            <h1 className="text-lg font-semibold">Biomedical Details</h1>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Bio Medical Format</label>
            <Select
              name="biomedical"
              value={formData.biomedical}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Show Visual Test On Certificate</label>
            <Select
              name="showvisualtest"
              value={formData.showvisualtest}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Show Electrical Safety Test on Certificate</label>
            <Select
              name="showelectricalsafety"
              value={formData.showelectricalsafety}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Show Basic Safety Test on Certificate</label>
            <Select
              name="showbasicsafety"
              value={formData.showbasicsafety}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Show Performance Test on Certificate</label>
            <Select
              name="showperformancetest"
              value={formData.showperformancetest}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div className="col-span-1 md:col-span-2">
            <h1 className="text-lg font-semibold">For Custom Formats Only</h1>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Setpoint</label>
            <Select
              name="setpoint"
              value={formData.setpoint}
              onChange={handleInputChange}
              required
            >
              <option value="UUC">UUC</option>
              <option value="Master">Master</option>
              <option value="Separate">Separate</option>
            </Select>
          </div>
          <Input
            label="UUC Repeatable"
            name="uuc"
            type="number"
            value={formData.uuc}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Master Repeatable"
            name="master"
            type="number"
            value={formData.master}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Set Point Heading"
            name="setpointheading"
            value={formData.setpointheading}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Parameter Heading"
            name="parameterheading"
            value={formData.parameterheading}
            onChange={handleInputChange}
            required
          />
          <Input
            label="UUC Heading"
            name="uucheading"
            value={formData.uucheading}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Master Heading"
            name="masterheading"
            value={formData.masterheading}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Error Heading"
            name="errorheading"
            value={formData.errorheading}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Remark Heading"
            name="remarkheading"
            value={formData.remarkheading}
            onChange={handleInputChange}
            required
          />
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Setpoint To Show On Certificate</label>
            <Select
              name="setpointtoshow"
              value={formData.setpointtoshow}
              onChange={handleInputChange}
              required
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Parameter To Show On Certificate</label>
            <Select
              name="parametertoshow"
              value={formData.parametertoshow}
              onChange={handleInputChange}
              required
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">UUC To Show On Certificate</label>
            <Select
              name="uuctoshow"
              value={formData.uuctoshow}
              onChange={handleInputChange}
              required
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Master To Show On Certificate</label>
            <Select
              name="mastertoshow"
              value={formData.mastertoshow}
              onChange={handleInputChange}
              required
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Error To Show On Certificate</label>
            <Select
              name="errortoshow"
              value={formData.errortoshow}
              onChange={handleInputChange}
              required
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Remark To Show On Certificate</label>
            <Select
              name="remarktoshow"
              value={formData.remarktoshow}
              onChange={handleInputChange}
              required
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Specification To Show On Certificate</label>
            <Select
              name="specificationtoshow"
              value={formData.specificationtoshow}
              onChange={handleInputChange}
              required
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <Input
            label="Specification Heading"
            name="specificationheading"
            value={formData.specificationheading}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Temperature Range for Site"
            name="tempsite"
            type="number"
            value={formData.tempsite}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Temperature Variable Site"
            name="tempvariablesite"
            type="number"
            value={formData.tempvariablesite}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Humidity Range for Site"
            name="humisite"
            type="number"
            value={formData.humisite}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Humidity Variable Site"
            name="humivariablesite"
            type="number"
            value={formData.humivariablesite}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Temperature Range for Lab"
            name="templab"
            type="number"
            value={formData.templab}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Temperature Variable Lab"
            type="number"
            name="tempvariablelab"
            value={formData.tempvariablelab}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Humidity Range for Lab"
            name="humilab"
            type="number"
            value={formData.humilab}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Humidity Variable Lab"
            name="humivariablelab"
            type="number"
            value={formData.humivariablelab}
            onChange={handleInputChange}
            required
          />
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Show Masters In Certificate</label>
            <Select
              name="mastersincertificate"
              value={formData.mastersincertificate}
              onChange={handleInputChange}
              required
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Show Uncertainty In Certificate</label>
            <Select
              name="uncertaintyincertificate"
              value={formData.uncertaintyincertificate}
              onChange={handleInputChange}
              required
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Lab to Calibrate</label>
            <ReactSelect
              name="allottolab"
              options={labOptions}
              value={labOptions.find((opt) => opt.value === formData.allottolab) || null}
              onChange={(selected) => handleSingleSelectChange(selected, "allottolab")}
              placeholder="Select Lab"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Format</label>
            <ReactSelect
              isMulti={false}
              name="suffix"
              options={formateOptions}
              value={formateOptions.find((opt) => opt.value === formData.suffix[0]) || null}
              onChange={(selected) => handleMultiSelectChange(selected ? [selected] : [], "suffix")}
              placeholder="Select Format"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Uncertainty Sheet</label>
            <ReactSelect
              isMulti
              name="uncertaintytable"
              options={formateOptions}
              value={formateOptions.filter((opt) => formData.uncertaintytable.includes(opt.value))}
              onChange={(selected) => handleMultiSelectChange(selected, "uncertaintytable")}
              placeholder="Select Uncertainty"
            />
          </div>

          {/* Price Lists and Matrices */}
          {priceLists.map((price, priceIndex) => (
            <div key={priceIndex} className="col-span-1 md:col-span-2 border border-gray-300 p-4 rounded">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">Price List {priceIndex + 1}</h1>
                {priceLists.length > 1 && (
                  <Button type="button" onClick={() => removePriceList(priceIndex)}>
                    Remove Price List
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Input
                  label="Package Name"
                  name="packagename"
                  value={price.packagename}
                  onChange={(e) => handlePriceListChange(priceIndex, e)}
                  required
                />
                <Input
                  label="Package Description"
                  name="packagedesc"
                  value={price.packagedesc}
                  onChange={(e) => handlePriceListChange(priceIndex, e)}
                  required
                />
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Accreditation</label>
                  <Select
                    name="accreditation"
                    value={price.accreditation}
                    onChange={(e) => handlePriceListChange(priceIndex, e)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Non Nabl">Non Nabl</option>
                    <option value="Nabl">Nabl</option>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Location</label>
                  <Select
                    name="location"
                    value={price.location}
                    onChange={(e) => handlePriceListChange(priceIndex, e)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Site">Site</option>
                    <option value="Lab">Lab</option>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Select Currency</label>
                  <ReactSelect
                    name="currency"
                    value={price.currency}
                    options={currencyOptions}
                    onChange={(selected) => handlePriceCurrencyChange(selected, priceIndex)}
                    placeholder="Select Currency"
                    required
                  />
                </div>
                <Input
                  label="Rate"
                  name="rate"
                  value={price.rate}
                 type="number"
                  onChange={(e) => handlePriceListChange(priceIndex, e)}
                  required
                />
                <Input
                  label="Days Required"
                  name="daysrequired"
                   type="number"
                  value={price.daysrequired}
                  onChange={(e) => handlePriceListChange(priceIndex, e)}
                  required
                />
              </div>

              {/* Matrices */}
              <div className="mt-4">
                <h2 className="text-md font-semibold mb-2"></h2>

                {price.matrices.length === 0 && (
                  <p className="text-sm text-gray-500 mb-4">
                    No matrices added yet. Click below to add one.
                  </p>
                )}

                {price.matrices.map((matrix, matrixIndex) => (
                  <div
                    key={`matrix-${priceIndex}-${matrixIndex}`}
                    className="border border-gray-200 p-4 rounded mb-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">
                        Matrix {matrixIndex + 1}
                      </h3>
                      {price.matrices.length > 0 && (
                        <Button
                          type="button"
                          onClick={() => removeMatrix(priceIndex, matrixIndex)}
                        >
                          Remove Matrix
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Unit Type/Parameter
                        </label>
                        <Select
                          name="unittype"
                          value={matrix.unittype}
                          onChange={(e) => handleMatrixChange(priceIndex, matrixIndex, e)}
                          required
                        >
                          <option value="">Select</option>
                          {unitTypeOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </Select>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Unit
                        </label>
                        <Select
                          name="unit"
                          value={matrix.unit}
                          onChange={(e) => handleMatrixChange(priceIndex, matrixIndex, e)}
                          required
                        >
                          <option value="">Select</option>
                          {unitOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </Select>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Mode
                        </label>
                        <Select
                          name="mode"
                          value={matrix.mode}
                          onChange={(e) => handleMatrixChange(priceIndex, matrixIndex, e)}
                        >
                          <option value="">Not Specified</option>
                          {modeOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </Select>
                      </div>

                      <Input
                        label="Instrument Range Min"
                        name="instrangemin"
                        type="number"
                        value={matrix.instrangemin}
                        onChange={(e) => handleMatrixChange(priceIndex, matrixIndex, e)}
                        required
                      />

                      <Input
                        label="Instrument Range Max"
                        name="instrangemax"
                        type="number"
                        value={matrix.instrangemax}
                        onChange={(e) => handleMatrixChange(priceIndex, matrixIndex, e)}
                        required
                      />

                      <Input
                        label="Tolerance (±)"
                        name="tolerance"
                        value={matrix.tolerance}
                         type="number"
                        onChange={(e) => handleMatrixChange(priceIndex, matrixIndex, e)}
                        required
                      />

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Tolerance Type
                        </label>
                        <Select
                        type="number"
                          name="tolerancetype"
                          value={matrix.tolerancetype}
                          onChange={(e) => handleMatrixChange(priceIndex, matrixIndex, e)}
                          required
                        >
                          <option value="">Not Specified</option>
                          <option value="Fixed">Fixed</option>
                          <option value="%">%</option>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}

                <Button type="button" onClick={() => addMatrix(priceIndex)}>
                  + Add Matrix
                </Button>
              </div>
            </div>
          ))}
          <Button type="button" onClick={addPriceList}>
            + Add Price List
          </Button>

          <div className="col-span-1 md:col-span-2">
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
          </div>
        </form>
      </div>
    </Page>
  );
}