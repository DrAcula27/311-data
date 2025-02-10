import React, { useEffect, useContext } from 'react';
import DbContext from './DbContext';
import DbProvider from './DbProvider';
import moment from 'moment';

import Map from '../Map/Map';
// import MapContainer from '../Map/index';
// import MapOverview from '../Map/controls/MapOverview';
// import {dispatch} from '@root/redux/store';

const createRequestsTable = async (startDateProp) => {
  Map.isRequestsTableLoading = true;
  console.log('Map.isRequestsTableLoading: ' + Map.isRequestsTableLoading);
  console.log('dbcontext: ', DbContext._currentValue.conn);

  // const { conn, setDbStartTime } = useContext(DbContext); // removed tableNameByYear
  const startDate = startDateProp;
  const year = moment(startDate).year(); // extract the year
  const datasetFileName = `requests${year}.parquet`;

  //define table columns
  //* `updateHfDataset.py` to clean each year's data such that they conform to this model.
  const colNames = `
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
    HouseNumber VARCHAR, -- in Hf this is int64
    Direction VARCHAR,
    StreetName VARCHAR,
    Suffix VARCHAR,
    ZipCode VARCHAR, -- in Hf this is int64
    Latitude DECIMAL(8),
    Longitude DECIMAL(8),
    Location VARCHAR,
    TBMPage VARCHAR,
    TBMColumn VARCHAR,
    TBMRow VARCHAR, -- in Hf this is int64
    APC VARCHAR,
    CD VARCHAR, -- in Hf this is int64
    CDMember VARCHAR,
    NC VARCHAR, -- in Hf this is int64
    NCName VARCHAR,
    PolicePrecinct VARCHAR,
   `;

  // Create the year data table if not exist already
  //? do we need to keep `IF NOT EXISTS` part of createSQL?
  const createSQL =
    `CREATE TABLE IF NOT EXISTS requests (${colNames})`; // query from parquet

  // const startTime = performance.now(); // start the time tracker
  // setDbStartTime(startTime)

  try {
    console.log('dbcontextTRY: ', DbContext._currentValue.conn);
    // await conn.query(createSQL);
    await DbContext._currentValue.conn.query(createSQL);
    // const endTime = performance.now() // end the timer
    // console.log(`Dataset registration & table creation (by year) time: ${Math.floor(endTime - startTime)} ms.`);
  } catch (error) {
    console.error("Error in creating table or registering dataset:", error);
  } finally {
    console.log('finally');
  }
};

export default createRequestsTable;
