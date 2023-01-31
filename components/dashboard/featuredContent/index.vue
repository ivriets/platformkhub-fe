<template>
    <div>
        <div>
            <ElementsTab 
                :listTab="listTab"
                v-model="selectedTab"
                :selectedTab="selectedTab"
                :landing="'spa'"
            />
        </div>
            <DashboardFeaturedContentItem 
                :selectedTab="selectedTab"
                v-model="form.featuredProgram"
                :key="'ketab1'+keyTab"
                :masterEndPoint="'moderator/programs/?submission=4'"
                :targetId="'programId'"
                :targetJudul="'judulActivity'"
                v-if="selectedTab==='program'"
            />
            <DashboardFeaturedContentItem 
                :selectedTab="selectedTab"
                v-model="form.featuredEvent"
                :key="'ketab2'+keyTab"
                v-if="selectedTab==='event'"
                :masterEndPoint="'moderator/events/?submission=4'"
                :targetId="'eventId'"
                :targetJudul="'judulActivity'"


            />
            <DashboardFeaturedContentItem 
                :selectedTab="selectedTab"
                v-model="form.featuredResource"
                :key="'ketab3'+keyTab"
                v-if="selectedTab==='resources'"
                :masterEndPoint="'moderator/resources/?submission=4'"
                :targetId="'resourceId'"
                :targetJudul="'judulArtikel'"

            />
            <DashboardFeaturedContentItem 
                :selectedTab="selectedTab"
                v-model="form.featuredBlog"
                :key="'ketab4'+keyTab"
                v-if="selectedTab==='blog'"
                :masterEndPoint="'moderator/blogs/?submission=4'"
                :targetId="'blogId'"
                :targetJudul="'judulArtikel'"

            />


    </div>
</template>


<script>
// import featuredContent from '~/static/data/featuredcontent.json';

export default {
    data() {
        return {
            selectedTab: 'program',
            list: [],
            keyTab: 0,
            form : {
                featuredProgram: [],
                featuredEvent: [],
                featuredResource: [],
                featuredBlog: [],
            },


            listTab: [
                {
                    id: 'program',
                    label: 'Program',
                    field: 'featuredProgram'
                },
                {
                    id: 'event',
                    label: 'Event',
                    field: 'featuredEvent'
                },
                {
                    id: 'resources',
                    label:'Resources',
                    field: 'featuredResource'
                },
                {
                    id: 'blog',
                    label: 'Blog',
                    field: 'featuredBlog'
                },
                // {
                //     id: 'outlook',
                //     label: 'Outlook',
                //     field: 'outlook'
                // }
            ],

        }
    },
    computed: {
        lang() {
            return this.$i18n.locale
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
        basePath() {
            return process.env.BASE_URL
        },
        modelField() {
            const sc = this.selectedTab === 'resources' ? 'Resource' : _.startCase(this.selectedTab)
            return 'featured'+ sc
        }

    },
    created() {
        this.$nuxt.$on('updateFeatured', (val) => {
            this.updateFeatureContent()
        })
    },

    watch: {
        selectedTab() {
            this.keyTab +=1
            // this.splitFields()
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.masterPoint()
        },

        async masterPoint() {
            await this.$apiPlatform.get('featuredcontent/').then(res => {
                var featuredContent = res.data
                this.form.featuredProgram = featuredContent.featuredProgram
                this.form.featuredEvent = featuredContent.featuredEvent
                this.form.featuredResource = featuredContent.featuredResource
                this.form.featuredBlog = featuredContent.featuredBlog

            }).catch(err => {
                console.log(err)
            })
        },
        splitFields() {
            this.list = this.dataDetail[this.modelField]
            this.keyTab +=1

        },

        async updateData(data) {           
            await this.$apiPlatform.put('featuredcontent/', data).then(res => {
                // this.$toast.show('Featured Content ' + this.$t('updateSukses'))
                this.initialize()
            }).catch(err => {
                console.log(err)
            })
        }, 
        updateFeatureContent () {
            const dataUpdate = {
                featuredProgram: this.form.featuredProgram.map(e => e.programId),
                featuredEvent: this.form.featuredEvent.map(e => e.eventId),
                featuredResource: this.form.featuredResource.map(e => e.resourceId),
                featuredBlog: this.form.featuredBlog.map(e => e.blogId)
            }
            this.updateData(dataUpdate)
        },
       
    },
}
</script>