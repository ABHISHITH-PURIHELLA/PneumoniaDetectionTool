const sql = require('mssql/msnodesqlv8');

// Your SQL Server configuration
const config = {
  //user: 'ABHI-_-\purih', //  Database username
  server: '(localdb)\MSSQLLocalDB', //  Database server
  database: 'myProjectDB', //  Database name
  driver: 'msnodesqlv8',
  options: {
    enableArithAbort: true,

    trustServerCertificate: true // This certificate should be ON when on a local development environment
  },
  connectionString: 'DSN=MyLocalDBDSN'  //Created a local DSN to connect my DB and using the DSN as a connection string.
};

// Asynchronous function to get the connection
async function getConnection() {
  try {
    // Awaiting for the connection
    const pool = await sql.connect(config);
    console.log('Connected to the database!');
    return pool;
  } catch (err) {
    console.error('Database connection failed: ', err);
    throw err;
  }
}

// Exporting the connection function and sql to use in authDBrequests.cjs
module.exports = {
  getConnection,
  sql 
};