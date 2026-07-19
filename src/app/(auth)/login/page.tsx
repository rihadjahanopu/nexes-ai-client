'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import { Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleDemoLogin = async () => {
    setEmail('demo@example.com');
    setPassword('password123');
    // Actual login will happen if user clicks login, or we can submit it right here
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        login(res.data.token, {
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
          avatar: res.data.user.avatar,
          role: res.data.user.role,
        });
        toast.success('Logged in successfully!');
        router.push('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Card className="shadow-2xl border-primary/20 bg-background/60 backdrop-blur-xl">
              <CardHeader className="space-y-1">
                <div className="flex justify-center mb-2">
                  <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-center tracking-tight">Welcome back</CardTitle>
                <CardDescription className="text-center text-md">
                  Sign in to your Nexus workspace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2 relative">
                    <Label htmlFor="email">Email address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="name@example.com" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 bg-background/50 focus:bg-background transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="#" className="text-xs text-primary hover:underline font-medium">Forgot password?</Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="password" 
                        type="password" 
                        required 
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 h-12 bg-background/50 focus:bg-background transition-colors"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-12 text-md font-medium transition-all group" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                    {!loading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </form>
                <div className="mt-6 flex flex-col gap-4">
                  <Button type="button" variant="secondary" className="w-full h-12 font-medium" onClick={handleDemoLogin}>
                    Use Demo Credentials
                  </Button>
                  <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase font-medium">
                      <span className="bg-background px-4 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center w-full bg-background rounded-md shadow-sm border overflow-hidden">
                    <GoogleLogin
                      onSuccess={async (credentialResponse) => {
                        try {
                          const res = await api.post('/auth/google', { token: credentialResponse.credential });
                          if (res.data.success) {
                            login(res.data.token, res.data.user);
                            toast.success('Logged in with Google!');
                            router.push('/dashboard');
                          }
                        } catch (error: any) {
                          toast.error(error.response?.data?.message || 'Google Login failed');
                        }
                      }}
                      onError={() => {
                        toast.error('Google Login failed');
                      }}
                      width="100%"
                      theme="filled_black"
                      shape="rectangular"
                      size="large"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link href="/register" className="text-primary hover:underline font-semibold">
                    Create one
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
