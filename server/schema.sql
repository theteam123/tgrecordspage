CREATE TABLE IF NOT EXISTS submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  submission_date DATE NOT NULL,
  satisfaction_work VARCHAR(255) NOT NULL,
  work_life_impact VARCHAR(255) NOT NULL,
  strategy_understanding VARCHAR(255) NOT NULL,
  growth_opportunities VARCHAR(255) NOT NULL,
  welcome_feel VARCHAR(255) NOT NULL,
  collaboration_ease VARCHAR(255) NOT NULL,
  compensation_satisfaction VARCHAR(255) NOT NULL,
  compensation_fairness VARCHAR(255) NOT NULL,
  alignment_role VARCHAR(255) NOT NULL,
  alignment_values VARCHAR(255) NOT NULL,
  duty_manageability VARCHAR(255) NOT NULL,
  support_level VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);