<template>
  <div class="grid-x grid-padding-x">
    <div class="columns is-marginless">
      <div
        v-if="item.attributes.STREET_ADDRESS"
        class="column columns"
      >
        <div class="column is-1">
          <font-awesome-icon icon="map-marker-alt" />
        </div>
        <div class="column is-11">
          {{ item.attributes.STREET_ADDRESS }}<br>
          Philadelphila, PA {{ item.attributes.ZIP_CODE }}
        </div>
      </div>

      <div class="column">
        <div
          v-if="item.attributes.WEBSITE_URL"
          class="detail columns"
        >
          <div class="column is-2">
            <font-awesome-icon icon="globe" />
          </div>
          <div class="column is-10">
            <a
              target="_blank"
              :href="item.attributes.WEBSITE_URL"
            >{{ item.attributes.WEBSITE_URL }}</a>
          </div>
        </div>

        <div
          v-if="item.attributes.PHONE_NUMBER"
          class="detail columns"
        >
          <div class="column is-2">
            <font-awesome-icon icon="phone" />
          </div>
          <div class="column is-10">
            {{ item.attributes.PHONE_NUMBER }}
          </div>
        </div>

        <div
          v-if="item.attributes.NAC_COORDINATOR || item.attributes.EMAIL_ADDRESS"
          class="detail columns"
        >
          <div class="column is-2">
            <font-awesome-icon icon="user" />
          </div>
          <div class="column is-10">
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
      <h3 class="title section-title is-3">
        Service offered
      </h3>
      <p>{{ servicesOffered }}</p>
    </div>

    <div
      v-if="tags.length"
      class="menu"
    >
      <h3 class="title section-title is-3">
        Tags
      </h3>
      {{ tags }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'ExpandCollapseContent',
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
  margin-bottom: 10px;
}

</style>
