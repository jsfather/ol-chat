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
        families: string[],
        "parameter_size": string,
        "quantization_level": string
    }
}

export interface TagsState {
    data: Tag[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    selectedTag: Tag | null,
}
