import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"

import { Eye, EyeOff, ArrowRight } from "lucide-react"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen bg-linear-to-r from-cyan-500 to-blue-500 flex items-center justify-center p-4 md:p-8">
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

            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email">Email</label>
                <Input type="email" placeholder="Email" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Input
                     type={!showPassword ? "text" : "password"} placeholder="Password" required 
                   
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

              <div className="flex items-center justify-between">
                <a
                  href="/forgot-password"
                  className="text-sm text-[#00B5D1] hover:text-[#008fa6] transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full text-base bg-[#00B5D1] hover:bg-[#008fa6] transition-colors"
              >
                Login
                <ArrowRight className="w-4 ml-2" />
              </Button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
