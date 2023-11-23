import * as React from "react";
import Box from "@mui/material/Box";
import {
    GridColDef,
} from "@mui/x-data-grid";
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { Typography, Tooltip } from "@mui/material";
import { useLocalStorage } from 'react-use';
import copyToClipboard from "../../utils/copyToClipboard";

export const certificatesColumnsDefinitions: GridColDef[] = [
    {
        field: "uniqueNumber", width: 400, headerName: "Unique ID", type: "string", renderCell(params) {

            return (
                <Tooltip arrow title="Click to copy the certificate ID" componentsProps={{
                    tooltip: {
                        sx: {
                            fontSize: 16,
                        },
                    },
                }}>
                    <Box onClick={() => copyToClipboard(params.row.uniqueNumber)} justifySelf={"center"} flex={1} flexDirection="column" display="flex" overflow="hidden">
                        <Typography noWrap textOverflow={"ellipsis"}>{params.value}</Typography>
                    </Box>
                </Tooltip>
            );
        },
    },
    { field: "companyName", headerName: "Originator", width: 200 },
    {
        field: "countryCode", width: 100, headerName: "Originator Country", renderCell(params) {
            return (<Tooltip arrow title={`${params.row.countryCode}`}>
                <Box component="img"
                    sx={{
                        boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.2)"
                    }}
                    loading="lazy"
                    width="20"
                    srcSet={`https://flagcdn.com/w40/${params.row.countryCode.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${params.row.countryCode.toLowerCase()}.png`}
                    alt={`${params.row.countryCode} flag`}
                />
            </Tooltip>)
        },
    },
    {
        field: "Owner", width: 200, headerName: "Owner", valueGetter(params) {
            return params.row.carbonUser.company.name
        },
    },
    {
        field: "OwnerCountry", width: 100, headerName: "Owner Country", valueGetter(params) {
            return params.row.carbonUser.company.address.country
        }, renderCell(params) {
            const countryCode = params.row.carbonUser.company.address.country;
            return (<Tooltip arrow title={`${countryCode}`}>
                <Box component="img"
                    sx={{
                        boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.2)"
                    }}
                    loading="lazy"
                    width="20"
                    srcSet={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
                    alt={`${countryCode} flag`}
                />
            </Tooltip >)
        }
    },
    { field: "status", width: 100, headerName: "Status", },
    {
        field: "favorite", width: 100, headerName: "", type: "boolean", renderCell(params) {
            const [favoriteCertificates, setFavoriteCertificates] = useLocalStorage<Record<string, boolean>>('favoriteCertificates', {});
            const isFavorite = favoriteCertificates![params.row.uniqueNumber];
            const addFavorite = () => {
                setFavoriteCertificates({
                    ...favoriteCertificates,
                    [params.row.uniqueNumber]: true
                });
            }
            const removeFavorite = () => {
                setFavoriteCertificates({
                    ...favoriteCertificates,
                    [params.row.uniqueNumber]: false
                });
            }

            return isFavorite ? <TurnedInIcon onClick={removeFavorite} /> : <TurnedInNotIcon onClick={addFavorite} />
        },
    },
];