import React, { useEffect, useState } from 'react';
import DbContext from '@db/DbContext';
import DbProvider from './DbProvider';
import moment from 'moment';

const createRequestsTable = async () => {
  this.setState({ isTableLoading: true });
  const { conn, setDbStartTime } = this.context; // removed tableNameByYear
  const startDate = this.props.startDate; // directly use the startDate prop transformed for redux store
  const year = moment(startDate).year(); // extract the year
  const datasetFileName = `requests${year}.parquet`;

  //define table columns
  // `updateHfDataset.py` to clean each year's data such that they conform to this model.
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

  const startTime = performance.now(); // start the time tracker
  setDbStartTime(startTime)

    try {
      await conn.query(createSQL);
      const endTime = performance.now() // end the timer
      console.log(`Dataset registration & table creation (by year) time: ${Math.floor(endTime - startTime)} ms.`);
    } catch (error) {
      console.error("Error in creating table or registering dataset:", error);
    } finally {
      this.setState({ isTableLoading: false});
    }
};

export default createRequestsTable;
