<template>
  <div>
    <div class="grid-x grid-padding-x">
      <div class="cell medium-12">
        <div
          v-if="item.attributes.STREET_ADDRESS"
          class="grid-x detail"
        >
          <div class="small-2">
            <font-awesome-icon icon="map-marker-alt" />
          </div>
          <div class="small-22">
            {{ item.attributes.STREET_ADDRESS }}<br>
            Philadelphila, PA {{ item.attributes.ZIP_CODE }}
          </div>
        </div>
      </div>
      <div class="cell medium-12">
        <div
          v-if="item.attributes.WEBSITE_URL"
          class="grid-x detail"
        >
          <div class="small-2">
            <font-awesome-icon icon="globe" />
          </div>
          <div class="small-22">
            <a
              target="_blank"
              :href="item.attributes.WEBSITE_URL"
            >{{ item.attributes.WEBSITE_URL }}</a>
          </div>
        </div>

        <div
          v-if="item.attributes.PHONE_NUMBER"
          class="grid-x detail"
        >
          <div class="small-2">
            <font-awesome-icon icon="phone" />
          </div>
          <div class="small-22">
            {{ item.attributes.PHONE_NUMBER }}
          </div>
        </div>

        <div
          v-if="item.attributes.NAC_COORDINATOR || item.attributes.EMAIL_ADDRESS"
          class="grid-x detail"
        >
          <div class="small-2">
            <font-awesome-icon icon="user" />
          </div>
          <div class="small-22">
            <div v-if="item.attributes.NAC_COORDINATOR">
              {{ item.attributes.NAC_COORDINATOR }}
            </div>
            <a
              v-if="item.attributes.EMAIL_ADDRESS"
              target="_blank"
              :href="'mailto:' + item.attributes.EMAIL_ADDRESS"
            >{{ item.attributes.EMAIL_ADDRESS }}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="menu">
      Service offered
    </div>
    <p>{{ servicesOffered }}</p>

    <div
      v-if="tags.length"
      class="menu"
    >
      Tags
    </div>
    {{ tags }}

    <!-- <h3 class="h5">
      Services Offered
    </h3>
    <div class="grid-x grid-padding-x">
      <div
        v-if="item.attributes.FORECLOSURE"
        class="small-12"
      >
        Foreclosure
      </div>
      <div
        v-if="item.attributes.PRE_PURCHASE"
        class="small-12"
      >
        Pre-Purchase
      </div>
    </div> -->
  </div>
</template>

<script>

import SharedFunctions from '@phila/pinboard/src/components/mixins/SharedFunctions.vue';

export default {
  name: 'ExpandCollapseContent',
  components: {
    VerticalTableLight: () => import(/* webpackChunkName: "pvc_VerticalTable3CellsLight" */'@phila/vue-comps/src/components/VerticalTableLight.vue'),
  },
  mixins: [ SharedFunctions ],
  props: {
    item: {
      type: Object,
      default: function(){
        return {};
      },
    },
  },
  computed: {
    servicesOffered() {
      let services = '';
      let valueArray = [];
      if (this.$props.item.attributes.HCA){
        valueArray.push('Housing Counseling');
      }
      if (this.$props.item.attributes.NAC){
        valueArray.push('Neighborhood Advisory Committees (NAC)');
      }
      if (this.$props.item.attributes.NEC){
        valueArray.push('Neighborhood Energy Centers (NEC)');
      }
      // console.log('valueArray:', valueArray);
      let i;
      for (i=0; i<valueArray.length-1; i++) {
        services += valueArray[i];
        services += ', ';
      }
      services += valueArray[valueArray.length-1];
      return services;
    },
    tags() {
      let tags = '';
      let valueArray = [];
      // console.log('ExpandCollapseContent tags computed is running, this.$config.tags:', this.$config.tags);
      for (let tag of this.$config.tags.tags) {
        // console.log('tag:', tag, 'tag.field:', tag.field, 'this.$props.item.attributes[tag.field]:', this.$props.item.attributes[tag.field]);
        if (tag.type == 'boolean' && this.$props.item.attributes[tag.field] == 'Yes') {
          valueArray.push(tag.value);
        } else if (tag.type == 'value' && this.$props.item.attributes[tag.field] !== null && this.$props.item.attributes[tag.field] != ' ') {
          valueArray.push(this.$props.item.attributes[tag.field].charAt(0) + this.$props.item.attributes[tag.field].substring(1).toLowerCase());
        }
      }
      // console.log('valueArray:', valueArray);
      let i;
      if (valueArray.length >=1) {
        for (i=0; i<valueArray.length-1; i++) {
          tags += valueArray[i];
          tags += ', ';
        }
        tags += valueArray[valueArray.length-1];
      }
      return tags;
    },
  },
  methods: {
    parseSpecialty(item) {
      let value;
      if (item.attributes.SPECIALTY) {
        value = item.attributes.SPECIALTY.charAt(0) + item.attributes.SPECIALTY.substring(1).toLowerCase();
      }
      return value;
    },
  },
};

</script>

<style lang="scss">

.menu {
  font-size: 16px;
  margin-bottom: 3px;
}

.td-style {
  font-size: 14px !important;
}

.td-textbox {
  padding-left: 2rem;
}

.location-item {
  position: relative;
  border-bottom: 1px solid black;
  height:100%;

  &:hover::after {
    color: white;
  }

  .temp-close-section {
    width: 100%;
  }

  .card-exclamation-holder {
    padding: 20px;
    background-color: #CC3000;
    text-align: center;
  }

  .fa-icon-class {
    color: white;
    text-align: center;
  }

  .card-exclamation-details {
    padding: 10px;
    background-color: #F5D6CC;
  }

  .location-title {
    cursor: pointer;
    padding: 1rem;
    margin-bottom: 0;
    &:hover{
      background: #2176d2;
      color: white;
    }
  }

  &::after{
    position: absolute;
    right:1rem;
    top: 0;
    content: '+';
    font-weight: 900;
    font-size:1.5rem;
    z-index: 100;
    color: color(dark-ben-franklin)
  }
  &.open{
    h2{
      color:white;
      background-color: color(ben-franklin-blue);
      font-weight: 900;
    }
    &::after{
      content: '-';
      color:white;
    }
  }
  .location-content{
    overflow: hidden;
    height:0;

    &.location-open{
      padding: 1rem;
      height: 100%;
      overflow: initial;
    }
  }
}
</style>
