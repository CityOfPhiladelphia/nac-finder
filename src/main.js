// this is the base-config for resource-finder
// the point of this file is that it will move outside the project
// (so that settings we put in it can be used by other projects)
// and be pulled in with an axios call or something
// (we might not need to use axios with new vue async tools)
// if that is not needed, we can move this info to main.js

// turn off console logging in production
if (process.env.NODE_ENV === 'production') {
  console.log = console.info = console.debug = console.error = function () {};
}
console.log('main.js process.env.NODE_ENV:', process.env.NODE_ENV, 'process.env.VUE_APP_PUBLICPATH:', process.env.VUE_APP_PUBLICPATH);


// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faBuilding } from '@fortawesome/free-solid-svg-icons/faBuilding';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faUserMd } from '@fortawesome/free-solid-svg-icons/faUserMd';
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons/faExternalLinkAlt";

library.add(faExclamationTriangle, faBuilding, faUser, faUserMd, faCircle, faExternalLinkAlt );

// import pinboard
import pinboard from '@phila/pinboard/src/main.js';

// data-sources
import nacs from './data-sources/nacs';
// import compiled from './data-sources/compiled';
// var BASE_CONFIG_URL = 'https://cdn.jsdelivr.net/gh/cityofphiladelphia/mapboard-default-base-config@6126861722cee9384694742363d1661e771493b9/config.js';

import expandCollapseContent from './components/ExpandCollapseContent.vue';
import customGreeting from './components/customGreeting.vue';
const customComps = {
  'expandCollapseContent': expandCollapseContent,
  'customGreeting': customGreeting,
};

