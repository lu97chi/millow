import { MetadataRoute } from "next";
import { Property } from "@/types/property";
import { PropertyService } from "@/server/services/property-service";


export default async function siteMap(): Promise<MetadataRoute.Sitemap> {
    async function fetchProperties(): Promise<Property[]> {
        try {
            const propertyService = PropertyService.getInstance();
            const result = await propertyService.getProperties({status:["available"]});
            return result.properties;
        } catch (error) {
            console.error("Error fetching properties for sitemap:", error);
            return [];
        }
    }

    const properties: Property[] = await fetchProperties();

    const propertiesUrls = properties.map((property) => ({
        url: `https://tuhogar.mx/properties/${property.id}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "daily",
        priority: 0.8,
    }));

    return [
        {
            url: "https://tuhogar.mx",
            lastModified: new Date().toISOString(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: "https://tuhogar.mx/properties",
            lastModified: new Date().toISOString(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: "https://tuhogar.mx/favorites",
            lastModified: new Date().toISOString(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        ...propertiesUrls,
    ] as MetadataRoute.Sitemap;
}
