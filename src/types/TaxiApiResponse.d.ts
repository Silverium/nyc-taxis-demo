type TaxiData = {
    id: number;
    vendorid: number;
    tpep_pickup_datetime: string;
    tpep_dropoff_datetime: string;
    passenger_count: number;
    trip_distance: number;
    ratecodeid: number;
    store_and_fwd_flag: string;
    pulocationid: number;
    dolocationid: number;
    payment_type: number;
    fare_amount: number;
    extra: number;
    mta_tax: number;
    tip_amount: number;
    tolls_amount: number;
    improvement_surcharge: number;
    total_amount: number;
};

export type TaxiApiResponse = {
    data: TaxiData[];
    meta: {
        name: string;
        type: string;
    }[];
    rows: number;
    rows_before_limit_at_least: number;
};