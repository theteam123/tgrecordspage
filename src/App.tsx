import { useState, useEffect } from 'react';
import { DataTable } from './components/DataTable/DataTable';
import { columns } from './components/DataTable/columns';
import { TestSupabase } from './components/TestSupabase';
import { supabase } from './lib/supabase';
import { Submission } from './types/submission';

export default function App() {
  const [data, setData] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: submissions, error: queryError } = await supabase
          .from('submissions')
          .select('*')
          .order('submission_date', { ascending: false });

        if (queryError) throw queryError;

        const formattedData: Submission[] = submissions.map(submission => ({
          submissionId: submission.submission_id,
          submissionDate: new Date(submission.submission_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }),
          fullName: submission.full_name || '',
          satisfactionWork: submission.satisfaction_work?.toString() || '',
          workLifeImpact: submission.work_life_impact?.toString() || '',
          strategyUnderstanding: submission.strategy_understanding?.toString() || '',
          growthOpportunities: submission.growth_opportunities?.toString() || '',
          welcomeFeel: submission.welcome_feel?.toString() || '',
          collaborationEase: submission.collaboration_ease?.toString() || '',
          compensationSatisfaction: submission.compensation_satisfaction?.toString() || '',
          compensationFairness: submission.compensation_fairness?.toString() || '',
          alignmentRole: submission.alignment_role?.toString() || '',
          alignmentValues: submission.alignment_values?.toString() || '',
          dutyManageability: submission.duty_manageability?.toString() || '',
          supportLevel: submission.support_level?.toString() || '',
          comments: submission.comments || ''
        }));

        setData(formattedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-[95vw] md:max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600">Loading data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-[95vw] md:max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-[95vw] md:max-w-7xl mx-auto space-y-4">
        <TestSupabase />
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
}