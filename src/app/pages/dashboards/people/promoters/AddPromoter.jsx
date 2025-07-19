import { useNavigate } from "react-router";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";

export default function AddCurrency() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add actual API call
    console.log("Creating currency...");
    navigate("/dashboards/people/promoters");
  };

  return (
    <Page title="Add Promoters">
      <div className="p-6">
        {/* ✅ Header + Back Button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Add Promoter</h2>
          <Button
            variant="outline"
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/dashboards/people/promoters")}
          >
            Back to List
          </Button>
        </div>

        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Input label="Promoter Name" name="promoter_name" placeholder="Promoter name" required />
  <Input label="Mobile" name="mobile" placeholder="Mobile No." type="tel" required />

  <div className="md:col-span-2">
    <label className="block text-sm font-medium text-gray-700 dark:text-white">Address</label>
    <textarea
      name="address"
      placeholder="Address"
      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:border-primary-500"
      rows="3"
      required
    ></textarea>
  </div>

  <Input label="Contact Person Name" name="contact_person_name" placeholder="Contact Person name" />
  <Input label="Contact Person Number" name="contact_person_number" placeholder="Contact Person Number" type="tel" />

  <Input label="Email" name="email" placeholder="Email Address" type="email" />
  <Input label="City" name="city" placeholder="City" />
  <Input label="State" name="state" placeholder="State" />
  <Input label="GST No" name="gst_no" placeholder="GST No" />
  <Input label="PAN No" name="pan_no" placeholder="Pan No" />
  <Input label="Discount %" name="discount" placeholder="Discount %" type="number" />

  {/* ✅ Photo Upload Field */}
  <div className="md:col-span-2">
    <label className="block text-sm font-medium text-gray-700 dark:text-white">
      Upload Photo
    </label>
    <input
      type="file"
      name="photo"
      accept="image/*"
      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary-600 file:text-white hover:file:bg-primary-700"
    />
  </div>

  <div className="col-span-1 md:col-span-2">
    <Button type="submit" color="primary" className="w-full">
      Add Promoter
    </Button>
  </div>
</form>


      </div>
    </Page>
  );
}
