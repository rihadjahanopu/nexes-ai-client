'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, BrainCircuit, CheckCircle2, Clock, Plus } from 'lucide-react';
import api from '@/lib/axios';

const mockData = [
  { name: 'Mon', usage: 400 },
  { name: 'Tue', usage: 300 },
  { name: 'Wed', usage: 550 },
  { name: 'Thu', usage: 200 },
  { name: 'Fri', usage: 700 },
  { name: 'Sat', usage: 100 },
  { name: 'Sun', usage: 800 },
];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      api.get('/projects?limit=5').then((res) => {
        setProjects(res.data.data);
      }).catch(console.error);
    }
  }, [user]);

  if (loading || !user) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <div className="container mx-auto p-4 md:p-8 pt-24 md:pt-28">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
            <p className="text-muted-foreground">Here is your workspace overview.</p>
          </div>
          <Link href="/projects/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Active Projects" value={projects.length.toString()} icon={<Activity />} />
          <StatCard title="AI Tokens Used" value="12,450" icon={<BrainCircuit />} />
          <StatCard title="Tasks Completed" value="34" icon={<CheckCircle2 />} />
          <StatCard title="Hours Saved" value="18" icon={<Clock />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>AI Usage (This Week)</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.length > 0 ? projects.map((p: any) => (
                  <div key={p._id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{p.title}</p>
                      <p className="text-sm text-muted-foreground truncate w-48">{p.description}</p>
                    </div>
                    <Link href={`/projects/${p._id}`}>
                      <Button variant="ghost" size="sm">View</Button>
                    </Link>
                  </div>
                )) : (
                  <p className="text-sm text-muted-foreground">No projects found. Create one to get started!</p>
                )}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Link href="/projects">
                  <Button variant="outline" className="w-full">View All Projects</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
