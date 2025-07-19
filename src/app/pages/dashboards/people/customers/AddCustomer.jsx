import { useNavigate } from "react-router";
import { Button, Input,Select } from "components/ui";
import { Page } from "components/shared/Page";

export default function AddCurrency() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add actual API call
    console.log("Creating currency...");
    navigate("/dashboards/people/customers");
  };

  return (
    <Page title="Add specific-purposes">
      <div className="p-6">
        {/* ✅ Header + Back Button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Add customers</h2>
          <Button
            variant="outline"
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/dashboards/people/customers")}
          >
            Back to List
          </Button>
        </div>

        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Customer Name" name="customer_name" placeholder="Customer name" required />

          <Input label="Customer Type" name="customer_type" placeholder="Customer Type" disabled />

          <Select label="Mode Of Payment" name="payment_mode" required>
            <option value="">Choose...</option>
            <option value="cash">Cash</option>
            <option value="cheque">Cheque/DD</option>
            <option value="online">Online Transfer</option>
          </Select>

          <Input label="Credit Days" name="credit_days" placeholder="Credit Days" type="number" />
          <Input label="Credit Amount" name="credit_amount" placeholder="Credit Amount" type="number" />

          <Input label="Mobile" name="mobile" placeholder="Mobile No." type="tel" />
          <Input label="Contact Person Name" name="contact_person_name" placeholder="Contact Person name" />
          <Input label="Contact Person Number" name="contact_person_number" placeholder="Contact Person number" type="tel" />

          <Input label="Email" name="email" placeholder="Email Address" type="email" />

          <Select label="Country*" name="country" required>
            <option value="">Choose one..</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            {/* Add more countries if needed */}
          </Select>

          <Input label="State*" name="state" placeholder="State" required />
          <Input label="City" name="city" placeholder="City" />
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
              Save
            </Button>
          </div>
        </form>

      </div>
    </Page>
  );
}
