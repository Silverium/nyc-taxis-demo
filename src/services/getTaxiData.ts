import { TaxiApiResponse } from "@/types/TaxiApiResponse";
import store from "../store/globalStore";
import toasterSlice from "../store/toaster";

let url = new URL(`https://api.tinybird.co/v0/pipes/yellow_tripdata_2017_pipe.json`)

"GET https://api.tinybird.co/v0/pipes/yellow_tripdata_2017_pipe.json?q=SELECT%20*%20FROM%20your_pipe_name%20LIMIT%2010%20OFFSET%2010"

export const getTaxiData = async (page = 0, itemsPerPage = 100) => {
  try {
    const result: TaxiApiResponse = await fetch(`${url}?q=SELECT ROW_NUMBER() OVER (ORDER BY tpep_pickup_datetime) AS id, * FROM _ LIMIT ${itemsPerPage} OFFSET ${itemsPerPage * page}`, {
      headers: {
        Authorization: 'Bearer p.eyJ1IjogIjdmOTIwMmMzLWM1ZjctNDU4Ni1hZDUxLTdmYzUzNTRlMTk5YSIsICJpZCI6ICJmZTRkNWFiZS05ZWIyLTRjMjYtYWZiZi0yYTdlMWJlNDQzOWEifQ.P67MfoqTixyasaMGH5RIjCrGc0bUKvBoKMwYjfqQN8c'
      },

    })
      .then(r => r.json())
    return result;
  } catch (err) {
    console.error(err);
    // we swallow the error here to not break the app, but we should report it to an error tracking service
    store.dispatch(toasterSlice.actions.open({ message: 'Error fetching data. Retry later', severity: 'error' }))
    return { data: [] } as Partial<TaxiApiResponse>;
  }
};

export default getTaxiData;