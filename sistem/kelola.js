export default class kelolaRute {
  async cekIsiDataRute() {
    try {
      const response = await fetch("sistem/rute.json");
      const dataRute = await response.json();
      return dataRute;
    } catch (error) {
      console.log("Error:", error);
    }
  }
  async cekRute(rute) {
    if (rute) {
      const dataIsiRute = await this.cekIsiDataRute();
      if (dataIsiRute[rute]) {
        const isiHtml = await fetch(`./halaman/${dataIsiRute[rute].html}`);
        return await isiHtml.text();
      }
    }
  }
}
