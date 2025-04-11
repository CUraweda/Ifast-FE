import { useEffect, useState } from 'react';
import submissionStore from '../../store/submissions.store';
import categorySubmissionStore from '../../store/categorySubmission.store';
import { useSearchParams } from 'react-router-dom';
import { formatDateTime } from '@/helpers/formatDate';
import { formatRupiah } from '@/helpers/formatRupiah';
import { BsPencil, BsTrash } from 'react-icons/bs';
import Modal, { closeModal, openModal } from '@/components/ui/Modal';
import Input from '@/components/ui/InputField';
import FileUploader from '@/components/ui/FileUpload';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addSubmissionDetail } from '@/type/submissionDetail';
import { addSubmissionDetailShcema } from '@/schema/submissionDetail';
import submissionDetailStore from '../../store/submissionsDetail.store';
import Select from '@/components/ui/Select';
import { detailSubmission } from '@/restApi/utils/submission';
import Swal from 'sweetalert2';

interface type {
  label: string;
  value: string;
}

const SubmissionDetail = () => {
  const [searchParams] = useSearchParams();
  const { submissionData, getOneSubmission , updateSubmission} = submissionStore();
  const { category, getAllCategorySubmission } = categorySubmissionStore();
  const { createSubmissionDetail } = submissionDetailStore();
  const id = searchParams.get('id');

  const [categoryData, setCategoryData] = useState<type[]>([]);
  const [triger, setTriger] = useState<boolean>(false);

  useEffect(() => {
    getOneSubmission(id ?? '');
  }, [id, triger]);

  useEffect(() => {
    if (category) {
      const type = category.items.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      setCategoryData(type);
    }
  }, [category]);

  const handleAdd = async () => {
    await getAllCategorySubmission();
    openModal('add-submissionDetail');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<addSubmissionDetail>({
    defaultValues: {
      submissionId: '',
      name: '',
      qty: 0,
      categoryId: '',
      amount: 0,
      evidence: undefined,
    },
    resolver: yupResolver(addSubmissionDetailShcema),
  });

  const onSubmit: SubmitHandler<addSubmissionDetail> = async (value) => {
    value.submissionId = id ?? '';
    await createSubmissionDetail(value);

    closeModal('add-submissionDetail');
    reset();
    setTriger(!triger);
  };

  const handleSubmitSubmission = async () => {
    const data = {
      status: "SUBMITED"
    }
    await updateSubmission(id ?? '', data);
    setTriger(!triger)
  };

  const trigersubmission = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmitSubmission()
      }
    });
  }

  return (
    <div className="w-full p-3">
      <div className="w-full">
        <p className="text-2xl font-bold">
          Detail Submission number {submissionData?.number}
        </p>
        <p className="text-sm">View and Manage Details Submission</p>
      </div>
      <div className="mt-3 flex flex-col sm:flex-row justify-start bg-neutral p-3 rounded shadow">
        <div className="w-full sm:w-1/2">
          <div className="overflow-x-auto">
            <table className="table table-xs table-auto sm:table-fixed w-full">
              <tbody>
                <tr>
                  <th className="w-32">Number</th>
                  <td className="w-8">:</td>
                  <td>{submissionData?.number}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>:</td>
                  <td>{formatDateTime(submissionData?.date)}</td>
                </tr>
                <tr>
                  <th>Project Code</th>
                  <td>:</td>
                  <td>
                    {submissionData?.project.code} -{' '}
                    {submissionData?.project.name}
                  </td>
                </tr>
                <tr>
                  <th>Type</th>
                  <td>:</td>
                  <td>{submissionData?.type.name}</td>
                </tr>
                <tr>
                  <th>Activity</th>
                  <td>:</td>
                  <td>{submissionData?.activity}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>:</td>
                  <td>{submissionData?.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full sm:w-1/2 flex flex-col sm:mt-0 mt-5">
          <div className="w-full flex justify-end gap-2">
            <div className="flex gap-2">
             
              <button className={`btn btn-accent btn-sm ${submissionData?.status === "DRAFT" ? "" : "btn-disabled"}`} onClick={trigersubmission}>Submit</button>
            </div>
          </div>
          <div className="w-full flex flex-col mt-4 overflow-x-auto overflow-y-hidden">
            <span className="badge badge-info">{submissionData?.status}</span>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Total Submission</legend>
              <span className="text-5xl font-bold text-info">
                {formatRupiah(submissionData?.totalAmount ?? 0)}
              </span>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-col justify-start bg-neutral p-3 rounded shadow">
        <div className="w-full justify-end flex">
          <button className={`btn btn-accent btn-sm ${submissionData?.status === "DRAFT" ? "" : "btn-disabled"}`} onClick={handleAdd}>
            Add
          </button>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="table table-auto table-zebra sm:table-fixed w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Evidence</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {submissionData?.submissionDetail.map(
                (item: detailSubmission, i: number) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>{item.category.name}</td>
                    <td>{formatRupiah(item.amount)}</td>
                    <td>
                      <img
                        src={item.evidence}
                        alt="evidence"
                        className="w-12"
                      />
                    </td>
                    <td>
                      <div>
                        <button
                          className="btn btn-sm btn-ghost tooltip tooltip-warning"
                          data-tip="edit"
                        >
                          <BsPencil />
                        </button>
                        <button
                          className="btn btn-sm btn-ghost tooltip tooltip-error"
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
      </div>

      <Modal id="add-submissionDetail">
        <div>
          <h3 className="font-bold text-lg">Detail Submission</h3>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Name</legend>
              <Input
                type="text"
                placeholder="Name"
                error={errors?.name}
                {...register('name')}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Quantity</legend>
              <Input
                type="number"
                placeholder="Quantity"
                error={errors?.qty}
                {...register('qty')}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Amount</legend>
              <Input
                type="number"
                placeholder="Amount"
                error={errors?.amount}
                {...register('amount')}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Category</legend>
              <Select
                data={categoryData}
                className="w-full"
                placeholder="Category"
                error={errors?.categoryId}
                {...register('categoryId')}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Evidence</legend>
              <FileUploader
                value={watch('evidence') ?? undefined}
                onChange={(file) => {
                  if (file) {
                    setValue('evidence', file, {
                      shouldValidate: true,
                    });
                  }
                }}
              />
            </fieldset>
          </div>
          <div className="w-full flex justify-end gap-3 mt-5">
            <button
              className="btn btn-outline btn-sm"
              onClick={() => {
                closeModal('add-submissionDetail');
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
        </div>
      </Modal>
    </div>
  );
};

export default SubmissionDetail;
