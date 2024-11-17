import { ColumnDef } from '@tanstack/react-table';
import { Submission } from '../../types/submission';

export const columns: ColumnDef<Submission, any>[] = [
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <a
        href={`https://www.jotform.com/edit/${row.original.submissionId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md"
      >
        Open
      </a>
    ),
  },
  {
    accessorKey: 'submissionDate',
    header: 'Submission Date',
  },
  {
    accessorKey: 'fullName',
    header: 'Full Name',
  },
  {
    accessorKey: 'satisfactionWork',
    header: 'Your overall satisfaction with your well-being at work',
  },
  {
    accessorKey: 'workLifeImpact',
    header: 'The impact of your work on your personal life and well-being',
  },
  {
    accessorKey: 'strategyUnderstanding',
    header: 'Your understanding of our strategic objectives and how you can contribute',
  },
  {
    accessorKey: 'growthOpportunities',
    header: 'Opportunities for professional growth and development within the company',
  },
  {
    accessorKey: 'welcomeFeel',
    header: 'How valued and welcomed you feel by your team',
  },
  {
    accessorKey: 'collaborationEase',
    header: 'The ease of collaboration with your teammates',
  },
  {
    accessorKey: 'compensationSatisfaction',
    header: 'Your satisfaction with your current compensation and benefits',
  },
  {
    accessorKey: 'compensationFairness',
    header: 'Fairness of your compensation relative to your role and responsibilities',
  },
  {
    accessorKey: 'alignmentRole',
    header: "Your alignment with the company's culture",
  },
  {
    accessorKey: 'alignmentValues',
    header: "Your alignment with the company's values and mission",
  },
  {
    accessorKey: 'dutyManageability',
    header: 'The manageability of your daily workload',
  },
  {
    accessorKey: 'supportLevel',
    header: "The company's support for a healthy work-life balance",
  },
  {
    accessorKey: 'comments',
    header: 'Comments',
  },
  {
    accessorKey: 'submissionId',
    header: 'Submission ID',
  }
];