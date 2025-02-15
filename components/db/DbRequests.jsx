// import moment from 'moment';

// passed ALL THE THINGS for now. Once working as intended, see if can reduce what is passed to optimize
//  - e.g., just pass conn, setDbStartTime instead of entire context
const createRequestsTable = async (context, props, setState) => {
  setState({ isTableLoading: true });

  const { conn, setDbStartTime } = context;
  const startDate = props.startDate; // directly use the startDate prop transformed for redux store
  // const year = moment(startDate).year(); // extract the year
  // const datasetFileName = `requests${year}.parquet`;

  // const createSQL =
  //   `CREATE TABLE IF NOT EXISTS ${tableNameByYear} AS SELECT * FROM "${datasetFileName}"`;

  // Create the year data table if not exist already
  const createSQL = `
    CREATE TABLE IF NOT EXISTS requests (
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

  const startTime = performance.now();
  setDbStartTime(startTime)

    try {
      await conn.query(createSQL);
      const endTime = performance.now()
      console.log(`Dataset registration & table creation (by year) time: ${Math.floor(endTime - startTime)} ms.`);
    } catch (error) {
      console.error("Error in creating table or registering dataset:", error);
    } finally {
      setState({ isTableLoading: false });
    }
};

export default createRequestsTable;




// create `fetchData` function that console.logs DESCRIBE requestTable
/**
 * this is a placeholder function to request data when given a set of filter params. e.g., date range(s), SR type, SR status, NC
 * it will replace the setData function in components/Map/index.jsx
 */
