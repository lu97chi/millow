import { ALL_STATS, type PropertyStats } from "../data/stats";

export class StatsService {
  private static instance: StatsService;
  private stats: PropertyStats;

  private constructor() {
    this.stats = ALL_STATS;
  }

  public static getInstance(): StatsService {
    if (!StatsService.instance) {
      StatsService.instance = new StatsService();
    }
    return StatsService.instance;
  }

  public async getGeneralStats() {
    return {
      totalProperties: this.stats.totalProperties,
      averagePricing: this.stats.averagePricing,
      maxPricing: this.stats.maxPricing,
      minPricing: this.stats.minPricing,
      propertyTypeDistribution: this.stats.propertyTypeDistribution,
      operationTypeDistribution: this.stats.operationTypeDistribution,
    };
  }

  public async getHomePageStats() {
    return {
      totalProperties: this.stats.totalProperties,
      averagePricing: this.stats.averagePricing,
      totalLocations: Object.keys(this.stats.locationDistribution).length,
      propertyTypeDistribution: this.stats.propertyTypeDistribution,
      topLocations: this.stats.topLocations,
      priceRanges: this.stats.priceRanges,
      newConstructions: this.stats.propertyAgeDistribution["New Construction"],
      averagePriceByType: this.stats.averagePriceByType,
    };
  }

  public async getDetailedStats() {
    return this.stats;
  }

  public async getPropertyTypeStats() {
    return {
      distribution: this.stats.propertyTypeDistribution,
      averagePrice: this.stats.averagePriceByType,
      averageSize: this.stats.averageSizeByType,
      pricePerSquareMeter: this.stats.pricePerSquareMeter.byPropertyType,
    };
  }

  public async getLocationStats() {
    return {
      distribution: this.stats.locationDistribution,
      topByPrice: this.stats.topLocations.byPrice,
      topByVolume: this.stats.topLocations.byVolume,
    };
  }

  public async getPricingStats() {
    return {
      average: this.stats.averagePricing,
      max: this.stats.maxPricing,
      min: this.stats.minPricing,
      ranges: this.stats.priceRanges,
      pricePerSquareMeter: this.stats.pricePerSquareMeter,
    };
  }
} 