pinboard({
  alerts: {
    // modal: {
    //   enabled: true,
    //   header: 'Access Centers ',
    //   body: '<p>Access Centers are free, but you must check eligibility and register your child in advance. For full program details, visit the <a href="https://www.phila.gov/access-centers">Access Centers webpage</a>.',
    // },
    // header: {
    //   type: 'alertBanner',
    //   // enabled: function(state) {
    //   //   return state.alertResponse === 'alertHours';
    //   // },
    //   // content: '<b>Until further notice:</b> Please call ahead or check hours of operation while business restrictions are still in effect.',
    // },
    alertChecks: [
      // {
      //   type: 'alertHours',
      //   condition: [
      //     {
      //       'day': 1,
      //       'startTime': '1:00',
      //       'endTime': '23:59',
      //     },
      //     {
      //       'day': 2,
      //       'startTime': '1:00',
      //       'endTime': '23:59',
      //     },
      //   ],
      // },
    ],
  },
  app: {
    title: 'Neighborhood Resources',
    subtitle: 'Find housing, repair, and utility assistance',
    logoAlt: 'City of Philadelphia',
    type: 'nacs',
  },
  gtag: {
    category: 'rf-nacs',
  },
  resetDataOnGeocode: true,
  searchBar: {
    placeholder: 'Search by address or keyword',
    searchTypes: [
      'address',
      'keyword',
    ],
    labelText:  {
      address: 'Search by address',
      keyword: 'Search by keyword',
    },
    placeholderText: {
      address: 'Search by address',
      keyword: 'Search by keyword',
    },
  },
  locationInfo: {
    siteName: function(item) {
      // console.log(`  locationInfo:`, item );
      return item.attributes.AGENCY;
    },
  },
  tags: {
    type: 'fieldValues',
    tags: [
      {
        field: 'FORECLOSURE',
        type: 'boolean',
        value: 'Foreclosure',
      },
      {
        field: 'PRE_PURCHASE',
        type: 'boolean',
        value: 'Pre-Purchase',
      },
      {
        field: 'SPECIALTY',
        type: 'value',
        // value: 'test',
      },
    ],
  },
  customComps,
  // baseConfig: BASE_CONFIG_URL,
  // holidays: {
  //   days: ['Monday'],
  // },
  refine: {
    type: 'multipleFields',
    multipleFields: {
      'Housing Counseling Agency': function(item){
        // console.log('running HCA function, item:', item);
        return item.attributes.HCA === 'Yes';
      },
      'Neighborhood Advisory Committee': function(item) {
        return item.attributes.NAC === 'Yes';
      },
      'Neighborhood Energy Center': function(item) {
        return item.attributes.NEC === 'Yes';
      },
    },
  },
  markerType: 'circle-marker',
  circleMarkers:{
    color: '#FF9D14',
    weight: 0,
    radius: 8,
    mobileRadius: 12,
    size: 16,
    mobileSize: 20,
  },
  cyclomedia: {
    enabled: false,
    // measurementAllowed: false,
    // popoutAble: true,
    // recordingsUrl: 'https://atlas.cyclomedia.com/Recordings/wfs',
    // username: process.env.VUE_APP_CYCLOMEDIA_USERNAME,
    // password: process.env.VUE_APP_CYCLOMEDIA_PASSWORD,
    // apiKey: process.env.VUE_APP_CYCLOMEDIA_API_KEY,
  },
  dataSources: {
    nacs,
  },
  router: {
    enabled: false,
  },
  projection: '2272',
  geocoder: {
    url(input) {
      const inputEncoded = encodeURIComponent(input);
      return `//api.phila.gov/finder/v1/search/${inputEncoded}`;
    },
    params: {
      // gatekeeperKey: process.env.VUE_APP_GATEKEEPER_KEY,
      include_units: true,
    },
  },
  footer: [
    {
      type: "native",
      href: "https://www.phila.gov/",
      attrs: {
        target: "_blank",
      },
      text: "City of Philadelphia",
    },
    {
      type: "native",
      href: "/oia/resource-finder",
      text: "About",
    },
    {
      type: "native",
      href: "https://www.phila.gov/feedback/",
      attrs: {
        target: "_blank",
      },
      text: "Feedback",
    },
    {
      type: "native",
      href: 'https://www.phila.gov/departments/division-of-housing-and-community-development/neighborhood-resources/',
      attrs: {
        target: "_blank",
      },
      text: 'View accessible list of sites',
    },
  ],
  // infoCircles: {
  //   'symptomatic': {
  //     'html': '\
  //     <div class="full-div">For more information, see <a class="white-font-link" target="_blank" href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html">\
  //     Symptoms of coronavirus (CDC)</a>.</div>\
  //     ',
  //   },
  // },
  map: {
    // type: 'leaflet',
    type: 'mapbox',
    // tiles: 'hosted',
    containerClass: 'map-container',
    defaultBasemap: 'pwd',
    center: [ -75.163471, 39.953338 ],
    minZoom: 11,
    maxZoom: 25,
    shouldInitialize: true,

    zoom: 12,
    geocodeZoom: 15,
    imagery: {
      enabled: false,
    },
    basemaps: {
      pwd: {
        url: 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer',
        tiledLayers: [
          'cityBasemapLabels',
        ],
        type: 'featuremap',
        attribution: 'Parcels: Philadelphia Water',
      },
    },
    tiledLayers: {
      cityBasemapLabels: {
        url: 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer',
        zIndex: '3',
      },
    },
  },
  // mbStyle: 'mapbox://styles/ajrothwell/ck6gz6rmk04681ir1fdmagq5h',
  mbStyle: {
    version: 8,
    sources: {
      pwd: {
        tiles: [
          'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer/tile/{z}/{y}/{x}',
        ],
        type: 'raster',
        tileSize: 256,
      },
    },
    layers: [
      {
        id: 'pwd',
        type: 'raster',
        source: 'pwd',
      },
    ],
  },
  basemapSources: {
    pwd: {
      source: {
        tiles: [
          'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer/tile/{z}/{y}/{x}',
          // '//tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}'
        ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'pwd',
        type: 'raster',
      },
    },
    imagery2019: {
      source: {
        tiles: [
          'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_2019_3in/MapServer/tile/{z}/{y}/{x}',
          // '//tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}'
        ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'imagery2019',
        type: 'raster',
      },
    },
  },
  basemapLabelSources:{
    cityBasemapLabels: {
      source: {
        tiles: [ 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}' ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'cityBasemapLabels',
        type: 'raster',
      },
    },
    imageryBasemapLabels: {
      source: {
        tiles: [ 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_Labels/MapServer/tile/{z}/{y}/{x}' ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'imageryBasemapLabels',
        type: 'raster',
      },
    },
  },
  i18n: {
    header: 'i18nBanner',
    enabled: false,
    refinePanel: false,
    expandCollapseTitle: false,
    footer: true,
    data: {
      locale: 'en-US',
      messages: {
        'en-US': {
          language: 'English',
          app: {
            title: 'Neighborhood Advisory Committees (NACs)',
            subtitle: 'Providing families without childcare a safe space for digital learning.',
            // bannerAlert: 'Many sites are closed today. Check specific site details for more information.',
            noResults: 'No center was found within your search. Please try again.',
          },
          introPage: {
            introTitle: 'About this finder',
            p1: 'This tool can help you find an Access Center in Philadelphia.  You can:',
            ul1: {
              li1: 'Search for an Access Center by address.',
              li2: 'Click on a map location for specific site information.',
            },
            //section1Title: 'Find out if you’re eligible',
            p2: '​',
            // ul2: {
            //   li1: 'Limit testing to people who meet certain criteria.',
            //   li2: 'Require an appointment.',
            //   li3: 'Require a referral from your doctor.',
            //   li4: 'Ask you to stay in your car (for drive-thru sites).',
            // },
            p3: 'Check a location’s specific details on the map. Then, call or visit the provider\'s website before going for a test.',
            callout1: {
              p1: '<b>Questions?</b> Please call your health care provider or see our FAQ about <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">getting tested in Philadelphia</a>.',
            },
          },
          beforeYouGo: 'Before you go',
          checkSite: 'Eligibility requirements and testing hours vary by site. Be sure to check site details to arrange for testing.',
          hoursVary: 'Hours and availability varies.',
          eligibility: 'Details',
          testingHours: 'Testing hours',
          daysOfOperation: 'Days of operation',
          Monday: 'Mon.',
          Tuesday: 'Tues.',
          Wednesday: 'Wed.',
          Thursday: 'Thurs.',
          Friday: 'Fri.',
          Saturday: 'Sat.',
          Sunday: 'Sun.',
          // access: 'Process',
          Yes: 'Yes',
          No: 'No',
          Unknown: 'Unknown',
          website: 'Website',
          process: {
            category: 'Process',
            dt: 'Drive-thru',
            wu: 'Walk-up',
            both: 'Drive-thru & walk-up',
          },
          symptomatic: {
            category: 'Must be symptomatic',
            null: '',
            symptom: 'Must be symptomatic',
            asymptom: 'Need not be symptomatic',
          },
          refReq: {
            category: 'Referral required',
            null: '',
            yes: 'Referral required',
            no: 'No referral required',
          },
          patientAge: {
            category: 'Patient age',
            null: '',
            year14: '+14 years old',
            year18: '+18 years old',
            pedCare: 'Offers pediatric testing',
          },
          panelText:{
            p1: 'If you are unable to get a COVID-19 test through your health care provider, this tool can help you find a test within the City of Philadelphia.',
          },
          restrictions: {
            lowInc: 'This site is intended for low-income families and individuals.',
            year14: 'Must be 14 years or older.',
            year18: 'Must be 18 years or older.',
            netPat: 'A patient must be in the provider’s network to receive a test at this site.',
            medPrior: 'Priority will be given to health care workers and first responders at this site.',
            homeless: 'This site is intended for people experiencing homelessness.',
            telemed: 'A telemedicine visit is required before testing at this site.',
            onlineQuest: 'An online questionnaire must be completed before visiting this site.',
          },
          notes:{
            schedApp: 'Appointments are required for testing.',
            refReq: 'Referral required.',
            schedAppRefReq: 'Appointment and referral required.',
            noApp: 'No appointment necessary for testing.',
            testAll: 'Testing provided even if symptoms are not present.',
          },
          facilityType: {
            drugstore: 'Drugstore',
            fieldSite: 'Field Site',
            clinic: 'Clinic',
            hospital: 'Hospital',
            other: 'Other',
            phmcHC: 'PHMC health center',
            urgentCare: 'Urgent Care',
            cityHC: 'City health center',
            homelessServices: 'Homeless services',
          },
        },
        'es': {
          language: 'Español',
          app: {
            title: 'Lugares donde se realizan pruebas de COVID-19',
            subtitle: 'Encuentre un lugar cercano para hacerse la prueba de COVID-19.',
            bannerAlert: 'Muchos lugares están cerrados hoy. Consulte los detalles específicos del lugar para obtener más información.',
            noResults: 'No se encontró un lugar donde se realicen pruebas que coincida con su búsqueda. Llame a su proveedor de atención médica o visite el sitio web sobre COVID-19 del Departamento de Salud Pública para obtener información sobre <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">cómo hacerse la prueba en Filadelfia</a>.',
          },
          introPage: {
            introTitle: 'Sobre este buscador',
            p1: 'Esta herramienta puede ayudarlo a encontrar una prueba de COVID-19 gratuita en Filadelfia. (Consulte nuestras Preguntas frecuentes para obtener más información sobre <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">quién debería hacerse la prueba</a>). Puede hacer lo siguiente:',
            ul1: {
              li1: 'Buscar un lugar donde se realicen pruebas según la dirección.',
              li2: 'Hacer clic en una ubicación del mapa para obtener información específica del lugar.',
              li3: 'Filtrar la lista de lugares según las etiquetas provistas.',
            },
            section1Title: 'Saber si es elegible.',
            p2: 'Ningún centro de pruebas le solicitará dinero. Se le pedirá una identificación y también es posible que se le pida información del seguro de salud. Si no tiene una identificación o seguro de salud, de todos modos, pueden realizarse una prueba. Además, es posible que algunos sitios:',
            ul2: {
              li1: 'Restringir la prueba para personas que cumplan ciertos requisitos.',
              li2: 'Exigir una cita.',
              li3: 'Exigir una derivación médica.',
              li4: 'Pedirle que se quede en su automóvil (en lugares a los que se accede en automóvil).',
            },
            p3: 'Revise los detalles de una ubicación específica en el mapa. Luego, puede llamar o visitar el sitio web del proveedor antes de ir a realizarse la prueba.',
            callout1: {
              p1: '<b>¿Tiene preguntas?</b> Llame a su proveedor de atención médica o consulte nuestras Preguntas frecuentes sobre <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">cómo hacerse la prueba en Filadelfia</a>.',
            },
          },
          beforeYouGo: 'Antes de ir',
          checkSite: 'Revise los detalles específicos del lugar.',
          hoursVary: 'Los horarios y la disponibilidad pueden variar.',
          eligibility: 'Detalles',
          testingHours: 'Horario para las pruebas',
          daysOfOperation: 'Días de servicio',
          Monday: 'Lun.',
          Tuesday: 'Mar.',
          Wednesday: 'Mié.',
          Thursday: 'Jue.',
          Friday: 'Vie.',
          Saturday: 'Sáb.',
          Sunday: 'Dom.',
          // access: 'Acceso',
          Yes: 'Sí',
          No: 'No',
          Unknown: 'Desconocido',
          website: 'Sitio web',
          process: {
            category: 'Proceso',
            dt: 'En vehículo',
            wu: 'A pie',
            both: 'En vehículo y a pie',
          },
          symptomatic: {
            category: 'Debe ser sintomático',
            null: '',
            symptom: 'Debe ser sintomático',
            asymptom: 'No debe ser sintomático',
          },
          refReq: {
            category: 'Se necesita derivación',
            null: '',
            yes: 'Se necesita derivación',
            no: 'No se necesita derivación',
          },
          patientAge: {
            category: 'Edad del paciente',
            null: '',
            year14: 'Más de 14 años',
            year18: 'Más de 18 años',
            pedCare: 'Ofrece pruebas pediátricas',
          },
          panelText: {
            p1: 'Si no puede obtener una prueba de COVID-19 a través de su proveedor de atención médica, esta herramienta puede ayudarlo a encontrar una prueba gratuita en la ciudad de Filadelfia.',
          },
          restrictions: {
            lowInc: 'Este sitio está dirigido a las familias y las personas de bajos ingresos. ',
            year14: 'Debe tener 14 años de edad o más.',
            year18: 'Debe tener 18 años de edad o más.',
            netPat: 'El paciente debe pertenecer a la red del proveedor para recibir una prueba en este lugar.',
            medPrior: 'En este lugar, se dará prioridad a los trabajadores de salud y las personas en la primera línea de respuesta.',
            homeless: 'Este lugar está dirigido a las personas sin hogar.',
            telemed: 'Se requiere una consulta de telemedicina antes de realizar pruebas en este lugar.',
            onlineQuest: 'Se debe completar un cuestionario en línea antes de acudir a este sitio.',
          },
          notes: {
            schedApp: 'Se requiere cita para las pruebas.',
            refReq: 'Se necesita derivación.',
            schedAppRefReq: 'Se necesita cita y derivación.',
            noApp: 'No se requiere cita para las pruebas.',
            testAll: 'Se realiza la prueba aunque no tenga síntomas.',
          },
          facilityType: {
            drugstore: 'Farmacia',
            fieldSite: 'Sitio de campo',
            clinic: 'Clínica',
            hospital: 'Hospital',
            other: 'Otro',
            phmcHC: 'Centro de salud PHMC',
            urgentCare: 'Atención urgente',
            cityHC: 'Centro de salud de la ciudad',
            homelessServices: 'Servicios para personas sin hogar',
          },
        },
        'ch': {
          language: '中文',
          app: {
            title: 'COVID-19 检测地点',
            subtitle: '搜索您附近的 COVID-19 检测地点',
            bannerAlert: '今天很多地点均关闭。有关更多信息，请查看具体地点详细信息。',
            noResults: '在您的搜索范围内未找到检测地点。请致电您的医疗保健提供者或访问公共卫生部 (Department of Public Health) 的 COVID-19 网站，了解关于 <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">在费城进行检测</a>的信息.',
          },
          introPage: {
            introTitle: '关于此搜索工具',
            p1: '此工具可以帮助您找到费城的 COVID-19 检测地点。（关于 <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">“应接受测试人员”</a>的更多信息，请参见我们的“常见问题”。）您可以：',
            ul1: {
              li1: '按地址搜索检测地点。',
              li2: '点击地图上的位置了解具体地点信息。',
              li3: '按提供的标签筛选地点列表',
            },
            section1Title: '查询您是否符合条件',
            p2: '测试点不会向您收取费用。我们会要求您提供身份证明，还可能会要求您提供医疗保险信息。如果您没有身份证明或医疗保险，仍可以接受检查。此外，有些测试点可能会：',
            ul2: {
              li1: '仅限符合特定标准的人进行检测。',
              li2: '需要预约。',
              li3: '需要医生转介。',
              li4: '要求您留在车里（适用于免下车地点）。',
            },
            p3: '查看地图上某一位置的详情。然后，前去检测前，请致电或访问提供者的网站。',
            callout1: {
              p1: '<b>是否有任何疑问？</b>关于在费城进行检测的信息，请致电您的医疗保健提供者或参见我们的“常见问题”.',
            },
          },
          beforeYouGo: '在您出发前请先了解以下信息',
          checkSite: '查看具体地点详情。',
          hoursVary: '时间和可用性各不相同。',
          eligibility: '详情',
          testingHours: '检测时间',
          daysOfOperation: '营业时间',
          Monday: '周一',
          Tuesday: '周二',
          Wednesday: '周三',
          Thursday: '周四',
          Friday: '周五',
          Saturday: '周六',
          Sunday: '周日',
          // access: '访问',
          Yes: '是',
          No: '否',
          Unknown: '未知',
          website: '网站',
          process: {
            category: '流程',
            dt: '免下车',
            wu: '步行',
            both: '免下车和步行',
          },
          symptomatic: {
            category: '必须有症状',
            null: '',
            symptom: '必须有症状',
            asymptom: '不需要有症状',
          },
          refReq: {
            category: '需要转介',
            null: '',
            yes: '需要转介',
            no: '不需要转介',
          },
          patientAge: {
            category: '患者年龄',
            null: '',
            year14: '14 岁以上',
            year18: '18 岁以上',
            pedCare: '提供儿科检测',
          },
          panelText: {
            p1: '如果您无法通过您的医疗保健提供者进行 COVID-19 检测，此工具可以帮助您找到费城市内的免费检测地点。',
          },
          restrictions: {
            lowInc: '此站点是为低收入家庭和个人准备的。',
            year14: '必须 14 岁或以上。',
            year18: '必须 18 岁或以上。',
            netPat: '患者必须在提供者网络中才能在此站点接受检测。',
            medPrior: '此站点将优先考虑医疗保健工作人员和急救人员。',
            homeless: '此站点是为无家可归的人准备的。',
            telemed: '在此站点进行检测前需要进行远程医疗看诊。',
            onlineQuest: '来本站点之前必须完成在线调查问卷。',
          },
          notes: {
            schedApp: '检测需要预约。',
            refReq: '需要转介。',
            schedAppRefReq: '需要预约和转介。',
            noApp: '检测无需预约。',
            testAll: '即使未出现症状也可提供检测。',
          },
          facilityType: {
            drugstore: '药房',
            fieldSite: '户外地点',
            clinic: '诊所',
            hospital: '医院',
            other: '其他',
            phmcHC: 'PHMC 健康中心',
            urgentCare: '急救中心',
            cityHC: '市健康中心',
            homelessServices: '无家可归者服务',
          },
        },
        'vi': {
          language: 'Tiếng Việt',
          app: {
            title: 'Các cơ sở xét nghiệm COVID-19',
            subtitle: 'Tìm cơ sở xét nghiệm COVID-19 gần quý vị',
            bannerAlert: 'Hôm nay, nhiều địa điểm đóng cửa. Hãy kiểm tra các chi tiết về địa điểm cụ thể để biết thêm thông tin.',
            noResults: 'Không tìm thấy cơ sở xét nghiệm trong phạm vi tìm kiếm của quý vị. Vui lòng gọi điện cho nhà cung cấp dịch vụ chăm sóc sức khỏe của quý vị hoặc truy cập trang web về COVID-19 của Sở Y Tế Công Cộng để biết thông tin về a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">cách nhận xét nghiệm tại Philadelphia</a>.',
          },
          introPage: {
            introTitle: 'Giới thiệu công cụ tìm kiếm này',
            p1: 'Công cụ này có thể giúp quý vị tìm một cơ sở xét nghiệm tại Philadelphia. (Xem Các Câu Hỏi Thường Gặp của chúng tôi để biết thêm thông tin về <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">những người nên được xét nghiệm</a>.) Quý vị có thể:',
            ul1: {
              li1: 'Tìm cơ sở xét nghiệm theo địa chỉ.',
              li2: 'Nhấn vào địa điểm trên bản đồ để biết thông tin về cơ sở cụ thể.',
              li3: 'Lọc danh sách cơ sở bằng các thẻ gắn được cung cấp.',
            },
            section1Title: 'Tìm hiểu liệu quý vị có hội đủ điều kiện không',
            p2: 'Không cơ sở xét nghiệm nào sẽ đề nghị quý vị trả tiền. Họ sẽ hỏi danh tính và cũng có thể hỏi thông tin bảo hiểm y tế của quý vị. Nếu quý vị không có giấy tờ tùy thân hoặc bảo hiểm y tế, quý vị vẫn có thể nhận được dịch vụ xét nghiệm. Ngoài ra, một số cơ sở có thể:',
            ul2: {
              li1: 'Hạn chế chỉ xét nghiệm cho những người đáp ứng các tiêu chí nhất định.',
              li2: 'Yêu cầu đặt lịch hẹn.',
              li3: 'Yêu cầu giấy giới thiệu từ bác sĩ của quý vị.',
              li4: 'Yêu cầu quý vị ở yên trong xe (với các cơ sở lái xe qua).',
            },
            p3: 'Kiểm tra thông tin cụ thể chi tiết của địa điểm trên bản đồ. Sau đó, gọi điện hoặc truy cập trang web của nhà cung cấp trước khi đến xét nghiệm.',
            callout1: {
              p1: '<b>Quý vị có câu hỏi?</b> Vui lòng gọi điện cho nhà cung cấp dịch vụ chăm sóc sức khỏe của quý vị hoặc xem Các Câu Hỏi Thường Gặp của chúng tôi về <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">cách nhận xét nghiệm tại Philadelphia</a>.',
            },
          },
          beforeYouGo: 'Trước khi quý vị đến',
          checkSite: 'Hãy kiểm tra thông tin chi tiết của cơ sở cụ thể.',
          hoursVary: 'Giờ làm việc và tính sẵn có khác nhau.',
          eligibility: 'Chi tiết',
          testingHours: 'Giờ xét nghiệm',
          daysOfOperation: 'Ngày làm việc',
          Monday: 'Thứ hai',
          Tuesday: 'Thứ ba',
          Wednesday: 'Thứ tư',
          Thursday: 'Thứ năm',
          Friday: 'Thứ sáu',
          Saturday: 'thứ bảy',
          Sunday: 'Chủ Nhật',
          // access: 'Truy cập',
          Yes: 'Có',
          No: 'Không',
          Unknown: 'Không biết',
          website: 'Trang web',
          process: {
            category: 'Quy trình',
            dt: 'Lái xe qua',
            wu: 'Đi bộ vào',
            both: 'Lái xe qua & đi bộ vào',
          },
          symptomatic: {
            category: 'Phải có triệu chứng',
            null: '',
            symptom: 'Phải có triệu chứng',
            asymptom: 'Không cần có triệu chứng',
          },
          refReq: {
            category: 'Phải có giấy giới thiệu',
            null: '',
            yes: 'Phải có giấy giới thiệu',
            no: 'Không yêu cầu có giấy giới thiệu',
          },
          patientAge: {
            category: 'Tuổi của bệnh nhân',
            null: '',
            year14: 'Trên 14 tuổi',
            year18: 'Trên 18 tuổi',
            pedCare: 'Cung cấp dịch vụ xét nghiệm nhi khoa',
          },
          panelText: {
            p1: 'Nếu quý vị không được xét nghiệm COVID-19 thông qua nhà cung cấp dịch vụ chăm sóc sức khỏe của quý vị, thì công cụ này có thể giúp quý vị tìm cơ sở xét nghiệm miễn phí trong phạm vi Thành Phố Philadelphia.',
          },
          restrictions: {
            lowInc: 'Cơ sở này dành cho các gia đình và cá nhân có thu nhập thấp.',
            year14: 'Phải từ 14 tuổi trở lên.',
            year18: 'Phải từ 18 tuổi trở lên.',
            netPat: 'Bệnh nhân phải thuộc mạng lưới của nhà cung cấp để được xét nghiệm tại cơ sở này.',
            medPrior: 'Ưu tiên cho các nhân viên chăm sóc sức khỏe và nhân viên phản ứng tuyến đầu tại cơ sở này.',
            homeless: 'Cơ sở này dành cho người vô gia cư.',
            telemed: 'Phải được thăm khám y tế qua điện thoại trước khi xét nghiệm tại cơ sở này.',
            onlineQuest: 'Phải hoàn tất bảng câu hỏi trực tuyến trước khi đến thăm khám tại cơ sở này.',
          },
          notes: {
            schedApp: 'Yêu cầu đặt lịch hẹn để xét nghiệm',
            refReq: 'Phải có giấy giới thiệu.',
            schedAppRefReq: 'Phải có lịch hẹn và giấy giới thiệu.',
            noApp: 'Không cần đặt lịch hẹn để xét nghiệm.',
            testAll: 'Thực hiện xét nghiệm ngay cả khi không có triệu chứng.',
          },
          facilityType: {
            drugstore: 'Hiệu Thuốc',
            fieldSite: 'Cơ Sở Tại Hiện Trường',
            clinic: 'Phòng Khám',
            hospital: 'Bệnh Viện',
            other: 'Khác',
            phmcHC: 'Trung tâm y tế PHMC',
            urgentCare: 'Chăm Sóc Khẩn Cấp',
            cityHC: 'Trung tâm y tế thành phố',
            homelessServices: 'Dịch vụ vô gia cư',
          },
        },
        'ru': {
          language: 'Pусский',
          app: {
            title: 'Пункты тестирования на COVID-19',
            subtitle: 'Найдите тест на COVID-19 поблизости',
            bannerAlert: 'Многие места сегодня закрыты. Для получения более подробной информации о месте отдыха просмотрите дополнительные сведения.',
            noResults: 'В ходе поиска не найдено ни одного пункта для тестирования. Позвоните своему врачу или посетите веб-сайт Департамента здравоохранения, посвященный COVID-19, и узнайте, как <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">пройти тестирование в Филадельфии</a>.',
          },
          introPage: {
            introTitle: 'Об этом средстве поиска',
            p1: 'Этот инструмент поможет вам найти пункт тестирования на COVID-19 в Филадельфии. (См. раздел часто задаваемых вопросов, чтобы подробнее узнать, <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">кто должен проходить тестирование</a>.) Вы можете:',
            ul1: {
              li1: 'Выполнить поиск пункта для тестирования по адресу.',
              li2: 'Нажать на местоположение на карте, чтобы получить конкретную информацию о пункте.',
              li3: 'Отфильтровать список пунктов по предоставленным тегам.',
            },
            section1Title: 'Узнать, имеете ли вы право',
            p2: 'Ни в одном из пунктов тестирования не взимается плата. Вас попросят предъявить идентификационный документ, а также могут попросить предоставить информацию о медицинской страховке. Если у вас нет документов или страховки, вы все равно можете пройти тестирование. Помимо этого, некоторые пункты могут:',
            ul2: {
              li1: 'Ограничивать тестирование, проводя его только для людей, которые соответствуют определенным критериям.',
              li2: 'Требовать предварительной записи.',
              li3: 'Требовать направления от вашего врача.',
              li4: 'Просить вас оставаться в машине (если обслуживание проводится без выхода из машины).',
            },
            p3: 'Проверьте дополнительные сведения о местоположении на карте. Затем, прежде чем отправляться на тестирование, позвоните врачу или посетите его веб-сайт.',
            callout1: {
              p1: '<b>Вопросы?</b> Позвоните своему врачу или посмотрите раздел часто задаваемых вопросов о <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">тестировании в Филадельфии</a>.',
            },
          },
          beforeYouGo: 'Прежде чем вы пойдете',
          checkSite: 'Проверьте дополнительные сведения о пункте тестирования.',
          hoursVary: 'Часы работы и возможность оказания услуги могут меняться.',
          eligibility: 'Сведения',
          testingHours: 'Часы тестирования',
          daysOfOperation: 'Рабочие дни',
          Monday: 'Пн',
          Tuesday: 'Вт',
          Wednesday: 'Ср',
          Thursday: 'Чт',
          Friday: 'Пт',
          Saturday: 'Сб',
          Sunday: 'Вс',
          // access: 'Доступ',
          Yes: 'Да',
          No: 'Нет',
          Unknown: 'Неизвестно',
          website: 'Веб-сайт',
          process: {
            category: 'Процесс',
            dt: 'Без выхода из машины',
            wu: 'Пункт внутри помещения',
            both: 'Обслуживание как без выхода из машины, так и внутри помещения',
          },
          symptomatic: {
            category: 'Наличие симптомов обязательно',
            null: '',
            symptom: 'Наличие симптомов обязательно',
            asymptom: 'Наличие симптомов не обязательно',
          },
          refReq: {
            category: 'Требуется направление',
            null: '',
            yes: 'Требуется направление',
            no: 'Направление не требуется',
          },
          patientAge: {
            category: 'Возраст пациента',
            null: '',
            year14: 'C 14 лет',
            year18: 'С 18 лет',
            pedCare: 'Проводится тестирование пациентов детского возраста',
          },
          panelText: {
            p1: 'Если вы не можете пройти тест COVID-19 у своего врача, этот инструмент поможет вам найти пункт бесплатного тестирования в пределах городской черты Филадельфии.',
          },
          restrictions: {
            lowInc: 'Данный пункт тестирования предназначен для семей и лиц с низкими доходами. ',
            year14: 'Для лиц не моложе 14 лет.',
            year18: 'Для лиц не моложе 18 лет.',
            netPat: 'Для прохождения тестирования в данном пункте необходимо быть пациентом сети этого медучреждения.',
            medPrior: 'В данном пункте тестирования приоритет имеют работники системы здравоохранения и служб экстренного реагирования.',
            homeless: 'Данный пункт тестирования предназначен для бездомных людей.',
            telemed: 'Перед тестированием в данном пункте требуется дистанционное посещение врача.',
            onlineQuest: 'Перед посещением данного пункта требуется пройти онлайн-опрос.',
          },
          notes: {
            schedApp: 'Для прохождения тестирования нужна предварительная запись.',
            refReq: 'Требуется направление от врача.',
            schedAppRefReq: 'Требуется предварительная запись и направление от врача.',
            noApp: 'Для прохождения тестирования предварительная запись не нужна.',
            testAll: 'Тестирование проводится даже при отсутствии симптомов.',
          },
          facilityType: {
            drugstore: 'Аптека',
            fieldSite: 'Полевой пункт',
            clinic: 'Клиника',
            hospital: 'Больница',
            other: 'Прочее',
            phmcHC: 'Медицинский центр PHMC',
            urgentCare: 'Пункт неотложной помощи',
            cityHC: 'Городской медицинский центр',
            homelessServices: 'Пункт оказания услуг для бездомных',
          },
        },
        'fr': {
          language: 'Français',
          app: {
            title: 'Sites de dépistage du COVID-19',
            subtitle: 'Trouver où recevoir un test de dépistage du COVID-19 à proximité de chez vous',
            bannerAlert: 'De nombreux sites sont fermés aujourd’hui. Consultez les détails spécifiques au site pour obtenir de plus amples informations.',
            noResults: 'Aucun site de dépistage n’a été trouvé pour votre recherche. Veuillez appeler votre prestataire de soins de santé ou consulter le site Web du département de la Santé publique sur le COVID-19 pour obtenir des informations sur les tests de dépistage à Philadelphie.',
          },
          introPage:{
            introTitle: 'À propos de cet outil de recherche',
            p1: 'Cet outil peut vous aider à trouver où recevoir un test de dépistage du COVID-19 à Philadelphie. (Voir notre FAQ pour toute information complémentaire sur <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">les personnes qui devraient se faire tester</a>.) Vous pouvez :',
            ul1:{
              li1: 'Rechercher un site de dépistage à partir d’une adresse.',
              li2: 'Cliquer sur la carte pour obtenir des informations concernant un site particulier.',
              li3: 'Filtrer la liste des sites selon les balises données.',
            },
            section1Title: 'Découvrir si vous pouvez en bénéficier.',
            p2: 'Tous les sites de dépistage sont gratuits. On vous demandera une pièce d’identité et peut-être des informations sur votre assurance-santé. Si vous n’avez pas de pièce d’identité ou d’assurance-santé, vous pouvez tout de même vous faire dépister. En outre, certains sites peuvent :',
            ul2:{
              li1: 'Limiter les tests de dépistage aux personnes qui remplissent certains critères.',
              li2: 'Exiger un rendez-vous.',
              li3: 'Exiger une référence de votre médecin traitant.',
              li4: 'Demander que vous restiez dans votre véhicule (pour les sites en drive).',
            },
            p3: 'Consultez les détails spécifiques à un site sur la carte. Appelez ensuite le prestataire ou consultez son site Web avant de vous déplacer.',
            callout1:{
              p1: '<b>Des questions ?</b> Veuillez appeler votre prestataire de soins de santé ou consulter notre FAQ sur <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">les tests de dépistage à Philadelphie.</a>',
            },
          },
          beforeYouGo: 'Avant de vous déplacer',
          checkSite: 'Consultez les détails concernant un site particulier.',
          hoursVary: 'Les horaires et la disponibilité varient.',
          eligibility: 'Détails',
          testingHours: 'Horaires de dépistage',
          daysOfOperation: 'Jours d’ouverture',
          Monday: 'Lundi',
          Tuesday: 'Mardi',
          Wednesday: 'Mercredi',
          Thursday: 'Jeudi',
          Friday: 'Vendredi',
          Saturday: 'Samedi',
          Sunday: 'Dimanche',
          // access: 'Accès',
          Yes: 'Oui',
          No: 'Non',
          Unknown: 'Inconnu',
          website: 'Site Web',
          process:{
            category: 'Processus',
            dt: 'Drive',
            wu: 'Guichet',
            both: 'Drive et guichet',
          },
          symptomatic: {
            category: 'Sans symptômes',
            null: '',
            symptom: 'Sans symptômes',
            asymptom: 'Il n’est pas nécessaire d’avoir des symptômes',
          },
          refReq: {
            category: 'Référence du médecin exigée',
            null: '',
            yes: 'Référence du médecin exigée',
            no: 'Aucune référence exigée',
          },
          patientAge: {
            category: 'Âge du patient',
            null: '',
            year14: '+ de 14 ans',
            year18: '+ de 18 ans',
            pedCare: 'Propose des tests de dépistage pour enfants',
          },
          panelText:{
            p1: 'Si vous ne pouvez pas vous faire dépister pour le COVID-19 par le biais de votre médecin traitant cet outil peut vous aider à trouver un site de dépistage gratuit dans la ville de Philadelphie.',
          },
          restrictions:{
            lowInc: 'Ce site est destiné aux familles et aux personnes à faibles revenus. ',
            year14: 'Doit être âgé d’au moins 14 ans.',
            year18: 'Doit être âgé d’au moins 18 ans.',
            netPat: 'Le patient doit faire partie du réseau du prestataire de soins pour recevoir un test à ce site.',
            medPrior: 'La priorité sera donnée au personnel soignant et aux premiers intervenants à ce site.',
            homeless: 'Ce site est destiné aux sans-abri.',
            telemed: 'Une visite de télémédecine est obligatoire avant de se faire tester à ce site.',
            onlineQuest: 'Un questionnaire est à remplir en ligne avant de se présenter à ce site.',
          },
          notes:{
            schedApp: 'Prise de rendez-vous obligatoire',
            refReq: 'Référence du médecin exigée.',
            schedAppRefReq: 'Rendez-vous et référence du médecin exigés.',
            noApp: 'Sans rendez-vous.',
            testAll: 'Tests effectués même sans symptômes.',
          },
          facilityType:{
            drugstore: 'Pharmacie',
            fieldSite: 'Site de terrain',
            clinic: 'Clinique',
            hospital: 'Hôpital',
            other: 'Autre',
            phmcHC: 'Centre médical PHMC',
            urgentCare: 'Clinique de soins d’urgence',
            cityHC: 'Centre médical de la ville',
            homelessServices: 'Services aux sans-abri',
          },
        },
      },
    },
  },
});
