import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
};

// Add socket path for Cloud SQL when in production
if (process.env.NODE_ENV === 'production') {
  dbConfig.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
} else {
  dbConfig.host = process.env.DB_HOST;
}

const pool = mysql.createPool(dbConfig);

// Test database connection
async function testConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Successfully connected to database');
    
    // Test query
    const [rows] = await connection.query('SELECT 1');
    console.log('Test query successful:', rows);
    
    return true;
  } catch (error) {
    console.error('Database connection test failed:', {
      code: error.code,
      errno: error.errno,
      sqlMessage: error.sqlMessage,
      sqlState: error.sqlState,
      stack: error.stack
    });
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function saveSubmissionToDatabase(submission) {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Database connection established');

    // First, check if the table exists
    const [tables] = await connection.query(
      'SHOW TABLES LIKE "submissions"'
    );

    if (tables.length === 0) {
      console.log('Creating submissions table...');
      const schema = `
        CREATE TABLE submissions (
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
        )
      `;
      await connection.query(schema);
      console.log('Table created successfully');
    }

    console.log('Inserting submission data...');
    const [result] = await connection.query(
      `INSERT INTO submissions (
        submission_date,
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
        full_name
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        submission.submissionDate,
        submission.satisfactionWork,
        submission.workLifeImpact,
        submission.strategyUnderstanding,
        submission.growthOpportunities,
        submission.welcomeFeel,
        submission.collaborationEase,
        submission.compensationSatisfaction,
        submission.compensationFairness,
        submission.alignmentRole,
        submission.alignmentValues,
        submission.dutyManageability,
        submission.supportLevel,
        submission.fullName
      ]
    );
    
    console.log('Data inserted successfully:', result);
    return true;
  } catch (error) {
    console.error('Database error details:', {
      code: error.code,
      errno: error.errno,
      sqlMessage: error.sqlMessage,
      sqlState: error.sqlState,
      stack: error.stack
    });
    throw error;
  } finally {
    if (connection) {
      connection.release();
      console.log('Database connection released');
    }
  }
}

app.get('/health', async (req, res) => {
  const isConnected = await testConnection();
  res.status(200).json({ 
    status: 'healthy',
    database: isConnected ? 'connected' : 'disconnected',
    config: {
      instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
      database: process.env.DB_NAME,
      nodeEnv: process.env.NODE_ENV,
      socketPath: process.env.NODE_ENV === 'production' 
        ? `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
        : undefined
    }
  });
});

app.post('/jotform-webhook', async (req, res) => {
  console.log('Received webhook data:', req.body);

  try {
    await saveSubmissionToDatabase(req.body);
    res.status(200).json({ message: 'Submission received and saved successfully' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ 
      message: 'Error saving submission',
      error: error.message,
      details: {
        code: error.code,
        errno: error.errno,
        sqlMessage: error.sqlMessage,
        sqlState: error.sqlState
      }
    });
  }
});

// Test the database connection on startup
testConnection().then(isConnected => {
  if (!isConnected) {
    console.error('Initial database connection test failed');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});