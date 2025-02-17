import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules:{
            userAgent:'*', // all search engines
            allow:'/',
            disallow:['/admin/','/dashboard/','/api/','/properties/create','/properties/edit']
        },
        sitemap:'https://tuhogar.mx/sitemap.xml'
    }
}