-- Drop existing table if it exists
DROP TABLE IF EXISTS submissions;

-- Create table with proper constraints
CREATE TABLE submissions (
  id BIGSERIAL PRIMARY KEY,
  submission_id TEXT UNIQUE NOT NULL,
  submission_date DATE NOT NULL,
  full_name TEXT DEFAULT NULL, -- Changed to allow NULL values
  satisfaction_work INTEGER,
  work_life_impact INTEGER,
  strategy_understanding INTEGER,
  growth_opportunities INTEGER,
  welcome_feel INTEGER,
  collaboration_ease INTEGER,
  compensation_satisfaction INTEGER,
  compensation_fairness INTEGER,
  alignment_role INTEGER,
  alignment_values INTEGER,
  duty_manageability INTEGER,
  support_level INTEGER,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);