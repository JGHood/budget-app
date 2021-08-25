export default interface Purchase {
    id: string,
    description: string | undefined,
    vendor: string | undefined,
    purchaseDate: Date,
    cost: number | undefined,
    category: string | undefined,
    subcategory: string | undefined,
    purchaseMethod: string | undefined,
    purchaseHappiness: number | undefined,
    purchaser: string | undefined
}