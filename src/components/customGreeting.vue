<template>
  <div
    class="grid-y custom-greeting"
  >
    <div class="exclamation-holder">
      <font-awesome-icon
        icon="info-circle"
        class="fa-3x fa-icon-class"
      />
      <div
        class="grid-y exclamation-details small-19 medium-20"
      >
        <div><b>{{ $t('beforeYouGo') }}:</b></div>
        <div>Access Centers are free, but you must check eligibility and register your child in advance. For full program details, visit the <a href="https://www.phila.gov/access-centers">Access Centers webpage</a>. </div>
      </div>
    </div>

    <div class="open-list-div">
      <!-- class="button open-list-button hide-for-medium" -->
      <phila-button
        class="button open-list-button"
        @click.native="$emit('view-list')"
        v-html="$t('app.viewList')"
      />
    </div>

    <div
      class="main-area"
    >
      <h1>About this finder</h1>
      <p>This tool can help you find an Access Center in Philadelphia. </p>
      <p>You can: </p>
      <ul>
        <li>Search for an Access Center by address. </li>
        <li>Click on a map location for specific site information. </li>
      </ul>
      <p>
        Access Centers help kids and their families with their internet access and childcare needs during digital learning time (weekdays from 8:00 a.m. to 4:30 p.m.). Access Centers are free, but they are NOT drop-in centers. You must check eligibility and register your child in advance. For full program details, visit the <a href="https://www.phila.gov/access-centers/">Access Centers webpage.</a>
      </p>
      <h2>Who is eligible </h2>
      <p>Philadelphia students can register for an Access Center if they are: </p>
      <ul>
        <li>Entering kindergarten through sixth grade. </li>
        <li>Children of caregivers working outside the home who cannot provide supervision or are not able to afford or access childcare. </li>
      </ul>
      <p>Access Centers provide childcare support for families without other options. Don’t qualify? Up to 35,000 eligible K-12 households who need help with in-home internet access for digital learning can learn more about their options through <a href="https://www.phila.gov/programs/phlconnected/">PHLConnectEd</a>. </p>
      <h2>How to register </h2>
      <p> To express interest in registering your child for an Access Center: </p>
      <ul>
        <li>Read the "Who is eligible" section above to confirm your child qualifies. </li>
        <li>
          Fill out the <a href="https://www.cognitoforms.com/DHSOST1/AccessCenterRegistrationInterestForm">registration interest form
            <font-awesome-icon
              icon="external-link-alt"
            /></a> or call (215) 709-5366. 
        </li>
      </ul>
      <p>Students are NOT registered until confirmed by an Access Center. If you are eligible, an Access Center team member will reach out to help you with the next step of registration. If you are not eligible, you will receive a response letting you know.</p>
      <div
        class="custom-callout"
      >
        <p class="no-margins">
          <strong>Questions?</strong> Call (215) 709-5366 for help filling out the Access Center registration interest form, or if you need language interpretation services. Help is available Monday through Friday from 8 a.m. to 6 p.m. 
        </p>
      </div>
    </div> <!-- end of main-area -->
  </div>
</template>

<script>

import TopicComponent from '@phila/vue-comps/src/components/TopicComponent.vue';
import PhilaButton from '@phila/pinboard/src/components/PhilaButton.vue';
import callout from '@phila/vue-comps/src/components/Callout.vue';

