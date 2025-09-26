'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        // Redirect to home page
        router.push('/');
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || 'Invalid password');
      }
    } catch (error) {
      setError('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-canvas)] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/ai-chorus-logo.svg"
              alt="AI-Chorus"
              width={200}
              height={60}
              className="h-16 w-auto"
            />
          </div>
          <CardTitle>AI-Chorus Access</CardTitle>
          <p className="text-[var(--fg-muted)] text-sm">
            Enter the password to access the application
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-3 py-2 border border-[var(--border-default)] rounded-md bg-[var(--bg-surface)] text-[var(--fg-default)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-emphasis)]"
                required
              />
            </div>
            {error && (
              <p className="text-[var(--emphasis-danger)] text-sm">{error}</p>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Authenticating...' : 'Access AI-Chorus'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}