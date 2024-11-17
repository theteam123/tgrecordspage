-- First, truncate the table to ensure we start fresh
TRUNCATE TABLE submissions;

-- Insert sample data
INSERT INTO submissions (
  submission_id,
  submission_date,
  full_name,
  satisfaction_work,
  work_life_impact,
  strategy_understanding,
  growth_opportunities,
  welcome_feel,
  collaboration_ease,
  compensation_satisfaction,
  compensation_fairness,
  alignment_role,
  alignment_values,
  duty_manageability,
  support_level,
  comments
) VALUES
  ('6067448375017476224', '2024-11-07', 'Joe Bloggs', 3, 1, 4, 1, 3, 4, 1, 3, 5, 1, 4, 3, 'Just Testing'),
  ('6067448375016780746', '2024-11-07', 'Sarah Miller', 4, 1, 5, 5, 4, 2, 3, 2, 5, 4, 1, 1, NULL),
  ('6067448375016373685', '2024-11-07', 'Andrew Garcia', 1, 5, 5, 4, 1, 3, 5, 4, 4, 1, 5, 5, NULL),
  ('6067448365017480675', '2024-11-07', 'Laura Martinez', 1, 1, 4, 5, 5, 3, 3, 1, 3, 1, 1, 1, NULL),
  ('6067448365019668580', '2024-11-07', 'Michelle Kim', 2, 2, 2, 3, 4, 5, 5, 5, 4, 5, 1, 2, NULL),
  ('6067448365018963408', '2024-11-07', 'Kevin Zhang', 2, 5, 1, 2, 2, 3, 1, 5, 5, 1, 1, 1, NULL),
  ('6067448365018265962', '2024-11-07', 'Victoria Chen', 3, 4, 4, 3, 1, 5, 5, 4, 3, 4, 2, 1, NULL),
  ('6067448365018236365', '2024-11-07', 'Jessica Brown', 1, 5, 4, 2, 5, 4, 3, 3, 1, 3, 5, 3, NULL),
  ('6067448365018096759', '2024-11-07', 'Nina Rodriguez', 3, 2, 5, 2, 5, 5, 1, 5, 4, 1, 2, 4, NULL),
  ('6067448365017797193', '2024-11-07', 'Rachel Thompson', 3, 5, 5, 1, 2, 1, 3, 1, 1, 2, 3, 5, NULL),
  ('6067448365013946152', '2024-11-07', 'Sophia Patel', 2, 4, 3, 4, 4, 3, 4, 3, 4, 4, 3, 5, NULL),
  ('6067448365013444583', '2024-11-07', 'Daniel Wilson', 3, 5, 1, 4, 2, 3, 3, 4, 2, 1, 4, 3, NULL),
  ('6067448365013424342', '2024-11-07', 'Thomas Anderson', 4, 2, 4, 5, 2, 2, 4, 1, 4, 2, 3, 2, NULL),
  ('6067448365013104456', '2024-11-07', 'Christopher Lee', 2, 2, 4, 3, 1, 2, 5, 2, 3, 3, 5, 2, NULL),
  ('6067448365011737792', '2024-11-07', 'Marcus Johnson', 2, 3, 2, 4, 4, 2, 2, 3, 1, 5, 1, 4, NULL),
  ('6067448365011092614', '2024-11-07', 'Ryan O''Connor', 5, 3, 3, 3, 3, 4, 5, 5, 1, 2, 5, 4, NULL),
  ('6066233039518031658', '2024-11-05', 'Joe Bloggs', 1, 3, 2, 2, 2, 2, 4, NULL, NULL, NULL, NULL, NULL, NULL),
  ('6066226949519018828', '2024-11-05', 'Joe Bloggs', 1, 3, 2, 2, 2, 2, 4, NULL, NULL, NULL, NULL, NULL, NULL),
  ('6066212759516689089', '2024-11-05', 'Joe Bloggs', 1, 3, 2, 2, 2, 2, 4, NULL, NULL, NULL, NULL, NULL, NULL),
  ('6066210819516012177', '2024-11-05', NULL, 3, 3, 2, 2, 2, 4, 2, 2, 3, 2, 2, 4, 'Just testing');