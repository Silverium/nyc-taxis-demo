
import {
    GridColDef,
} from "@mui/x-data-grid";


// This object could also be conceived as a function consuming the metadata from the response of tinyBird API.
// To do that we would create a mapping correlating the type of data with the type of column (flex, valueFormatter, valueGetter...), and
// another mapping correlating the name of the column with the name of the field in the data (it could even be translated)
export const certificatesColumnsDefinitions: GridColDef[] = [
    {
        field: "id", headerName: "#", type: "number", flex: 1,
    },
    {
        field: "vendorid", headerName: "Vendor ID", flex: 1,
    },
    {
        field: "tpep_pickup_datetime", headerName: "Pickup Date", flex: 2, type: "dateTime", valueFormatter(params) {
            return new Date(params.value).toLocaleString();
        },
    },
    {
        field: "tpep_dropoff_datetime", headerName: "Dropoff Date", flex: 2, type: "dateTime", valueFormatter(params) {
            return new Date(params.value).toLocaleString();
        },
    },
    {
        field: "passenger_count", headerName: "Passenger Count", flex: 1,
    },
    {
        field: "trip_distance", headerName: "Trip Distance", flex: 1,
    },
    {
        field: "ratecodeid", headerName: "Rate Code ID", flex: 1,
    },
    {
        field: "store_and_fwd_flag", headerName: "Store and Forward Flag", flex: 1,
    },
    {
        field: "pulocationid", headerName: "Pickup Location ID", flex: 1,
    },
    {
        field: "dolocationid", headerName: "Dropoff Location ID", flex: 1,
    },
    {
        field: "payment_type", headerName: "Payment Type", flex: 1,
    },
    {
        field: "fare_amount", headerName: "Fare Amount", flex: 1,
    },
    {
        field: "extra", headerName: "Extra", flex: 1,
    },
    {
        field: "mta_tax", headerName: "MTA Tax", flex: 1,
    },
    {
        field: "tip_amount", headerName: "Tip Amount", flex: 1,
    },
    {
        field: "tolls_amount", headerName: "Tolls Amount", flex: 1,
    },
    {
        field: "improvement_surcharge", headerName: "Improvement Surcharge", flex: 1,
    },
    {
        field: "total_amount", headerName: "Total Amount", flex: 1,
    },
];