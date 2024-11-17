import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function TestSupabase() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    async function testConnection() {
      try {
        const { error: queryError } = await supabase
          .from('submissions')
          .select('count')
          .single();

        if (queryError) throw queryError;
        setStatus('success');
      } catch {
        setStatus('error');
      }
    }

    testConnection();
  }, []);

  if (status === 'loading') return null;
  if (status === 'error') return null;
  return null;
}