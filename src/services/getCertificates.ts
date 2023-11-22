import { CertificatesResult } from "@/types/CertificatesResponse";

export const getCertificates = () => fetch("https://demo.api.agreena.com/api/public/carbon_registry/v1/certificates?includeMeta=true&page=1&limit=10", {
  headers: {
    "API-ACCESS-TOKEN": "Commoditrader-React-FE-Farmer"
  }
}).then((response) => response.json()
).then(({ result: { data } }: CertificatesResult) => data.flatMap((certificate) => {
  return certificate.combinedCertificates || certificate;

})).catch((err) => {
  console.error(err);
  return [];
});

export default getCertificates;