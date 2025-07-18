export interface Tag {
    name: string,
    model: string,
    modified_at: Date,
    size: number,
    digest: string,
    details: {
        parent_model: string,
        format: string,
        family: string,
        families: string[] | null,
        "parameter_size": string,
        "quantization_level": string
    }
}