export default {
  name: 'CustomGreeting',
  components: {
    PhilaButton,
    callout,
  },
  mixins: [ TopicComponent ],
  props: {
    'message': {
      type: String,
      default: function() {
        return 'defaultMessage';
      },
    },
  },
  data() {
    let data = {
      sections: {},
      subsections: {},
    };
    return data;
  },
  computed: {
    i18nEnabled() {
      if (this.$config.i18n) {
        return true;
      }
      return false;

    },
    calloutOptions() {
      return {};
    },
    calloutSlots() {
      return {
        text: 'test',
      };
    },
    database() {
      if (this.$store.state.sources[this.$appType].data) {
        return this.$store.state.sources[this.$appType].data.rows || this.$store.state.sources[this.$appType].data.features || this.$store.state.sources[this.$appType].data;
      }
      return [];

    },
    hasError() {
      return this.$store.state.geocode.status === 'error';
    },
    errorMessage() {
      const input = this.$store.state.geocode.input;
      return `
          <p>
            We couldn't find
            ${input ? '<strong>' + input + '</strong>' : 'that address'}.
            Are you sure everything was spelled correctly?
          </p>
          <p>
            Here are some examples of things you can search for:
          </p>
          <ul>
            <li>1234 Market St</li>
            <li>1001 Pine Street #201</li>
            <li>12th & Market</li>
            <li>883309050 (an OPA number with no hyphens or other characters)</li>
          </ul>
        `;
    },
  },
  watch: {
    database() {
      let subsections = this.getCounts();
      this.subsections = subsections;
      this.$store.commit('setSubsections', subsections);
    },
  },
  mounted() {
    this.sections = this.$config.sections;
  },
  methods: {
    getCounts() {
      // console.log('customGreeting.vue getCounts is running');
      const refineData = this.database;
      // const refineData = this.sources[this.$appType].data.rows;

      let service = '';

      // console.log('in getRefineSearchList, refineData:', refineData);
      refineData.forEach((arrayElem) => {
        // console.log('arrayElem:', arrayElem);
        if (arrayElem.services_offered) {
          service += `${arrayElem.services_offered},`;
        } else if (arrayElem.attributes.CATEGORY) {
          service += `${arrayElem.attributes.CATEGORY},`;
        }
      });

      // TODO: break this into smaller chunks
      // let serviceArray = service.split(/(,|;)/);
      let serviceArray = service.split(',');
      serviceArray = serviceArray.map(s => s.trim());

      // const uniqArray = [ ...new Set(serviceArray) ];
      // console.log('serviceArray:', serviceArray, 'uniqArray:', uniqArray);
      //
      // // clean up any dangling , or ;
      // let uniq = uniqArray.filter(a => a.length > 2);
      //
      // uniq.filter(Boolean); // remove empties

      let countObject = serviceArray.reduce(function (acc, curr) {
        if (typeof acc[curr] == 'undefined') {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }
        return acc;
      }, {});

      return countObject;
    },
  },
};
</script>

<style scoped>

  h1 {
    font-size: 20px;
  }

  h2 {
    font-size: 16px;
  }

  .main-area {
    padding: 10px;
  }

  .custom-callout {
    border-style: solid;
    border-width: 1px;
    padding: 10px;
  }

  .no-margin {
    margin: 0px;
  }

  .open-list-div {
    margin: 0 auto;
  }

  .open-list-button {
    margin-top: 6px;
    margin-bottom: 14px;
    width: 200px;
  }

  .custom-greeting {
    padding: 12px;
  }

  .exclamation-holder {
    display: flex;
    align-items: center;
    margin-top: 6px;
    margin-bottom: 14px;
  }

  .fa-icon-class {
    margin: 0 auto;
    display: block;
  }

  .exclamation-details {
    margin-left: 14px;
    font-size: 14px;
  }

  .mb-panel-topics-greeting {
    padding-top: 20px;
  }

  .greeting {
    font-size: 20px;
    color: #444;
    padding: 14px;
  }

  .greeting-error {
    border-left-color: #ff0000;
  }

  .custom-section {
    margin-left: 8px;
    margin-top: 4px;
  }

  .custom-ul {
    margin-left: 4rem;
    font-size: 14px;
  }

  /*medium*/
  @media screen and (min-width: 750px) {
    .mb-panel-topics-greeting {
      /*make this scroll on medium screens*/
      /*REVIEW this is a little hacky. the 120px shouldn't be hard-coded.*/
      height: calc(100vh - 120px);
      overflow: auto;
    }
  }
</style>
