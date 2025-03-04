export interface ModelData {
    id: string;
    name: string;
    type: string;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    description: string;
    imagePath: string;
}

export const model: ModelData[] = [
    {
        id: "cabinet",
        name: "Cabinet",
        type: "cabinet",
        dimensions: {
            width: 36,
            height: 24,
            depth: 24,
        },
        description: "Standard 36-inch cabinet with two doors.",
        imagePath: "https://placehold.co/100x100",
    },
    {
        id: "fridge",
        name: "Fridge",
        type: "fridge",
        dimensions: {
            width: 30,
            height: 70,
            depth: 30,
        },
        description: "Stainless steel outdoor fridge",
        imagePath: "https://placehold.co/100x100",
    },
];
