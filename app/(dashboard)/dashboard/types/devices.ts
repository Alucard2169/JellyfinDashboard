export type Device = {
    Name: string;
    CustomName?: string;
    Id: string;
    LastUserName: string;
    AppName: string;
    AppVersion: string;
    LastUserId: string;
    DateLastActivity: string;
    Capabilities: {
        PlayableMediaTypes: string[];
        SupportedCommands: string[];
        SupportsMediaControl: boolean;
        SupportsPersistentIdentifier: boolean;
    };
};

export type DeviceData = {
    Items: Device[];
    TotalRecordCount: number;
    StartIndex: number;
};
