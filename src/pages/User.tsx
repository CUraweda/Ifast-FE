import Input from '@/components/ui/InputField';
import Pagination from '@/components/ui/Pagination';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import userStore from '../store/user.store';
import divisionStore from '../store/division.store';
import rolesStore from '../store/roles.store';
import HirarkyStore from '../store/hirarky.store';
import Swal from 'sweetalert2';
import { Hirarky, HirarkyLevel, Role, User } from '@/restApi/utils/user';
import { BsPencil, BsPersonAdd, BsTrash } from 'react-icons/bs';
import { VscTypeHierarchySub } from 'react-icons/vsc';
import Modal, { closeModal, openModal } from '@/components/ui/Modal';
import Select from '@/components/ui/Select';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addUser } from '@/type/user';
import { addUserShcema } from '@/schema/user';

interface type {
  label: string;
  value: string;
}

const UserPage = () => {
  const {
    userList,
    allUser,
    error,
    createUser,
    addRoleUser,
    removeRoleUser,
    addHirarkyUser,
  } = userStore();
  const { division, getAll } = divisionStore();
  const { roles, getAllRoles } = rolesStore();
  const { hirarkyList, getAllHirarky } = HirarkyStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [Division, setDivision] = useState<type[]>([]);
  const [triger, setTriger] = useState<boolean>(false);
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const [selectedHirarky, setSelectedHirarky] = useState<Hirarky>();
  const [idUser, setIdUser] = useState<string>('');

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
      });
    }
  }, [error]);

  useEffect(() => {
    if (division) {
      const type = division.items.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      setDivision(type);
    }
  }, [division]);

  useEffect(() => {
    const payload: string = `limit=${itemsPerPage}&page=${currentPage}&search=fullName:${search}`;
    allUser(payload);
  }, [itemsPerPage, currentPage, search, triger]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  };

  const getDivision = async () => {
    await getAll();
    openModal('add-user');
  };

  const getRoles = async (roles: Role[], id: string) => {
    await getAllRoles();
    openModal('add-role');
    setIdUser(id);
    setSelectedRoles((prevSelectedRoles) => [...prevSelectedRoles, ...roles]);
  };
  const getHirarky = async (hirarky: Hirarky, id: string) => {
    await getAllHirarky();
    openModal('add-hirarky');
    setIdUser(id);
    setSelectedHirarky(hirarky);
  };

  const addRole = async () => {
    const data = {
      roles: selectedRoles.map((item) => item.id),
    };
    closeModal('add-role');
    await addRoleUser(idUser, data);
    setTriger(!triger);
    setSelectedRoles([]);
  };

  const addHirarky = async () => {
    const data = {
      hirarkyId: selectedHirarky?.id,
    };
    closeModal('add-hirarky');
    await addHirarkyUser(idUser, data);
    setTriger(!triger);
    setSelectedRoles([]);
  };

  const handleDeleteRole = async (idUser: string, idRole: string) => {
    const data = {
      roles: [idRole],
    };
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await removeRoleUser(idUser, data);
        setTriger(!triger);
      }
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<addUser>({
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
      fullName: '',
      phoneWA: '',
      nik: '',
      divisionId: '',
    },
    resolver: yupResolver(addUserShcema),
  });

  const onSubmit: SubmitHandler<addUser> = async (value) => {
    await createUser(value);
    closeModal('add-user');
    reset();
    setTriger(!triger);
  };

  return (
    <>
      <div className="w-full p-3 overflow-x-hidden">
        <div className="w-full">
          <p className="text-2xl font-bold">Manage Users</p>
          <p className="text-sm">View and Manage users</p>
        </div>
        <div className="mt-3 flex justify-end bg-neutral p-3 rounded shadow">
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
              onClick={() => getDivision()}
            >
              <Plus />
              Add
            </button>
          </div>
        </div>
        <div className="mt-3 flex w-full flex-col bg-neutral p-3 rounded shadow">
          <div className="overflow-x-auto w-full">
            <table className="table table-auto sm:table-fixed w-full">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Whatsapp</th>
                  <th>Role</th>
                  <th>Hierarchy</th>
                  <th>Devisi</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userList?.items.map((item: User, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.fullName}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneWA}</td>
                    <td className="flex flex-wrap gap-1">
                      {item.roles.map((role: Role, i: number) => (
                        <div key={i} className="relative inline-block group">
                          <span className="badge badge-accent">
                            {role?.name}
                          </span>
                          <button
                            className="btn btn-xs absolute top-0 right-0 hidden group-hover:block btn-error tooltip tooltip-error"
                            data-tip="delete role"
                            onClick={() => handleDeleteRole(item.id, role.id)}
                          >
                            <BsTrash />
                          </button>
                        </div>
                      ))}
                    </td>
                    <td>
                      <span>{item.hirarky?.name}</span>
                    </td>
                    <td>{item.division.name}</td>
                    <td>
                      <span
                        className={`badge ${
                          item.status ? 'badge-success' : 'badge-error'
                        }`}
                      >
                        {item.status ? 'Aktif' : 'Suspend'}
                      </span>
                    </td>
                    <td>
                      <div className="flex">
                        <button
                          className="btn btn-sm btn-ghost tooltip tooltip-info"
                          data-tip="add roles"
                          onClick={() => getRoles(item.roles, item.id)}
                        >
                          <BsPersonAdd />
                        </button>
                        <button
                          className="btn btn-sm btn-ghost tooltip tooltip-accent"
                          data-tip="Hierarchy"
                          onClick={() => getHirarky(item.hirarky, item.id)}
                        >
                          <VscTypeHierarchySub />
                        </button>
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
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full mt-5 flex justify-end">
            <Pagination
              totalItems={userList?.total_items ?? 0}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </div>
      </div>
      <Modal id="add-user">
        <span className="font-bold text-lg">Add User</span>
        <form action="">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Full Name</legend>
            <Input
              type="text"
              placeholder="John Due"
              error={errors?.fullName}
              {...register('fullName')}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <Input
              type="email"
              placeholder="user@example.com"
              error={errors?.email}
              {...register('email')}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Phone Number (Whatsapp)</legend>
            <Input
              type="number"
              placeholder="098765212765"
              error={errors?.phoneWA}
              {...register('phoneWA')}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Employee ID Number</legend>
            <Input
              type="number"
              placeholder="123123"
              error={errors?.nik}
              {...register('nik')}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <Input
              type="text"
              placeholder="123123"
              error={errors?.password}
              {...register('password')}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Confirm Password</legend>
            <Input
              type="text"
              placeholder="123123"
              error={errors?.confirm_password}
              {...register('confirm_password')}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Division</legend>
            <Select
              data={Division}
              className="w-full"
              placeholder="Division"
              error={errors?.divisionId}
              {...register('divisionId')}
            />
          </fieldset>
        </form>
        <div className="w-full flex justify-end gap-3 mt-5">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => closeModal('add-user')}
          >
            Close
          </button>
          <button
            className="btn btn-primary text-white btn-sm"
            onClick={handleSubmit(onSubmit)}
          >
            Kirim
          </button>
        </div>
      </Modal>

      <Modal id="add-role" width="w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Role</h3>
        <div className="overflow-x-auto w-full mt-3">
          <table className="table table-auto table-zebra sm:table-fixed w-full">
            <thead>
              <tr>
                <th className="w-12">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-accent"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRoles(roles?.items ?? []);
                      } else {
                        setSelectedRoles([]);
                      }
                    }}
                  />
                </th>
                <th>Code</th>
                <th>Role</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {roles?.items.map((item: Role, index: number) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRoles.some(
                        (role) => role.id === item.id
                      )}
                      className="checkbox checkbox-accent"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRoles([...selectedRoles, item]);
                        } else {
                          setSelectedRoles(
                            selectedRoles.filter((role) => role.id !== item.id)
                          );
                        }
                      }}
                    />
                  </td>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-end gap-3 mt-5">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => {
              closeModal('add-role'), setSelectedRoles([]);
            }}
          >
            Close
          </button>
          <button
            className="btn btn-primary text-white btn-sm"
            onClick={addRole}
          >
            Kirim
          </button>
        </div>
      </Modal>
      <Modal id="add-hirarky" width="w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Hierarchy</h3>
        <div className="overflow-x-auto w-full mt-3">
          <table className="table table-auto table-zebra sm:table-fixed w-full">
            <thead>
              <tr>
                <th className="w-12"></th>
                <th>Name</th>
                <th>Level</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {hirarkyList?.items.map((item: Hirarky, index: number) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedHirarky?.id === item.id}
                      className="checkbox checkbox-accent"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedHirarky(item);
                        }
                      }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td className="flex flex-col">
                    {item.levels.map((item: HirarkyLevel, i: number) => (
                      <span key={i}>
                        level {item.sequence} - {item.requiredRole} (
                        {item.approver.fullName})
                      </span>
                    ))}
                  </td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-end gap-3 mt-5">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => {
              closeModal('add-hirarky'), setSelectedHirarky(undefined);
            }}
          >
            Close
          </button>
          <button
            className="btn btn-primary text-white btn-sm"
            onClick={addHirarky}
          >
            Kirim
          </button>
        </div>
      </Modal>
    </>
  );
};

export default UserPage;
