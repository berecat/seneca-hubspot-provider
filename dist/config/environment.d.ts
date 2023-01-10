declare const environment: Readonly<{
    NODE_ENV: string;
    PORT: number;
    SECRET: string;
} & import("envalid").CleanedEnvAccessors>;
export default environment;
