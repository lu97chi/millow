'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface UpsertResult {
  message: string;
}

type Result = string[] | UpsertResult;

export function EmbeddingsTestButtons() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpsert = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/upsert', {
        method: 'POST',
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to upsert embeddings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuery = async () => {
    if (!query.trim()) {
      setError('Please enter a query');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to query properties');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    if (Array.isArray(result)) {
      return (
        <div className="rounded-md bg-muted p-4">
          <h4 className="font-semibold mb-2">Found {result.length} matching properties:</h4>
          <div className="space-y-1">
            {result.map((id) => (
              <div key={id} className="text-sm">
                Property ID: {id}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-md bg-muted p-4">
        <pre className="text-sm whitespace-pre-wrap">
          {result.message}
        </pre>
      </div>
    );
  };

  return (
    <section className="container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Test Embeddings
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Test the property embeddings functionality
        </p>
      </div>

      <Card className="mx-auto max-w-[58rem] p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Generate Embeddings</h3>
            <p className="text-sm text-muted-foreground">
              Generate and upsert embeddings for all properties in the database.
            </p>
            <Button 
              onClick={handleUpsert} 
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Generate Embeddings'}
            </Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Query Properties</h3>
            <p className="text-sm text-muted-foreground">
              Search for properties using natural language.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., I want a house close to a hospital"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={loading}
              />
              <Button 
                onClick={handleQuery} 
                disabled={loading}
              >
                Search
              </Button>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {result && renderResult()}
        </div>
      </Card>
    </section>
  );
} 