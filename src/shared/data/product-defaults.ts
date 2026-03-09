export const FALLBACK_PRODUCT = {
    brand: "Dermatologica",
    name: "Rapid Reveal Peel",
    tags: ["Exfoliant", "Normal"] as string[],
    description:
        "A professional-grade chemical peel that gently exfoliates and reveals smoother, brighter skin. Formulated with a blend of AHA and BHA acids to improve skin texture and tone.",
    instructions: [
        "Cleanse your face thoroughly",
        "Apply a thin layer avoiding eye area",
        "Leave on for 5-7 minutes",
        "Rinse thoroughly with lukewarm water",
    ],
    details: [
        { label: "Size", value: "50ml" },
        { label: "Key Ingredients", value: "AHA, BHA, Salicylic Acid" },
        { label: "Skin Type", value: "Normal, Oily" },
    ],
    doctorNotes: "Excellent choice for maintaining skin barrier function.",
    warnings: ["Avoid contact with eyes", "For external use only"],
} as const;
