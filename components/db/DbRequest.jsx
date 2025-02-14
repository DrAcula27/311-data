import moment from 'moment';

const createRequestsTable = async (context, props, setState) => {
  setState({ isTableLoading: true });

  const { conn, tableNameByYear, setDbStartTime } = context;
  const startDate = props.startDate; // directly use the startDate prop transformed for redux store
  const year = moment(startDate).year(); // extract the year
  // const datasetFileName = `requests${year}.parquet`;

  // const createSQL =
  //   `CREATE TABLE IF NOT EXISTS ${tableNameByYear} AS SELECT * FROM "${datasetFileName}"`;

  // Create the year data table if not exist already
  const createSQL = `
    CREATE TABLE IF NOT EXISTS ${tableNameByYear} (
      SRNumber VARCHAR,
      CreatedDate DATETIME,
      UpdatedDate DATETIME,
      ActionTaken VARCHAR,
      Owner VARCHAR,
      RequestType VARCHAR,
      Status VARCHAR,
      RequestSource VARCHAR,
      CreatedByUserOrganization VARCHAR,
      MobileOS VARCHAR,
      Anonymous VARCHAR,
      AssignTo VARCHAR,
      ServiceDate DATETIME,
      ClosedDate DATETIME,
      AddressVerified VARCHAR,
      ApproximateAddress VARCHAR,
      Address VARCHAR,
      HouseNumber VARCHAR,
      Direction VARCHAR,
      StreetName VARCHAR,
      Suffix VARCHAR,
      ZipCode VARCHAR,
      Latitude DECIMAL(8),
      Longitude DECIMAL(8),
      Location VARCHAR,
      TBMPage VARCHAR,
      TBMColumn VARCHAR,
      TBMRow VARCHAR,
      APC VARCHAR,
      CD VARCHAR,
      CDMember VARCHAR,
      NC VARCHAR,
      NCName VARCHAR,
      PolicePrecinct VARCHAR,
    )
  `;

  const startTime = performance.now(); // start the time tracker
  setDbStartTime(startTime)

    try {
      await conn.query(createSQL);
      const endTime = performance.now() // end the timer
      console.log(`Dataset registration & table creation (by year) time: ${Math.floor(endTime - startTime)} ms.`);
    } catch (error) {
      console.error("Error in creating table or registering dataset:", error);
    } finally {
      setState({ isTableLoading: false});
    }
};

export default createRequestsTable;

/**
 * What if we want to dynamically define the table structure without loading the data?
 *   We can modify the try-catch to read the schema from the parquet file to create the table:
 *
 *    try {
        // Get schema without loading data
        const schemaQuery = `DESCRIBE "${datasetFileName}"`;
        const schemaResult = await conn.query(schemaQuery);
        const schemaLines = schemaResult.toString().split('\n');

        // Generate CREATE TABLE statement based on schema
        const columnDefinitions = schemaLines
          .map(line => line.trim().split(/\s+/))
          .filter(parts => parts.length >= 2) // Ensure valid schema lines
          .map(parts => `${parts[0]} ${parts[1]}`) // Convert to SQL column format
          .join(', ');

        const createSQL = `CREATE TABLE IF NOT EXISTS ${tableNameByYear} (${columnDefinitions})`;

        await conn.query(createSQL);
        const endTime = performance.now();
        console.log(`Table creation time: ${Math.floor(endTime - startTime)} ms.`);
      } catch (error) {
        console.error("Error creating table:", error);
      } finally {
        setState({ isTableLoading: false });
      }
 */
