import moment from 'moment';

const createRequestsTable = async (context, props, setState) => {
  setState({ isTableLoading: true });

  const { conn, tableNameByYear, setDbStartTime } = context;
  const startDate = props.startDate; // directly use the startDate prop transformed for redux store
  const year = moment(startDate).year(); // extract the year
  const datasetFileName = `requests${year}.parquet`;

  // Create the year data table if not exist already
  const createSQL =
    `CREATE TABLE IF NOT EXISTS ${tableNameByYear} AS SELECT * FROM "${datasetFileName}"`; // query from parquet

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
