import Input from '@/components/ui/InputField';
import Pagination from '@/components/ui/Pagination';
import Select from '@/components/ui/Select';
import { Download, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import typeStore from '../store/typeSubmission.store';
import submissionStore from '../store/submissions.store';
import { submissionType } from '@/restApi/utils/submission';
import { formatDateTime } from '@/helpers/formatDate';
import { formatRupiah } from '@/helpers/formatRupiah';
import { BsPencil, BsTrash } from 'react-icons/bs';

interface type {
  label: string;
  value: string;
}

const SubmissionsList = () => {
  const { typeSubmission, getAllType } = typeStore();
  const { submissionList, getAllSubmission } = submissionStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [triger, setTriger] = useState<boolean>(false);
  const [dataType, setDataType] = useState<type[]>([]);

  useEffect(() => {
    const payload: string = `limit=${itemsPerPage}&page=${currentPage}&search=activity:${search}`;
    getAllType();
    getAllSubmission(payload);
  }, [itemsPerPage, currentPage, search, triger]);

  useEffect(() => {
    if (typeSubmission) {
      const type = typeSubmission.items.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      setDataType(type);
    }
  }, [typeSubmission]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  };

  console.log(submissionList);

  return (
    <>
      <div className="w-full p-3">
        <div className="w-full">
          <p className="text-2xl font-bold">Submission List</p>
          <p className="text-sm">View and manage your Submisstion records</p>
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
                data={dataType}
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
            <button className="btn btn-secondary mb-1">
              <Plus />
              Add
            </button>
            <button className="btn btn-accent mb-1">
              <Download />
              Export
            </button>
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
                  <th>Last Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {submissionList?.items.map(
                  (item: submissionType, i: number) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{item.number}</td>
                      <td>{formatDateTime(item.date)}</td>
                      <td>{formatRupiah(item.totalAmount)}</td>
                      <td><button className={`btn btn-xs btn-dash ${item?.approval[0]?.status === "REJECT" ? "btn-error" : "btn-accent"}`}>{`${item?.approval[0]?.status} by ${item?.approval[0]?.requiredRole}`}</button></td>
                      <td>
                        <div className="flex">
                          <button
                            className={`btn btn-sm  btn-ghost tooltip tooltip-warning ${
                              item?.approval[0]?.sequence === 1 &&
                              item?.approval[0]?.status !== 'APPROVED'
                                ? ''
                                : 'btn-disabled'
                            }`}
                            data-tip="edit"
                          >
                            <BsPencil />
                          </button>
                          <button
                            className={`btn btn-sm  btn-ghost tooltip tooltip-error ${
                              item?.approval[0]?.sequence === 1 &&
                              item?.approval[0]?.status !== 'APPROVED'
                                ? ''
                                : 'btn-disabled'
                            }`}
                            data-tip="delete"
                          >
                            <BsTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <div className="w-full mt-5 flex justify-end">
            <Pagination
              totalItems={submissionList?.total_items ?? 0}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmissionsList;
