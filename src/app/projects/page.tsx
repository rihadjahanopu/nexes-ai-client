'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import api from '@/lib/axios';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Search, Filter, Plus, Calendar, Activity } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { PrivateRoute } from '@/components/ui/PrivateRoute';

export default function ProjectsListingPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const debouncedSearch = useDebounce(search, 500);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      let query = `/projects?page=${page}&limit=6`;
      if (debouncedSearch) query += `&search=${debouncedSearch}`;
      if (status !== 'all') query += `&status=${status}`;

      const res = await api.get(query);
      setProjects(res.data.data);
      setTotalPages(res.data.pagination.pages);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page, debouncedSearch, status]);

  return (
    <PrivateRoute>
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <div className="container mx-auto p-4 md:p-8 pt-24 md:pt-28">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground">Manage your agentic AI workspaces.</p>
          </div>
          <Link href="/projects/new">
            <Button size="lg">
              <Plus className="mr-2 h-5 w-5" /> Create Project
            </Button>
          </Link>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search projects..." 
              className="pl-12 !h-12 text-base rounded-xl bg-card border-border/50 shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={status} onValueChange={(val) => setStatus(val || 'all')}>
              <SelectTrigger className="!h-12 w-full rounded-xl bg-card border-border/50 shadow-sm text-base px-4">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Project Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-[300px] flex flex-col">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent className="flex-1">
                  <Skeleton className="h-24 w-full" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 border rounded-xl bg-card">
            <h3 className="text-2xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-6">Create a new project to get started with your AI assistant.</p>
            <Link href="/projects/new">
              <Button>Create Project</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => (
              <Card key={project._id} className="flex flex-col hover:border-primary transition-colors hover:shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl line-clamp-1">{project.title}</CardTitle>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      project.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      project.status === 'completed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                  <CardDescription className="line-clamp-2 mt-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center text-sm text-muted-foreground gap-4 mt-4">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Activity className="mr-1 h-4 w-4" />
                      {project.tags?.length || 0} Tags
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t">
                  <Link href={`/projects/${project._id}`} className="w-full">
                    <Button variant="secondary" className="w-full">Open Workspace</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <Button 
              variant="outline" 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >
              Previous
            </Button>
            <span className="text-sm font-medium">Page {page} of {totalPages}</span>
            <Button 
              variant="outline" 
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
    </PrivateRoute>
  );
}
