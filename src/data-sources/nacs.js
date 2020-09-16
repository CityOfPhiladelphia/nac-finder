export default {
  id: 'nacs',
  type: 'http-get',
  dependent: 'none',
  resettable: false,
  url: 'https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services//DHCD_NeighborhoodResources_Merge/FeatureServer/0/query',
  options: {
    params: {
      where: '1=1',
      outFields: '*',
      f: 'pjson',
    },
  },
};
