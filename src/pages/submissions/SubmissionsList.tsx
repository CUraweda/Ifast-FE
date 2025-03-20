import Input from '@/components/ui/InputField';
import Pagination from '@/components/ui/Pagination';
import Select from '@/components/ui/Select';
import { Download, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import typeStore from '../../store/typeSubmission.store';
import submissionStore from '../../store/submissions.store';
import projectStore from '../../store/project.store';
import { submissionType } from '@/restApi/utils/submission';
import { formatDateTime } from '@/helpers/formatDate';
import { formatRupiah } from '@/helpers/formatRupiah';
import { BsPencil, BsTrash } from 'react-icons/bs';
import Modal, { closeModal, openModal } from '@/components/ui/Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addSubmission } from '@/type/submission';
import { addSubmissionShcema } from '@/schema/submission';
import { CiViewList } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { listed } from '@/constant/listed';

interface type {
  label: string;
  value: string;
}

const SubmissionsList = () => {
  const { typeSubmission, getAllType } = typeStore();
  const { projectList, getAllProject } = projectStore();
  const { submissionList, getAllSubmission, createSubmission } =
    submissionStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [triger, setTriger] = useState<boolean>(false);
  const [dataType, setDataType] = useState<type[]>([]);
  const [dataProject, setDataProject] = useState<type[]>([]);
  const navigate = useNavigate();

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
    if (projectList) {
      const project = projectList.items.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      setDataProject(project);
    }
  }, [typeSubmission, projectList]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  };

  const handleAddTriger = async () => {
    const payload: string = `limit=50`;
    await getAllProject(payload);

    openModal('add-submission');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<addSubmission>({
    defaultValues: {
      projectId: '',
      date: '',
      activity: '',
      description: '',
      typeId: '',
    },
    resolver: yupResolver(addSubmissionShcema),
  });

  const onSubmit: SubmitHandler<addSubmission> = async (value) => {
    const data = { ...value, status: 'DRAFT' };
    await createSubmission(data);
    closeModal('add-submission');
    reset();
    setTriger(!triger);
  };

  const handleDetail = (id: string) => {
    navigate(`${listed.submissionDetail}?id=${id}`);
  };
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </fieldset>
            <button
              className="btn btn-secondary mb-1"
              onClick={handleAddTriger}
            >
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
            <table className="table table-auto table-zebra sm:table-fixed w-full">
              <thead>
                <tr>
                  <th className="w-10">No</th>
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
                      <td>
                        {item.status === 'DRAFT' && (
                          <button className="btn btn-xs btn-info btn-dash">
                            {item.status}
                          </button>
                        )}
                        {item.status !== 'DRAFT' && (
                          <button
                            className={`btn btn-xs btn-dash ${
                              item?.approval[0]?.status === 'REJECT'
                                ? 'btn-error'
                                : 'btn-accent'
                            }`}
                          >{`${item?.approval[0]?.status} ${
                            item.approval[0]?.status === 'APPROVED'
                              ? ''
                              : ` by ${item?.approval[0]?.requiredRole}`
                          }`}</button>
                        )}
                      </td>
                      <td>
                        <div className="flex">
                          <button
                            className={`btn btn-sm  btn-ghost tooltip tooltip-info`}
                            data-tip="detail submission"
                            onClick={() => handleDetail(item.id)}
                          >
                            <CiViewList />
                          </button>
                          <button
                            className={`btn btn-sm  btn-ghost tooltip tooltip-warning ${
                              item.status !== 'DRAFT' ? 'btn-disabled' : ''
                            }`}
                            data-tip="edit"
                          >
                            <BsPencil />
                          </button>

                          <button
                            className={`btn btn-sm  btn-ghost tooltip tooltip-error ${
                              item.status !== 'DRAFT' ? 'btn-disabled' : ''
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

      <Modal id="add-submission">
        <span className="text-lg font-bold">Submission</span>
        <div className="mt-3">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">type</legend>
            <Select
              data={dataType}
              className="w-full"
              placeholder="Type"
              error={errors?.typeId}
              {...register('typeId')}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Project</legend>
            <Select
              data={dataProject}
              className="w-full"
              placeholder="Project"
              error={errors?.projectId}
              {...register('projectId')}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Date</legend>
            <Input
              type="date"
              placeholder="Date"
              error={errors?.date}
              {...register('date')}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Activity</legend>
            <Input
              type="text"
              placeholder="Activity"
              error={errors?.activity}
              {...register('activity')}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Description</legend>
            <textarea
              className={`textarea w-full ${
                errors.description && 'border-red-500'
              }`}
              placeholder="Description"
              {...register('description')}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </fieldset>
        </div>
        <div className="w-full flex justify-end gap-3 mt-5">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => {
              closeModal('add-submission');
            }}
          >
            Close
          </button>
          <button
            className="btn btn-primary text-white btn-sm"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
};

export default SubmissionsList;
