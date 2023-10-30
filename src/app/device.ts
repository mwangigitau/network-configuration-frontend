export interface Device {
    _id: string,
    mac_address: string,
    type: string,
    manufacturer: string,
    description: string,
    date: Date,
    coordinates: string[]
}
