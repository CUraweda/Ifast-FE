import { useState } from 'react';
import { Shield, ChevronRight, UserCog, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const roles = [
  {
    id: 'super_admin',
    title: 'SUPER_ADMIN',
    description: 'Full system access with all administrative privileges',
    icon: Shield,
  },
  {
    id: 'super_ad',
    title: 'SUPER_ADMIN',
    description: 'Full system access with all administrative privileges',
    icon: UserCog,
  },
  {
    id: 'super',
    title: 'SUPER_ADMIN',
    description: 'Full system access with all administrative privileges',
    icon: User,
  },

];

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-linear-to-r from-cyan-500 to-blue-500 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl">
        <Card className="p-6 md:p-8">
          

          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Select Role
              </h1>
              <p className="text-muted-foreground">
                Choose your role to access the appropriate dashboard
              </p>
            </div>

            <div className="max-h-96 h-96 overflow-auto flex flex-col gap-2">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`relative flex items-center gap-4 p-4 h-24 rounded-lg border-2 transition-all duration-200 group hover:border-[#00B5D1] hover:shadow-md cursor-pointer ${
                      selectedRole === role.id
                        ? 'border-[#00B5D1] bg-[#00B5D1]/5'
                        : 'border-gray-200'
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg ${
                        selectedRole === role.id
                          ? 'bg-[#00B5D1] text-white'
                          : 'bg-gray-100 text-gray-500 group-hover:bg-[#00B5D1]/10'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 text-left">
                      <h3 className="font-semibold">{role.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {role.description}
                      </p>
                    </div>

                    <ChevronRight
                      className={`w-5 h-5 transition-transform ${
                        selectedRole === role.id
                          ? 'text-[#00B5D1] translate-x-1'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <Button
              disabled={!selectedRole}
              className="w-full h-12 text-base bg-[#00B5D1] hover:bg-[#008fa6] transition-colors disabled:opacity-50"
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>

      </div>
    </div>
  );
}
