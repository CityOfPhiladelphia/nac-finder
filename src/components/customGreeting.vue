<template>
  <div
    class="content"
  >
    <!-- <div class="exclamation-holder">
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
    </div> -->

    <div class="section has-text-centered">
      <button
        class="button open-list-button is-primary"
        @click="$emit('view-list')"
        v-html="$t('app.viewList')"
      />
    </div>

    <div class="section">
      <h1 class="title is-2 is-spaced">
        About this finder
      </h1>
      <div class="app-list">
        <ul>
          <li>
            <a
              target="_blank"
              href="https://www.phila.gov/departments/division-of-housing-and-community-development/neighborhood-resources/housing-counseling/"
            >Housing counseling agencies</a> help residents buy and maintain their homes, avoid eviction and foreclosure, and more.
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.phila.gov/departments/division-of-housing-and-community-development/neighborhood-resources/neighborhood-advisory-committees-nacs/"
            >Neighborhood Advisory Committees</a> (NACs) help residents find out about City programs that could benefit them.
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.phila.gov/departments/division-of-housing-and-community-development/neighborhood-resources/neighborhood-energy-centers-necs/"
            >Neighborhood Energy Centers</a> (NECs) provide information on how to save on utilities and get help paying energy bills.
          </li>
        </ul>
      </div>

      <h1 class="title is-2">
        Other programs DHCD supports
      </h1>
      <div class="app-list">
        <ul>
          <li>
            The <a
              target="_blank"
              href="http://northcentralchoice.com/"
            >North Central Philadelphia Transformation Plan</a>, which is part of the Choice Neighborhoods Initiative to transform neighborhoods of extreme poverty into sustainable, mixed-income communities.
          </li>
          <li>
            The <a
              target="_blank"
              href="https://phsonline.org/programs/landcare-program"
            >LandCare</a> program, which cleans, greens, and stabilizes vacant lots to return them to productive use.
          </li>
        </ul>
      </div>
    </div> <!-- end of main-area -->
  </div>
</template>

<script>

// import TopicComponent from '@phila/vue-comps/src/components/TopicComponent.vue';
import PhilaButton from '@phila/pinboard/src/components/PhilaButton.vue';
// import callout from '@phila/vue-comps/src/components/Callout.vue';

export default {
  name: 'CustomGreeting',
  components: {
    PhilaButton,
    // callout,
  },
  // mixins: [ TopicComponent ],
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

.section {
  padding: 1.5rem;
}

.app-list {
  margin-bottom: 2rem;
}

.open-list-button {
  text-transform: uppercase;
}

</style>
