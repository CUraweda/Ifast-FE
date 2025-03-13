import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { SignIn } from '@/type/sign';
import Input from '@/components/ui/InputField';
import useAuthStore from '../store/auth.store';
import { useNavigate } from 'react-router-dom';
import { listed } from '@/constant/listed';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, error , user} = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .required('email required')
          .email('email invalid format'),
        password: yup.string().required('password required'),
      })
    ),
  });

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
    if (user) {
      navigate(listed.selectRole);
    }
  }, [user, navigate]);

  const onSubmit = async (formData: SignIn) => {
   await login(formData);
  
  };

  return (
    <div
      className="min-h-screen bg-linear-to-r from-cyan-500 to-blue-500 flex items-center justify-center p-4 md:p-8"
      data-theme="light"
    >
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8 lg:p-12">
          {/* Left Column - Welcome Content */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <img
                src="https://i-fast.curaweda.com/assets/Palagan.jpg"
                alt="Curaweda Logo"
                width={200}
                height={50}
                className="mb-8"
              />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Welcome Back!
              </h1>
              <p className="text-muted-foreground text-lg">
                An innovative financial request application designed to
                streamline the submission, tracking, and approval process for
                financial requests.
              </p>
            </div>

            <div className="relative hidden md:block">
              <div className="absolute right-0 bottom-0 w-48 h-48 bg-[#00B5D1]/10 rounded-full -mr-24 -mb-24" />
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-[#00B5D1]/20 rounded-full -mr-16 -mb-16" />
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="flex flex-col justify-center space-y-6 md:pl-8 lg:pl-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-semibold">Login</h2>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  placeholder="Email"
                  error={errors?.email}
                  {...register('email')}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password">Password</label>
                <div className="relative">
                  <Input
                    type={!showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    error={errors?.password}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn text-white bg-[#00B5D1] hover:bg-[#008fa6] transition-colors"
              >
                Login
                <ArrowRight className="w-4 ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
