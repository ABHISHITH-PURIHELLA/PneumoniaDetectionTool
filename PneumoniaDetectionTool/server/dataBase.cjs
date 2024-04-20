const sql = require('mssql/msnodesqlv8');

// Your SQL Server configuration
const config = {
  //user: 'ABHI-_-\purih', // Your database username
  server: '(localdb)\MSSQLLocalDB', // Your database server (use server IP or hostname)
  database: 'myProjectDB', // Your database name
  driver: 'msnodesqlv8',
  options: {
    enableArithAbort: true,
    //encrypt: true, // Use this if you're on Windows Azure or if your SQL Server requires encrypted connections
    trustServerCertificate: true // Use this if you're on a local development environment
  },
  connectionString: 'DSN=MyLocalDBDSN'
};

// Asynchronous function to get the connection
async function getConnection() {
  try {
    // Make sure to await for the connection
    const pool = await sql.connect(config);
    console.log('Connected to the database!');
    return pool;
  } catch (err) {
    console.error('Database connection failed: ', err);
    throw err;
  }
}

// Export the connection function
module.exports = {
  getConnection,
  sql // Export the sql object to use in other parts of your application
};
