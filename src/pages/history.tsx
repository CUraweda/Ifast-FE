import Input from '@/components/ui/InputField';
import Pagination from '@/components/ui/Pagination';
import Select from '@/components/ui/Select';
import { Download, Plus } from 'lucide-react';

const History = () => {
  const type = [
    { label: 'F3', value: 'F3' },
    { label: 'F4', value: 'F4' },
    { label: 'F5', value: 'F5' },
  ];
  const handlePageChange = () => {
    // setCurrentPage(page);
  };
  const handleItemsPerPageChange = () => {
    // setItemsPerPage(newItemsPerPage);
  };
  return (
    <>
      <div className="w-full p-3">
        <div className="w-full">
          <p className="text-2xl font-bold">History Transaction</p>
          <p className="text-sm">View your Transaction records</p>
        </div>
        <div className="mt-3 flex justify-between bg-neutral p-3 rounded shadow">
          <div className="flex gap-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">from</legend>
              <Input
                type="date"
                placeholder="Email"
                // error={errors?.email}
                // {...register("email")}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">to</legend>
              <Input
                type="date"
                placeholder="Email"
                // error={errors?.email}
                // {...register("email")}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">type</legend>
              <Select
              data={type}
              className="w-full"
              placeholder="Type"
              // error={errors?.ownershipStatus}
              // {...register('ownershipStatus')}
            />
            </fieldset>
           
          </div>
          <div className="flex gap-2 items-end">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Cari</legend>
              <Input
                type="text"
                placeholder="Search"
                // error={errors?.email}
                // {...register("email")}
              />
            </fieldset>
            <button className='btn btn-secondary mb-1'><Plus/>Add</button>
            <button className='btn btn-accent mb-1'><Download />Export</button>
          
           
          </div>
        </div>
        <div className="mt-3 flex flex-col bg-neutral p-3 rounded shadow">
          <div className="overflow-x-auto w-full">
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Number</th>
                  <th>Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>

                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full mt-5 flex justify-end">
              <Pagination
                totalItems={30}
                itemsPerPage={10}
                currentPage={2}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>
        </div>
      </div>
    </>
  );
};

export default History;
