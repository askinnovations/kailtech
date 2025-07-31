
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "utils/axios";
import { toast } from "sonner";
import { Button, Input, Select } from "components/ui";
import { Page } from "components/shared/Page";
import ReactSelect from "react-select";

export default function EditInstrument() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  const [priceLists, setPriceLists] = useState([]);
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
        setUnitTypeOptions(safeArray(unitTypeRes.data.data).map((item) => ({ label: item.name, value: item.name })));
        setUnitOptions(safeArray(unitRes.data.data).map((item) => ({ label: item.name, value: item.id.toString() })));
        setModeOptions(safeArray(modeRes.data.data).map((item) => ({ label: item.name, value: item.name })));
      } catch  {
        // toast.error("Error loading dropdown data");
        // console.error("Dropdown Fetch Error:", err);
      }
    };

    const fetchInstrument = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/calibrationoperations/get-instrument-byid/${id}`);
        const instrumentData = response.data.data;

        const safeArray = (value) => (Array.isArray(value) ? value : typeof value === "string" && value ? value.split(",") : []);
        const safeString = (value) => (value != null ? String(value) : "");

        setFormData((prev) => ({
          ...prev,
          name: safeString(instrumentData.instrument.name),
          sop: safeArray(instrumentData.instrument.sop),
          standard: safeArray(instrumentData.instrument.standard),
          typeofsupport: safeArray(instrumentData.instrument.typeofsupport),
          typeofmaster: safeArray(instrumentData.instrument.typeofmaster),
          description: safeString(instrumentData.instrument.description),
          discipline: safeString(instrumentData.instrument.discipline),
          groups: safeString(instrumentData.instrument.groups),
          remark: safeString(instrumentData.instrument.remark),
          range: safeString(instrumentData.instrument.range),
          leastcount: safeString(instrumentData.instrument.leastcount),
          unittype: safeString(instrumentData.instrument.unittype),
          mode: safeString(instrumentData.instrument.mode),
          supportmaster: safeString(instrumentData.instrument.supportmaster),
          supportrange: safeString(instrumentData.instrument.supportrange),
          supportleastcount: safeString(instrumentData.instrument.supportleastcount),
          supportunittype: safeString(instrumentData.instrument.supportunittype),
          supportmode: safeString(instrumentData.instrument.supportmode),
          scopematrixvalidation: safeString(instrumentData.instrument.scopematrixvalidation),
          digitincmc: safeString(instrumentData.instrument.digitincmc || "2"),
          biomedical: safeString(instrumentData.instrument.biomedical || "No"),
          showvisualtest: safeString(instrumentData.instrument.showvisualtest || "No"),
          showelectricalsafety: safeString(instrumentData.instrument.showelectricalsafety || "No"),
          showbasicsafety: safeString(instrumentData.instrument.showbasicsafety || "No"),
          showperformancetest: safeString(instrumentData.instrument.showperformancetest || "No"),
          setpoint: safeString(instrumentData.instrument.setpoint || "UUC"),
          uuc: safeString(instrumentData.instrument.uuc || "1"),
          master: safeString(instrumentData.instrument.master || "1"),
          setpointheading: safeString(instrumentData.instrument.setpointheading || "Set Point"),
          parameterheading: safeString(instrumentData.instrument.parameterheading || ""),
          uucheading: safeString(instrumentData.instrument.uucheading || "Observation On UUC"),
          masterheading: safeString(instrumentData.instrument.masterheading || "Standard Reading"),
          errorheading: safeString(instrumentData.instrument.errorheading || "Error"),
          remarkheading: safeString(instrumentData.instrument.remarkheading || "Remark"),
          setpointtoshow: safeString(instrumentData.instrument.setpointtoshow || "Yes"),
          parametertoshow: safeString(instrumentData.instrument.parametertoshow || "Yes"),
          uuctoshow: safeString(instrumentData.instrument.uuctoshow || "Yes"),
          mastertoshow: safeString(instrumentData.instrument.mastertoshow || "Yes"),
          errortoshow: safeString(instrumentData.instrument.errortoshow || "Yes"),
          remarktoshow: safeString(instrumentData.instrument.remarktoshow || "Yes"),
          specificationtoshow: safeString(instrumentData.instrument.specificationtoshow || "Yes"),
          specificationheading: safeString(instrumentData.instrument.specificationheading || ""),
          tempsite: safeString(instrumentData.instrument.tempsite),
          tempvariablesite: safeString(instrumentData.instrument.tempvariablesite),
          humisite: safeString(instrumentData.instrument.humisite),
          humivariablesite: safeString(instrumentData.instrument.humivariablesite),
          templab: safeString(instrumentData.instrument.templab),
          tempvariablelab: safeString(instrumentData.instrument.tempvariablelab),
          humilab: safeString(instrumentData.instrument.humilab),
          humivariablelab: safeString(instrumentData.instrument.humivariablelab),
          mastersincertificate: safeString(instrumentData.instrument.mastersincertificate || "Yes"),
          uncertaintyincertificate: safeString(instrumentData.instrument.uncertaintyincertificate || "Yes"),
          allottolab: safeString(instrumentData.instrument.allottolab),
          suffix: safeArray(instrumentData.instrument.suffix),
          uncertaintytable: safeArray(instrumentData.instrument.uncertaintytable),
          vertical: safeString(instrumentData.instrument.vertical || "1"),
        }));

        const priceMatrix = Array.isArray(instrumentData.pricematrix) ? instrumentData.pricematrix : [];
        const fetchedPriceLists = priceMatrix.length > 0
          ? priceMatrix.map((price) => ({
              id: price.id || "",
              packagename: safeString(price.packagename),
              packagedesc: safeString(price.packagedesc),
              accreditation: safeString(price.accreditation),
              location: safeString(price.location),
              currency: currencyOptions.find((opt) => opt.value === safeString(price.currency)) || null,
              rate: safeString(price.rate),
              daysrequired: safeString(price.daysrequired),
              matrices: Array.isArray(price.matrix) && price.matrix.length > 0
                ? price.matrix.map((matrix, matrixIndex) => ({
                    id: matrix.id || "",
                    matrixno: matrixIndex + 1,
                    unittype: safeString(matrix.unittype),
                    unit: safeString(matrix.unit),
                    mode: safeString(matrix.mode),
                    instrangemin: safeString(matrix.instrangemin),
                    instrangemax: safeString(matrix.instrangemax),
                    tolerance: safeString(matrix.tolerance),
                    tolerancetype: safeString(matrix.tolerancetype),
                  }))
                : []
            }))
          : [];

        setPriceLists(fetchedPriceLists);
      } catch  {
        // toast.error("Error loading instrument data");
      
      } finally {
        setLoading(false);
      }
    };

    fetchDropdowns();
    fetchInstrument();
  }, [id, currencyOptions]);

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
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const handlePriceCurrencyChange = (selected, index) => {
    setPriceLists((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], currency: selected || null };
      return updated;
    });
  };

  const handleMatrixChange = (priceIndex, matrixIndex, e) => {
    const { name, value } = e.target;
    setPriceLists((prev) => {
      const updated = [...prev];
      updated[priceIndex].matrices = updated[priceIndex].matrices.map((matrix, i) =>
        i === matrixIndex ? { ...matrix, [name]: value } : matrix
      );
      return updated;
    });
  };

  const addPriceList = useCallback(() => {
    const newPrice = {
      id: "",
      packagename: "",
      packagedesc: "",
      accreditation: "",
      location: "",
      daysrequired: "",
      rate: "",
      currency: null,
      matrices: [],
    };
    setPriceLists((prev) => {
      if (prev.length > 0 && JSON.stringify(prev[prev.length - 1]) === JSON.stringify(newPrice)) {
        console.warn("Duplicate price list addition prevented");
        return prev;
      }
      return [...prev, newPrice];
    });
  }, []);

  const removePriceList = (index) => {
    setPriceLists((prev) => prev.filter((_, i) => i !== index));
  };

  const addMatrix = (priceIndex) => {
    setPriceLists((prev) => {
      const updated = [...prev];
      const selectedPrice = { ...updated[priceIndex] };
      const newMatrices = [...(selectedPrice.matrices || [])];

      const newMatrix = {
        id: "",
        matrixno: newMatrices.length + 1,
        unittype: "",
        unit: "",
        mode: "",
        instrangemin: "",
        instrangemax: "",
        tolerance: "",
        tolerancetype: "",
      };

      newMatrices.push(newMatrix);
      selectedPrice.matrices = newMatrices;
      updated[priceIndex] = selectedPrice;

      return updated;
    });
  };

  const removeMatrix = (priceIndex, matrixIndex) => {
    setPriceLists((prev) => {
      const updated = [...prev];
      updated[priceIndex].matrices = updated[priceIndex].matrices
        .filter((_, i) => i !== matrixIndex)
        .map((matrix, i) => ({ ...matrix, matrixno: i + 1 }));
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
     if (loading) return; 

    try {
      const payload = {
        name: formData.name,
        sop: formData.sop,
        standard: formData.standard,
        typeofsupport: formData.typeofsupport,
        typeofmaster: formData.typeofmaster,
        description: formData.description,
        discipline: formData.discipline,
        groups: formData.groups,
        remark: formData.remark,
        range: formData.range,
        leastcount: formData.leastcount,
        unittype: formData.unittype,
        mode: formData.mode,
        supportmaster: formData.supportmaster,
        supportrange: formData.supportrange,
        supportleastcount: formData.supportleastcount,
        supportunittype: formData.supportunittype,
        supportmode: formData.supportmode,
        scopematrixvalidation: formData.scopematrixvalidation,
        digitincmc: formData.digitincmc,
        biomedical: formData.biomedical,
        showvisualtest: formData.showvisualtest,
        showelectricalsafety: formData.showelectricalsafety,
        showbasicsafety: formData.showbasicsafety,
        showperformancetest: formData.showperformancetest,
        setpoint: formData.setpoint,
        uuc: formData.uuc,
        master: formData.master,
        setpointheading: formData.setpointheading,
        parameterheading: formData.parameterheading,
        uucheading: formData.uucheading,
        masterheading: formData.masterheading,
        errorheading: formData.errorheading,
        remarkheading: formData.remarkheading,
        setpointtoshow: formData.setpointtoshow,
        parametertoshow: formData.parametertoshow,
        uuctoshow: formData.uuctoshow,
        mastertoshow: formData.mastertoshow,
        errortoshow: formData.errortoshow,
        remarktoshow: formData.remarktoshow,
        specificationtoshow: formData.specificationtoshow,
        specificationheading: formData.specificationheading,
        tempsite: formData.tempsite,
        tempvariablesite: formData.tempvariablesite,
        humisite: formData.humisite,
        humivariablesite: formData.humivariablesite,
        templab: formData.templab,
        tempvariablelab: formData.tempvariablelab,
        humilab: formData.humilab,
        humivariablelab: formData.humivariablelab,
        mastersincertificate: formData.mastersincertificate,
        uncertaintyincertificate: formData.uncertaintyincertificate,
        allottolab: formData.allottolab,
        suffix: Array.isArray(formData.suffix) ? formData.suffix[0] || "" : formData.suffix || "",
        uncertaintytable: Array.isArray(formData.uncertaintytable) ? formData.uncertaintytable : [],
        vertical: formData.vertical,
        matrixidpricelist: [],
        pricematrixno: [],
        packagename: [],
        packagedesc: [],
        accreditationpricelist: [],
        locationpricelist: [],
        daysrequiredpricelist: [],
        ratepricelist: [],
        currencypricelist: [],
        pricematrix: [],
      };

      priceLists.forEach((price, priceIndex) => {
        payload.matrixidpricelist.push(price.id || "0");
        payload.pricematrixno.push(priceIndex.toString());
        payload.packagename.push(price.packagename || "");
        payload.packagedesc.push(price.packagedesc || "");
        payload.accreditationpricelist.push(price.accreditation || "");
        payload.locationpricelist.push(price.location || "");
        payload.daysrequiredpricelist.push(price.daysrequired || "");
        payload.ratepricelist.push(price.rate || "");
        payload.currencypricelist.push(price.currency?.value || "");
        payload.pricematrix.push(priceIndex.toString());

        payload[`matrixno${priceIndex}`] = [];
        payload[`pricematrixid${priceIndex}`] = [];
        payload[`matrixid${priceIndex}`] = [];
        payload[`unittype${priceIndex}`] = [];
        payload[`unit${priceIndex}`] = [];
        payload[`mode${priceIndex}`] = [];
        payload[`instrangemin${priceIndex}`] = [];
        payload[`instrangemax${priceIndex}`] = [];
        payload[`tolerance${priceIndex}`] = [];
        payload[`tolerancetype${priceIndex}`] = [];

        (price.matrices || []).forEach((matrix) => {
          payload[`matrixno${priceIndex}`].push(matrix.matrixno.toString());
          payload[`pricematrixid${priceIndex}`].push(price.id || "0");
          payload[`matrixid${priceIndex}`].push(matrix.id || "0");
          payload[`unittype${priceIndex}`].push(matrix.unittype || "");
          payload[`unit${priceIndex}`].push(matrix.unit || "");
          payload[`mode${priceIndex}`].push(matrix.mode || "");
          payload[`instrangemin${priceIndex}`].push(matrix.instrangemin || "");
          payload[`instrangemax${priceIndex}`].push(matrix.instrangemax || "");
          payload[`tolerance${priceIndex}`].push(matrix.tolerance || "");
          payload[`tolerancetype${priceIndex}`].push(matrix.tolerancetype || "");
        });
      });

      console.log("🚀 FINAL PAYLOAD:", JSON.stringify(payload, null, 2));

      await axios.post(`/calibrationoperations/update-instrument/${id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Instrument updated successfully ✅");
      navigate("/dashboards/calibration-operations/instrument-list");
    } catch(err)  {
      console.error("❌ API Error:", err.response?.data || err.message);
      toast.error("Error updating instrument: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Edit Instrument">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Edit Instrument</h2>
          <Button
            variant="outline"
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => navigate("/dashboards/calibration-operations/instrument-list")}
          >
            Back to List
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
            name="tempvariablelab"
            type="number"
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
                <input
                  type="hidden"
                  name="matrixidpricelist[]"
                  value={price.id || "0"}
                />
                <input
                  type="hidden"
                  name="pricematrixno[]"
                  value={priceIndex}
                />
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

              <div className="mt-4">
                <h2 className="text-md font-semibold mb-2">Matrices</h2>
                {price.matrices.map((matrix, matrixIndex) => (
                  <div key={`matrix-${priceIndex}-${matrixIndex}`} className="border border-gray-200 p-4 rounded mb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Matrix {matrix.matrixno}</h3>
                      {price.matrices.length > 0 && (
                        <Button type="button" onClick={() => removeMatrix(priceIndex, matrixIndex)}>
                          Remove Matrix
                        </Button>
                      )}
                    </div>
                    <input
                      type="hidden"
                      name={`matrixno${priceIndex}[]`}
                      value={matrix.matrixno}
                    />
                    <input
                      type="hidden"
                      name={`pricematrixid${priceIndex}[]`}
                      value={price.id || "0"}
                    />
                    <input
                      type="hidden"
                      name={`matrixid${priceIndex}[]`}
                      value={matrix.id || "0"}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Unit Type/Parameter</label>
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
                        <label className="mb-1 block text-sm font-medium text-gray-700">Unit</label>
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
                        <label className="mb-1 block text-sm font-medium text-gray-700">Mode</label>
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
                        value={matrix.instrangemin}
                        type="number"
                        onChange={(e) => handleMatrixChange(priceIndex, matrixIndex, e)}
                        required
                      />
                      <Input
                        label="Instrument Range Max"
                        name="instrangemax"
                        value={matrix.instrangemax}
                         type="number"
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
                        <label className="mb-1 block text-sm font-medium text-gray-700">Tolerance Type</label>
                        <Select
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
            <Button
  type="submit"
  color="primary"
  disabled={loading}
  className={`flex items-center justify-center gap-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
>
  {loading ? (
    <>
      <svg
        className="animate-spin h-4 w-4 text-white"
        viewBox="0 0 24 24"
        fill="none"
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
      <span>Updating...</span>
    </>
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