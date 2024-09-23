import { Ad } from "@/models/Ad.js";
import { api } from "./AxiosService.js";
import { AppState } from "@/AppState.js";

class AdsService {


  async getAds() {
    const response = await api.get('/api/ads');
    const newAds = response.data.map(ad => new Ad(ad));
    AppState.ads = newAds;
  }
}

export const adsService = new AdsService();