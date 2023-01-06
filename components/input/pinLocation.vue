<template>
    <div>
      <div v-if="label" class="font-medium mb-1">
            {{label}}
        </div>
        <input type="text" v-model="pinLocation" readonly  class="hidden" />
        <client-only class="">
            <!-- <label class="block text-sm font-medium text-gray-700">{{ $t('find address') }}</label> -->
        

        </client-only>
        <div class="relative">
          <div class="absolute w-full md:w-3/5 top-0 pl-2 pt-2 left-0 z-10 flex items-center">
            <label class="w-full ">
            <gmap-autocomplete
                :placeholder="this.$t('Type address here')"
                ref="gmapauto"
                @place_changed="setPlace"
                class="focus:outline-none w-full shadow border overflow-hidden border-warna-tujuh rounded-lg text-sm text-warna-utama placeholder-[#9E9E9E] focus:border-warna-tujuh/50"
                style="width:100%"
                :options="autocompleteOptions"
                :value="valuegmap"
                >
            </gmap-autocomplete>
            </label>
        </div>

          <client-only>
            <GmapMap
                :center="changingCenter" 
                :zoom="changingZoom"
                map-type-id="roadmap"
                style="width: 100%; height: 300px"
                :options="options"
                
            >
                <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @dragend="dragMarker($event)"
                @click="center=m.position"
                
                />
            </GmapMap>
        </client-only>
      </div>

        <!-- <div class="text-gray-500 text-xs">
            {{pinLocation}}
        </div> -->




    </div>
</template>

<script>

// import * as GmapVue from '~/node_modules/gmap-vue'

export default {
    props: ['value', 'label'],
    data() {
        return {
            formMode: 'post',
            pinLocation: '',
            regions: [],
            changingZoom: 5,
            changingCenter: {lat: -6.878483, lng: 107.579059},
                        shape: {
            coords: [10, 10, 10, 15, 15, 15, 15, 10],
            type: 'poly'
            },
            options: {
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            disableDefaultUi: false,
            },
            markers: [],
            profile: {},
            valuegmap: '',
            autocompleteOptions: {
                componentRestrictions: {
                country: [
                    'id',
                ],
                },
            },
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        async initialize() {
            if (this.value) {
              
                if (this.value !== '') {
                    const pecah = this.value.split(',')
                    const lat = parseFloat(pecah[0])
                    const lng = parseFloat(pecah[1])
                      this.markers = [({
                      position: {
                        lat: lat,
                        lng: lng,
                      }
                    })]
                  this.changingZoom = 18
                  this.changingCenter = {
                      lat: lat,
                      lng: lng
                    }  
                    this.place = null;
                }

            }

        },

        updateValue() {
            // data.push(this.lokasi)
            this.input = {}
            this.$emit('input', this.pinLocation)
        },

          setPlace(place) {
            this.place = place
          // this.disabledAdd = false
          this.usePlace()

          },
        usePlace(place) {
            if (this.place) {
              this.markers = [({
                position: {
                  lat: this.place.geometry.location.lat(),
                  lng: this.place.geometry.location.lng(),
                }
              })]

              this.changingZoom = 18
              this.changingCenter = {
                  lat: this.place.geometry.location.lat(),
                  lng: this.place.geometry.location.lng()
                }              
              this.pinLocation = this.place.geometry.location.lat() + ',' + this.place.geometry.location.lng()
              this.place = null;

              this.valuegmap = ''
            }
            this.updateValue()
          },
          async dragMarker(event) {
            const akhir = JSON.stringify(event.latLng)
            const akhirObj = JSON.parse(akhir)
            this.pinLocation = akhirObj.lat + ',' + akhirObj.lng
            this.updateValue()
          },


    },
    
}
</script>