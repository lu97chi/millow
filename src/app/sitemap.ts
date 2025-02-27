import { Property, PropertyFilters } from "@/types/properties";
import { MetadataRoute } from "next";

// Define the base URL for the API
const API_URL = process.env.API_URL || 'http://localhost:4000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    async function fetchProperties(): Promise<Property[]> {
        try {
            // Use a direct fetch with cache: 'force-cache' for static generation
            const response = await fetch(`${API_URL}/properties?status=available`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'force-cache', // This is important for static generation
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            return data.properties || [];
        } catch (error) {
            console.error("Error fetching properties for sitemap:", error);
            return [];
        }
    }

    const properties: Property[] = await fetchProperties();

    const propertiesUrls = properties.map((property) => ({
        url: `https://tuhogar.mx/properties/${property._id}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "daily" as const,
        priority: 0.8,
    }));

    return [
        {
            url: "https://tuhogar.mx",
            lastModified: new Date().toISOString(),
            changeFrequency: "daily" as const,
            priority: 1,
        },
        {
            url: "https://tuhogar.mx/properties",
            lastModified: new Date().toISOString(),
            changeFrequency: "daily" as const,
            priority: 0.8,
        },
        {
            url: "https://tuhogar.mx/favorites",
            lastModified: new Date().toISOString(),
            changeFrequency: "daily" as const,
            priority: 0.8,
        },
        ...propertiesUrls,
    ];
}
