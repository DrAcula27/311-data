const createRequestsTable = async ({conn, setDbStartTime}, setState) => {
  setState({ isTableLoading: true });

  // define the requests table if it doesn't already exist
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
  setDbStartTime(startTime);

    try {
      await conn.query(createSQL);
      const endTime = performance.now();
      console.log(`Dataset registration & table creation (by year) time: ${Math.floor(endTime - startTime)} ms.`);
    } catch (error) {
      console.error("Error in creating table or registering dataset:", error);
    } finally {
      setState({ isTableLoading: false });
    }
};

const fetchData = async () => {
  /**
   * this is a placeholder function to request data when given a set of filter params. e.g: date range(s), SR type, SR status, NC
   * once fleshed out, it will replace the setData function in components/Map/index.jsx
   */

}

export { createRequestsTable, fetchData };
