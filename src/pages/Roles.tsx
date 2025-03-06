import Input from '@/components/ui/InputField';
import Pagination from '@/components/ui/Pagination';
import Select from '@/components/ui/Select';
import { Download, Plus } from 'lucide-react';
import React from 'react';

const Roles = () => {
  const type = [
    { label: 'F3', value: 'F3' },
    { label: 'F4', value: 'F4' },
    { label: 'F5', value: 'F5' },
  ];
  const handlePageChange = (page: number) => {
    // setCurrentPage(page);
  };
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    // setItemsPerPage(newItemsPerPage);
  };
  return (
    <>
      <div className="w-full p-3">
        <div className="w-full">
          <p className="text-2xl font-bold">Manage Role Users</p>
          <p className="text-sm">View and Manage Roles</p>
        </div>
        <div className="mt-3 flex justify-end bg-neutral p-3 rounded shadow">
         
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
         
          </div>
        </div>
        <div className="mt-3 flex flex-col bg-neutral p-3 rounded shadow">
          <div className="overflow-x-auto w-full">
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Permission</th>
                 
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

export default  Roles;
