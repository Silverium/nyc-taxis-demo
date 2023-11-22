export type CertificateItem = {
    id: number;
    uniqueNumber: string;
    companyName: string;
    countryCode: string;
    combinedCertificates?: CertificateItem[];
    carbonUser: {
        company: {
            name: string;
            address: {
                country: string;
            }
        }
    }
};
export type CertificatesResult = {
    result: {
        data: CertificateItem[];
    }
};
